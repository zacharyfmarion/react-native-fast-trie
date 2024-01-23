# react-native-fast-trie

A fast, memory-efficient Trie implementation for React Native. Uses Tessel's [HAT-trie](https://github.com/Tessil/hat-trie).

## Installation

```sh
npm install react-native-fast-trie
yarn add react-native-fast-trie
```

## Benchmarks

Benchmarks are taken compared to a commonly-used JS implementation.

> NOTE: There are JS optimizations that could make the trie that we compare to faster, however since there is not a good trie npm module that implements them I am comparing against a naive approach.

### Android

Benchmarks taken on a Pixel 6 pro simulator, tested on bip39 wordlists & comparing to a commonly-used JS implementation. Note that batch inserting is much faster if you have all the items initially as it avoids the overhead of JSI communication between JS and C++.

| Test            | JS Trie (ms) | FastTrie (ms) | Difference   |
| --------------- | ------------ | ------------- | ------------ |
| Insert EN       | 5.76         | 4.44          | 1.30x faster |
| Batch Insert EN | 6.15         | 0.79          | 7.78x faster |
| All wordlists   | 170.97       | 55.05         | 3.11x faster |
| Contains        | 1400.26      | 1105.99       | 1.27x faster |
| Find            | 10644.66     | 1249.59       | 8.52x faster |

### iOS

Tested on an iphone 14 simulator. Note that inserting and contains are actually slower, but finding is much faster. Depending on the parameters you tweak you can change this behavior, but given the overhead of JSI a faster phone is going to see less benefit of using this library.

| Test            | JS Trie (ms) | FastTrie (ms) | Difference   |
| --------------- | ------------ | ------------- | ------------ |
| Insert EN       | 6.01         | 6.73          | 0.89x faster |
| Batch insert EN | 5.28         | 2.25          | 2.35x faster |
| All wordlists   | 137.02       | 113.95        | 1.20x faster |
| Contains        | 1665.45      | 2499.88       | 0.67x faster |
| Find            | 12624.26     | 2453.31       | 5.15x faster |

## Usage

```js
// index.js
import { FastTrie } from 'react-native-fast-trie';

const trie = new FastTrie();
console.log(trie.contains('test')); // false

trie.insert('test');
console.log(trie.contains('test')); // true
console.log(trie.find('te')); // ['test']

trie.insert('test2');
trie.insert('test3');

// Limit to only 2 results
console.log(trie.find('te', 2)); // ['test2', 'test3']

// Insert multiple items at once. For large tries this is much more performant
trie.batchInsert(['alpha', 'beta', 'gamma']);
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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
