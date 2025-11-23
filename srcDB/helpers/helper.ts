import { ObjectId } from "../model/dataModels";

export function generateObjectId(): ObjectId {
    return `${Date.now()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
}

export function safeSerializeMap(map?: Map<unknown, unknown>): string {
    return map ? JSON.stringify([...map.entries()]) : JSON.stringify([]);
}

export function safeSerializeNestedMap(nestedMap?: Map<unknown, Map<unknown, unknown>>): string {
    return nestedMap ? JSON.stringify(
        [...nestedMap.entries()].map(([key, innerMap]) => [
            key,
            [...innerMap.entries()]
        ])
    ) : JSON.stringify([]);
}

export function safeSerializeArray(arr?: unknown[]): string {
    return arr ? JSON.stringify(arr) : JSON.stringify([]);
}
