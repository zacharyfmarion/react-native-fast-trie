# react-native-fast-trie

A fast, memory-efficient Trie implementation for React Native. Uses Tessel's [HAT-trie](https://github.com/Tessil/hat-trie).

## Installation

```sh
npm install react-native-fast-trie
yarn add react-native-fast-trie
```

## Benchmarks

Benchmarks taken on a Pixel 6 pro simulator, comparing to a commonly-used JS implementation.

> NOTE: There are JS optimizations that could make the trie that we compare to faster, however since there is not a good trie npm module that implements them I am comparing against a naive approach.

| Test            | JS Trie URL (ms) | FastTrie (ms) | FastTrie Times Faster |
|-----------------|------------------|---------------|-----------------------|
| Single wordlist | 5.76             | 4.44          | 1.30                  |
| All wordlists   | 170.97           | 55.05         | 3.11                  |
| Contains        | 1400.26          | 1105.99       | 1.27                  |
| Find            | 10644.66         | 1249.59       | 8.52                  |


## Usage

```js
// index.js
import { FastTrie } from 'react-native-fast-trie';

const trie = new FastTrie();  
console.log(trie.contains('test')) // false
trie.insert('test');
console.log(trie.contains('test')) // true
console.log(trie.find('te')); // ['test']
trie.insert('test2');
trie.insert('test3');
// Limit to only 2 results
console.log(trie.find('te', 2)); // ['test2', 'test3']
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

- `insert(item: string): void`  
  Inserts a string into the trie.

  - **Parameters:**
    - `item: string`  
      The string to be inserted into the trie.

  - **Example:**
    ```javascript
    trie.insert("example");
    ```

- `contains(item: string): boolean`  
  Checks if a string is present in the trie.

  - **Parameters:**
    - `item: string`  
      The string to be checked in the trie.

  - **Returns:**  
    `true` if the string is present, `false` otherwise.

  - **Example:**
    ```javascript
    const isPresent = trie.contains("example");
    ```

- `find(prefix: string, maxResults?: number): boolean`  
  Finds all strings in the trie that start with the given prefix.

  - **Parameters:**
    - `prefix: string`  
      The prefix to search for in the trie.
    - `maxResults?: number` (optional)  
      The maximum number of results to return.

  - **Returns:**  
    `true` if the operation is successful, `false` otherwise.

  - **Example:**
    ```javascript
    const results = trie.find("ex", 10);
    ```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)