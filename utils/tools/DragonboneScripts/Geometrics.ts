export class Point {
    public x: number;
    public y: number;
    constructor(x: number = 0.0, y: number = 0.0) {
        this.x = x;
        this.y = y;
    }
    public copyFrom(value: Point): void {
        this.x = value.x;
        this.y = value.y;
    }
    public clear(): void {
        this.x = this.y = 0.0;
    }
}

export class Rectangle {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    constructor(x: number = 0.0, y: number = 0.0, width: number = 0.0, height: number = 0.0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    public copyFrom(value: Rectangle): void {
        this.x = value.x;
        this.y = value.y;
        this.width = value.width;
        this.height = value.height;
    }
    public clear(): void {
        this.x = this.y = 0.0;
        this.width = this.height = 0.0;
    }
}