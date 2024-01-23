import { describe, it } from '../../../testing/MochaRnAdapter';
import { expect } from 'chai';
import { FastTrie } from 'react-native-fast-trie';

export function registerConfigurationAndErrorHandlingTests() {
  describe('FastTrie Configuration and Error Handling Tests', () => {
    it('should not crash with valid burstThreshold and maxLoadFactor values', () => {
      expect(
        () => new FastTrie({ burstThreshold: 1024, maxLoadFactor: 8.0 })
      ).to.not.throw();
      expect(
        () => new FastTrie({ burstThreshold: 2048, maxLoadFactor: 10.0 })
      ).to.not.throw();
    });

    it('should throw an error when instantiated with an invalid type for burstThreshold', () => {
      expect(
        () => new FastTrie({ burstThreshold: 'invalid' as unknown as number })
      ).to.throw();
    });

    it('should throw an error when instantiated with an invalid type for maxLoadFactor', () => {
      expect(
        () => new FastTrie({ maxLoadFactor: 'invalid' as unknown as number })
      ).to.throw();
    });
  });
}
