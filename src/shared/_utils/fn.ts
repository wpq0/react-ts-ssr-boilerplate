/**
 * Turns a constructor function (has to be called with `new`) into an ordinary factory
 * function with the same parameters
 * @param ctor a constructor (new-able) function
 */
export const makeFactory = function<TArgs extends any[], TCtor>(
    ctor: new (...args: TArgs) => TCtor
): ((...args: TArgs) => TCtor) {
    return (...args) => new ctor(...args);
};

/**
 * Transform an object with string keys and constructor values into one whose values
 *  are factory functions
 * @param ctors an object whose keys are strings and values are constructor (new-able) functions
 * @returns an object with the same keys as input but the values are
 */
export const makeFactories = function<
    TCtors extends { [k: string]: new (...args: any[]) => any }
>(
    ctors: TCtors
): {
    [K in keyof TCtors]: TCtors[K] extends new (
        ...args: infer TCtorArgs
    ) => infer TCtorClass
        ? (...args: TCtorArgs) => TCtorClass
        : TCtors[K]
} {
    return Object.keys(ctors).reduce<any>(
        (facs, key) => ({ ...facs, [key]: makeFactory(ctors[key]) }),
        {}
    );
};
