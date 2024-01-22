/**
 * Naive pure js implementation of a Trie.
 */
export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode(null);
  }

  insert(word: string) {
    let node = this.root;

    for (let i = 0; i < word.length; i++) {
      // check to see if character node exists in children.
      const wordChar = word[i] as string;
      if (!node.children[wordChar]) {
        node.children[wordChar] = new TrieNode(wordChar);
        // @ts-expect-error
        node.children[wordChar].parent = node;
      }

      // proceed to the next depth in the trie.
      node = node.children[wordChar] as TrieNode;

      // check if it's the last word.
      if (i === word.length - 1) {
        node.leafNode = true;
      }
    }
  }

  /** check if it contains a whole word */
  contains(word: string) {
    let node = this.root;

    for (const char of word) {
      if (node.children[char]) {
        node = node.children[char] as TrieNode;
      } else {
        return false;
      }
    }

    // we finished going through all the words, is it a whole word?
    return node.leafNode;
  }

  /** Returns every word with given prefix */
  find(prefix: string, maxResults?: number) {
    let node = this.root;
    const output: string[] = [];

    for (const char of prefix) {
      // make sure prefix actually has words
      if (node.children[char]) {
        node = node.children[char] as TrieNode;
      } else {
        // there's none. just return it.
        return output;
      }
    }

    findAllWords(node, output, maxResults);
    return output;
  }
}

// recursive function to find all words in the given node.
function findAllWords(node: TrieNode, arr: string[], maxResults?: number) {
  // base case, if node is at a word, push to output
  if (node.leafNode) {
    arr.push(node.getWord());
  }

  // iterate through each children, call recursive findAllWords
  for (const child of Object.values(node.children)) {
    if (maxResults && maxResults <= arr.length) {
      return;
    }

    findAllWords(child, arr, maxResults);
  }
}

class TrieNode {
  readonly key: string | null;
  parent: TrieNode | null;
  children: Record<string, TrieNode>;
  leafNode: boolean;

  constructor(key: string | null) {
    this.key = key;
    this.parent = null;
    this.children = {};
    this.leafNode = false;
  }

  /**
   * iterates through the parents to get the word.
   * time complexity: O(k), k = word length
   */
  getWord() {
    const output = [];
    let node = this as TrieNode | null;

    while (node !== null) {
      output.unshift(node.key);
      node = node.parent;
    }

    return output.join('');
  }
}
