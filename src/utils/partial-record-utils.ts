import { defined, PartialRecord } from "../../shared/type/types";

export namespace PartialRecordUtil {
	export function entries<K extends string, V extends defined>(partialRecord: PartialRecord<K, V>): [K, V][] {
		// handle people making the very bad choice of polluting a PartialRecord with undefined values
		const entries: [K, V][] = Object.entries(partialRecord).filter(([key, val]) => undefined !== val) as [K, V][];
		return entries;
	}

	export function keys<K extends string, V extends defined>(partialRecord: PartialRecord<K, V>): K[] {
		// handle people making the very bad choice of polluting a PartialRecord with undefined values
		const keys: K[] = entries(partialRecord).map(([key, val]) => key);
		return keys;
	}

	export function values<K extends string, V extends defined>(partialRecord: PartialRecord<K, V>): V[] {
		// handle people making the very bad choice of polluting a PartialRecord with undefined values
		const values: V[] = entries(partialRecord).map(([key, val]) => val);
		return values;
	}
}