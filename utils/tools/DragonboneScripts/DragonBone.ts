import { WorldClock } from "./WorldClock";
import { IArmatureProxy } from "../model/IArmatureProxy"; // Preserved interface reference
import { BaseObject } from "./BaseObject";

export class DragonBones {
    public static VERSION: string = "5.7.000";
    public static yDown: boolean = true;
    public static debug: boolean = false;
    public static debugDraw: boolean = false;

    private _clock: WorldClock = new WorldClock();
    private _events: any[] = [];
    private _objects: BaseObject[] = [];
    private _eventManager: any = null;

    constructor(eventManager: any) {
        this._eventManager = eventManager;
        console.info("DragonBones: " + DragonBones.VERSION + "\nWebsite: http://www.loongbones.app/\nSource and Demo: https://github.com/DragonBones/");
    }

    public advanceTime(passedTime: number): void {
        if (this._objects.length > 0) {
            for (const object of this._objects) {
                object.returnToPool();
            }
            this._objects.length = 0;
        }

        this._clock.advanceTime(passedTime);

        if (this._events.length > 0) {
            for (let i = 0; i < this._events.length; ++i) {
                const eventObject = this._events[i];
                const armature = eventObject.armature;
                if (armature._armatureData !== null) {
                    armature.eventDispatcher.dispatchDBEvent(eventObject.type, eventObject);
                    if (eventObject.type === "soundEvent") { // Preserved SOUND_EVENT check
                        this._eventManager.dispatchDBEvent(eventObject.type, eventObject);
                    }
                }
                this.bufferObject(eventObject);
            }
            this._events.length = 0;
        }
    }

    public bufferEvent(value: any): void {
        if (this._events.indexOf(value) < 0) {
            this._events.push(value);
        }
    }

    public bufferObject(object: BaseObject): void {
        if (this._objects.indexOf(object) < 0) {
            this._objects.push(object);
        }
    }

    get clock(): WorldClock {
        return this._clock;
    }

    get eventManager(): any {
        return this._eventManager;
    }
}