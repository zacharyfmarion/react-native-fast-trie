export type TestingScreenProps = {
  testRegistrators: Array<() => void>;
};

export type RootStackParamList = {
  Home: undefined;
  Benchmarks: undefined;
  SpeedBenchmarks: undefined;
  MemoryBenchmarks: undefined;
  Tests: TestingScreenProps;
};
