# react-native-fast-trie

A fast, memory-efficient Trie implementation for React Native. Uses Tessel's [HAT-trie](https://github.com/Tessil/hat-trie).

- 💾 Low memory footprint
- ⚡️ Extremely fast for contructing large tries
- 🧪 Well tested in JS and C++

## Installation

```sh
npm install react-native-fast-trie
yarn add react-native-fast-trie
```

## Benchmarks

Benchmarks are taken compared to a commonly-used JS implementation (trie-typed) on real devices built in release mode. You can build the example project on your device to reproduce these results.

Tests are as follows:

- **Single Wordlist**: Insert all the words in the english bip39 dictionary into a Trie
- **Batch Insert**: Use the batchInsert method with the entire english bip39 array for FastTrie
- **All Wordlists**: Create a separate trie for each bip39 wordlist by locale and insert into each
- **Contains**: Access 1,000,000 random words from the english bip39 wordlist
- **Find**: Find 1,000,000 substrings of random words from the english bip39 wordlist

| Device            | Single Wordlist | Batch Insert  | All Wordlists | Contains     | Find          |
| ----------------- | --------------- | ------------- | ------------- | ------------ | ------------- |
| Pixel 5           | 4.64x faster    | 16.86x faster | 7.76x faster  | 2.94x faster | 24.63x faster |
| Pixel 3a          | 3.26x faster    | 14.67x faster | 5.54x faster  | 3.06x faster | 26.23x faster |
| Galaxy A10e       | 2.94x faster    | 9.83x faster  | 4.84x faster  | 3.95x faster | 11.47x faster |
| iPhone 15 Pro Max | 3.78x faster    | 10.33x faster | 5.13x faster  | 3.43x faster | 23.83x faster |
| iPhone 11 Pro Max | 4.65x faster    | 13.12x faster | 5.21x faster  | 3.35x faster | 23.79x faster |
| iPhone 7          | 3.58x faster    | 12.03x faster | 5.65x faster  | 3.46x faster | 26.86x faster |

Screenshots of these benchmarks can be found in the [benchmarks folder](./benchmarks/).

## Usage

```js
// index.js
import { FastTrie } from 'react-native-fast-trie';

const trie = new FastTrie();
console.log(trie.contains('test')); // false

trie.insert('test');
console.log(trie.contains('test')); // true
console.log(trie.find('te')); // ['test']

trie.batchInsert(['test2', 'test3']);

// Limit to only 2 results
console.log(trie.find('te', 2)); // ['test2', 'test3']

trie.delete('test2');

console.log(trie.contains('test2')); // false
```

## API

### Overview

FastTrie is a high-performance trie implementation designed for React Native applications. It offers efficient operations for inserting elements, checking for their existence, and finding elements with a specific prefix. The implementation provides customization options to balance between speed and memory usage.

### `FastTrieOptions` Type

This type allows configuration of the FastTrie instance.

- `burstThreshold?: number`  
  Specifies the maximum size of an array hash node before a burst occurs. A higher value (e.g., 16,384) is recommended for exact searches, while the default value of 1024 is optimized for prefix searches.

- `maxLoadFactor?: number`  
  Determines the load factor of the trie. A lower value increases speed, while a higher value decreases memory usage. The default value is 8.0.

### `FastTrie` Class

#### Constructor

Creates a new instance of FastTrie.

- **Parameters:**

  - `options: FastTrieOptions` (optional)  
    Configuration options for the trie. Includes `burstThreshold` and `maxLoadFactor`.

- **Example:**
  ```javascript
  const trie = new FastTrie({ burstThreshold: 2048, maxLoadFactor: 10.0 });
  ```

#### Methods

`insert(item: string): void`

> Inserts a string into the trie.

```javascript
trie.insert('example');
```

`batchInsert(items: string[]): void`

> Inserts multiple strings into the trie in a single operation. This method is optimized for bulk insertions and is more efficient than inserting items individually.

```javascript
trie.batchInsert(['apple', 'apricot', 'banana']);
```

`contains(item: string): boolean`

> Checks if a string is present in the trie.

```javascript
const isPresent = trie.contains('example');
```

`find(prefix: string, maxResults?: number): boolean`

> Finds all strings in the trie that start with the given prefix.

```javascript
const results = trie.find('ex', 10);
```

`delete(item: string): void`

> Deletes a string if it exists in the trie

```javascript
trie.delete('apple');
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
