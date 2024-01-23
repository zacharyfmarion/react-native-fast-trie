import { describe } from '../../../testing/MochaRnAdapter';
import { expect } from 'chai';

export function registerIntegrationTests() {
  describe('example', function () {
    expect(1).eq(1);
  });
}
