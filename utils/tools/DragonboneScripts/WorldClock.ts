export interface IAnimatable {
    clock: WorldClock | null;
    advanceTime(passedTime: number): void;
}

export class WorldClock implements IAnimatable {
    public time: number = 0.0;
    public timeScale: number = 1.0;
    private _systemTime: number = 0.0;
    private _animatebles: (IAnimatable | null)[] = [];
    private _clock: WorldClock | null = null;

    constructor(time: number = 0.0) {
        this.time = time;
        this._systemTime = new Date().getTime() * 0.001;
    }

    public advanceTime(passedTime: number): void {
        if (passedTime !== passedTime) {
            passedTime = 0.0;
        }
        const currentTime = Date.now() * 0.001;
        if (passedTime < 0.0) {
            passedTime = currentTime - this._systemTime;
        }
        this._systemTime = currentTime;

        if (this.timeScale !== 1.0) {
            passedTime *= this.timeScale;
        }
        if (passedTime === 0.0) {
            return;
        }
        if (passedTime < 0.0) {
            this.time -= passedTime;
        } else {
            this.time += passedTime;
        }

        let i = 0, r = 0, l = this._animatebles.length;
        for (; i < l; ++i) {
            const animatable = this._animatebles[i];
            if (animatable !== null) {
                if (r > 0) {
                    this._animatebles[i - r] = animatable;
                    this._animatebles[i] = null;
                }
                animatable.advanceTime(passedTime);
            } else {
                r++;
            }
        }

        if (r > 0) {
            l = this._animatebles.length;
            for (; i < l; ++i) {
                const animateble = this._animatebles[i];
                if (animateble !== null) {
                    this._animatebles[i - r] = animateble;
                } else {
                    r++;
                }
            }
            this._animatebles.length -= r;
        }
    }

    public contains(value: IAnimatable): boolean {
        if (value === this) {
            return false;
        }
        let ancestor: IAnimatable | null = value;
        while (ancestor !== this && ancestor !== null) {
            ancestor = ancestor.clock;
        }
        return ancestor === this;
    }

    public add(value: IAnimatable): void {
        if (this._animatebles.indexOf(value) < 0) {
            this._animatebles.push(value);
            value.clock = this;
        }
    }

    public remove(value: IAnimatable): void {
        const index = this._animatebles.indexOf(value);
        if (index >= 0) {
            this._animatebles[index] = null;
            value.clock = null;
        }
    }

    public clear(): void {
        for (const animatable of this._animatebles) {
            if (animatable !== null) {
                animatable.clock = null;
            }
        }
    }

    get clock(): WorldClock | null {
        return this._clock;
    }
    set clock(value: WorldClock | null) {
        if (this._clock === value) {
            return;
        }
        if (this._clock !== null) {
            this._clock.remove(this);
        }
        this._clock = value;
        if (this._clock !== null) {
            this._clock.add(this);
        }
    }
}