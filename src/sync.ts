import { StoreSync as AbstractStore } from "@konceiver/kv-file";
import { readFileSync, writeFileSync } from "fs-extra";
import { pack, unpack } from "msgpack";

export class StoreSync<K, T> extends AbstractStore<K, T> {
	public static new<K, T>(uri: string): StoreSync<K, T> {
		return new StoreSync<K, T>(new Map<K, T>(), uri);
	}

	protected dump(): void {
		writeFileSync(this.uri, pack(this.all()));
	}

	protected load(): void {
		try {
			for (const [key, value] of Object.entries(
				unpack(readFileSync(this.uri))
			)) {
				// @ts-ignore
				this.put(key, value);
			}
		} catch {
			//
		}
	}
}
