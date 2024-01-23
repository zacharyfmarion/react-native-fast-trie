import { registerConfigurationAndErrorHandlingTests } from './tests/configurationAndErrorHandlingTests';
import { registerDeletionTests } from './tests/deletionTests';
import { registerFindAndContainsTests } from './tests/findAndContainsTests';
import { registerInsertionTests } from './tests/insertionTests';
import { type TestItemType } from './types';

export const TEST_LIST: Array<TestItemType> = [
  {
    description: 'Insertion tests',
    value: true,
    registrator: registerInsertionTests,
  },
  {
    description: 'Deletion tests',
    value: true,
    registrator: registerDeletionTests,
  },
  {
    description: 'Find and Contains tests',
    value: true,
    registrator: registerFindAndContainsTests,
  },
  {
    description: 'Configuration and Error Handling',
    value: true,
    registrator: registerConfigurationAndErrorHandlingTests,
  },
];
