
declare class Time {
  constructor(c: any);
  isValid(): boolean;
  unix(): number;
  valueOf(): number;
  clone(): Time;
  format(str: string): string;
}

declare module "browser-used/lib/time" {
  export function time(c: any): void;
  export var Time = Time;
}