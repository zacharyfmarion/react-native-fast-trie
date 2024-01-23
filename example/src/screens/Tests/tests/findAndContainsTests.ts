import { describe, it } from '../../../testing/MochaRnAdapter';
import { expect } from 'chai';
import { FastTrie } from 'react-native-fast-trie';

export function registerFindAndContainsTests() {
  describe('FastTrie Find and Contains Tests', () => {
    it('should return true for contains when the exact string is present in the trie', () => {
      const trie = new FastTrie();
      trie.insert('hello');
      expect(trie.contains('hello')).to.be.true;
    });

    it('should return false for contains when the string is not present in the trie', () => {
      const trie = new FastTrie();
      trie.insert('hello');
      expect(trie.contains('world')).to.be.false;
    });

    it('should return correct results for find with a given prefix', () => {
      const trie = new FastTrie();
      trie.insert('hello');
      trie.insert('helium');
      const results = trie.find('hel');
      expect(results).to.include.members(['hello', 'helium']);
    });

    it('should respect maxResults in find method', () => {
      const trie = new FastTrie();
      trie.insert('apple');
      trie.insert('applet');
      trie.insert('application');
      const results = trie.find('app', 2);
      expect(results.length).to.equal(2);
    });

    it('should respect case sensitivity in find and contains methods', () => {
      const trie = new FastTrie();
      trie.insert('Test');
      trie.insert('test');
      expect(trie.contains('Test')).to.be.true;
      expect(trie.contains('test')).to.be.true;
      expect(trie.find('T')).to.include('Test');
      expect(trie.find('t')).to.include('test');
    });

    it('should throw an error when find is called with null', () => {
      const trie = new FastTrie();
      // @ts-expect-error
      expect(() => trie.find(null)).to.throw();
    });

    it('should throw an error when find is called with undefined', () => {
      const trie = new FastTrie();
      // @ts-expect-error
      expect(() => trie.find(undefined)).to.throw();
    });

    it('should throw an error when contains is called with a non-string value', () => {
      const trie = new FastTrie();
      expect(() => trie.contains(123 as unknown as string)).to.throw();
    });
  });
}
