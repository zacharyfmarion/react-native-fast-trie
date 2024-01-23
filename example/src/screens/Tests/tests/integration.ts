import { describe, it } from '../../../testing/MochaRnAdapter';
import { expect } from 'chai';

export function registerIntegrationTests() {
  describe('example', () => {
    it('should work', () => {
      expect(1).eq(1);
    });
  });
}
