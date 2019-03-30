export const integer = (i: number): boolean => Number.isInteger(i);
export const emptyObject = (obj: any): boolean  => Object.keys(obj).length === 0;
export const emptyArray = (arr: never[]): boolean => arr.length === 0;
export const emptyString = (s: string): boolean => s.length === 0;
export const emptySet = (s: Set<never>): boolean => s.size === 0;
export const emptyMap = (m: Map<never, never>): boolean => m.size === 0;
