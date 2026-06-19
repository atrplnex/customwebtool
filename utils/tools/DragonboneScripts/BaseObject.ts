export abstract class BaseObject {
    private static _hashCode: number = 0;
    private static _defaultMaxCount: number = 3000;
    private static _maxCountMap: { [key: string]: number } = {};
    private static _poolsMap: { [key: string]: BaseObject[] } = {};

    public readonly hashCode: number = BaseObject._hashCode++;
    protected _isInPool: boolean = false;

    private static _returnObject(object: BaseObject): void {
        const classType = String(object.constructor);
        const maxCount = classType in BaseObject._maxCountMap ? BaseObject._maxCountMap[classType] : BaseObject._defaultMaxCount;
        const pool = BaseObject._poolsMap[classType] = BaseObject._poolsMap[classType] || [];
        
        if (pool.length < maxCount) {
            if (!object._isInPool) {
                object._isInPool = true;
                pool.push(object);
            } else {
                console.warn("The object is already in the pool.");
            }
        }
    }

    public static setMaxCount(objectConstructor: typeof BaseObject | null, maxCount: number): void {
        if (maxCount < 0 || maxCount !== maxCount) { // isNaN
            maxCount = 0;
        }
        if (objectConstructor !== null) {
            const classType = String(objectConstructor);
            const pool = classType in BaseObject._poolsMap ? BaseObject._poolsMap[classType] : null;
            if (pool !== null && pool.length > maxCount) {
                pool.length = maxCount;
            }
            BaseObject._maxCountMap[classType] = maxCount;
        } else {
            BaseObject._defaultMaxCount = maxCount;
            for (const classType in BaseObject._poolsMap) {
                const pool = BaseObject._poolsMap[classType];
                if (pool.length > maxCount) {
                    pool.length = maxCount;
                }
                if (classType in BaseObject._maxCountMap) {
                    BaseObject._maxCountMap[classType] = maxCount;
                }
            }
        }
    }

    public static clearPool(objectConstructor: typeof BaseObject | null = null): void {
        if (objectConstructor !== null) {
            const classType = String(objectConstructor);
            const pool = classType in BaseObject._poolsMap ? BaseObject._poolsMap[classType] : null;
            if (pool !== null && pool.length > 0) {
                pool.length = 0;
            }
        } else {
            for (const k in BaseObject._poolsMap) {
                const pool = BaseObject._poolsMap[k];
                pool.length = 0;
            }
        }
    }

    public static borrowObject<T extends BaseObject>(objectConstructor: new () => T): T {
        const classType = String(objectConstructor);
        const pool = classType in BaseObject._poolsMap ? BaseObject._poolsMap[classType] : null;
        if (pool !== null && pool.length > 0) {
            const object = pool.pop() as T;
            object._isInPool = false;
            return object;
        }
        const object = new objectConstructor();
        object._onClear();
        return object;
    }

    public returnToPool(): void {
        this._onClear();
        BaseObject._returnObject(this);
    }

    protected abstract _onClear(): void;
}