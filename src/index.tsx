import { Platform, NativeModules } from 'react-native';

type FastTrieInstance = {
  insert(item: string): void;
  delete(item: string): void;
  batchInsert(item: string[]): void;
  contains(item: string): boolean;
  find(prefix: string, maxResults?: number): string[];
};

type FastTrieModule = (
  burstThreshold: number,
  maxLoadFactor: number
) => FastTrieInstance;

declare global {
  var __FastTrie: FastTrieModule;
}

const LINKING_ERROR =
  `The package 'react-native-fast-trie' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const NativeFastTrie = NativeModules.FastTrie
  ? NativeModules.FastTrie
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

if (global.__FastTrie == null) {
  const installed = NativeFastTrie.install();

  if (installed) {
  } else {
    throw new Error(LINKING_ERROR);
  }
}

type FastTrieOptions = {
  /**
   * The maximum size of an array hash node before a burst occurs. If you are
   * mainly dealing with exact searches you should set this value to something larger
   * like 16 384. This library defaults the value to 1024 which is better for prefix searches
   */
  burstThreshold?: number;
  /**
   * A lower max load factor will increase the speed, a higher one will reduce the memory usage.
   * Its default value is set to 8.0.
   */
  maxLoadFactor?: number;
};

/**
 * A fast trie implementation for React Native.
 */
export class FastTrie {
  private _trie: ReturnType<FastTrieModule>;

  constructor({
    burstThreshold = 1024,
    maxLoadFactor = 8.0,
  }: FastTrieOptions = {}) {
    this._trie = global.__FastTrie(burstThreshold, maxLoadFactor);
  }

  insert(item: string): void {
    return this._trie.insert(item);
  }

  batchInsert(items: string[]): void {
    return this._trie.batchInsert(items);
  }

  delete(item: string): void {
    return this._trie.delete(item);
  }

  contains(item: string): boolean {
    return this._trie.contains(item);
  }

  find(prefix: string, maxResults?: number): string[] {
    return this._trie.find(prefix, maxResults);
  }
}
