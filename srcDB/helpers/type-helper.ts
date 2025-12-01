export type some = { [key: string]: some } | object | string | boolean | symbol | number | bigint | null | undefined;

export type defined = Exclude<some, undefined>;

export type PartialRecord<K extends keyof any, T extends defined> = {
	[P in K]?: T;
};