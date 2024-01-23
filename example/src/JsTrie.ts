import { Trie } from 'trie-typed';

/**
 * Wrapper class for Trie to provide a unified interface
 */
export class JsTrie {
  _trie: Trie;

  constructor() {
    this._trie = new Trie();
  }

  insert(item: string) {
    this._trie.add(item);
  }

  contains(item: string) {
    return this._trie.has(item);
  }

  find(search: string, max: number | undefined = undefined) {
    return this._trie.getWords(search, max);
  }
}
