import { BaseObject } from "../core/BaseObject";
import { Matrix } from "../geom/Matrix";
import { Transform } from "../geom/Transform";
import { Point } from "../geom/Point";
import { Armature } from "./Armature";

export abstract class TransformObject extends BaseObject {
    protected static _helpMatrix: Matrix = new Matrix();
    protected static _helpTransform: Transform = new Transform();
    protected static _helpPoint: Point = new Point();

    public readonly globalTransformMatrix: Matrix = new Matrix();
    public readonly global: Transform = new Transform();
    public readonly offset: Transform = new Transform();
    public origin: Transform | null;
    public userData: any;
    
    protected _globalDirty: boolean;
    protected _alpha: number;
    public _globalAlpha: number;
    public _armature: Armature;

    protected _onClear(): void {
        this.globalTransformMatrix.identity();
        this.global.identity();
        this.offset.identity();
        this.origin = null;
        this.userData = null;
        this._globalDirty = false;
        this._alpha = 1.0;
        this._globalAlpha = 1.0;
        this._armature = null!;
    }

    public updateGlobalTransform(): void {
        if (this._globalDirty) {
            this._globalDirty = false;
            this.global.fromMatrix(this.globalTransformMatrix);
        }
    }

    get armature(): Armature {
        return this._armature;
    }
}