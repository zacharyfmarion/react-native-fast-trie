export type TestingScreenProps = {
  testRegistrators: Array<() => void>;
};

export type RootStackParamList = {
  Home: undefined;
  Benchmarks: undefined;
  Tests: TestingScreenProps;
};
