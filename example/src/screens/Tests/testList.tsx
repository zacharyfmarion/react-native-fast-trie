import { registerIntegrationTests } from './tests/integration';
import { type TestItemType } from './types';

export const TEST_LIST: Array<TestItemType> = [
  {
    description: 'Integration tests',
    value: true,
    registrator: registerIntegrationTests,
  },
];
