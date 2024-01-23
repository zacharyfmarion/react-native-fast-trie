import { describe, it } from '../../../testing/MochaRnAdapter';
import { expect } from 'chai';
import { FastTrie } from 'react-native-fast-trie';

export function registerDeletionTests() {
  describe('FastTrie Deletion Tests', () => {
    it('should delete an existing string and verify it no longer exists in the trie', () => {
      const trie = new FastTrie();
      trie.insert('test');
      trie.delete('test');
      expect(trie.contains('test')).to.be.false;
    });

    it('should not affect the trie when deleting a string that does not exist', () => {
      const trie = new FastTrie();
      trie.insert('test');
      trie.delete('nonexistent');
      expect(trie.contains('test')).to.be.true;
    });

    it('should respect case sensitivity during deletion', () => {
      const trie = new FastTrie();
      trie.insert('Test');
      trie.delete('test'); // different case
      expect(trie.contains('Test')).to.be.true;
    });

    it('should throw an error when deleting null', () => {
      const trie = new FastTrie();
      // @ts-expect-error
      expect(() => trie.delete(null)).to.throw();
    });

    it('should throw an error when deleting undefined', () => {
      const trie = new FastTrie();
      // @ts-expect-error
      expect(() => trie.delete(undefined)).to.throw();
    });

    it('should throw an error when deleting a non-string value', () => {
      const trie = new FastTrie();
      expect(() => trie.delete(123 as unknown as string)).to.throw();
    });
  });
}
