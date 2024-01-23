// insertTests.ts
import { describe, it } from '../../../testing/MochaRnAdapter';
import { expect } from 'chai';
import { FastTrie } from 'react-native-fast-trie';

export function registerInsertionTests() {
  describe('FastTrie Insertion Tests', () => {
    it('should insert a single string and find it in the trie', () => {
      const trie = new FastTrie();
      trie.insert('test');
      expect(trie.contains('test')).to.be.true;
    });

    it('should treat case-sensitive strings as distinct entries', () => {
      const trie = new FastTrie();
      trie.insert('apple');
      trie.insert('Apple');
      expect(trie.contains('apple')).to.be.true;
      expect(trie.contains('Apple')).to.be.true;
    });

    it('should handle special ASCII characters correctly', () => {
      const trie = new FastTrie();
      trie.insert('hello@world');
      expect(trie.contains('hello@world')).to.be.true;
    });

    it('should correctly insert multiple strings using batchInsert', () => {
      const trie = new FastTrie();
      trie.batchInsert(['one', 'two', 'three']);
      expect(trie.contains('one')).to.be.true;
      expect(trie.contains('two')).to.be.true;
      expect(trie.contains('three')).to.be.true;
    });

    it('should throw an error when inserting null', () => {
      const trie = new FastTrie();
      // @ts-expect-error
      expect(() => trie.insert(null)).to.throw();
    });

    it('should throw an error when inserting undefined', () => {
      const trie = new FastTrie();
      // @ts-expect-error
      expect(() => trie.insert(undefined)).to.throw();
    });

    it('should throw an error when inserting a non-string value', () => {
      const trie = new FastTrie();
      expect(() => trie.insert(123 as unknown as string)).to.throw();
    });
  });
}
