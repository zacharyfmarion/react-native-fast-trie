import { registerBenchmarks as registerContainsBenchmarks } from './contains';
import { registerBenchmarks as registerInsertBenchmarks } from './insert';
import { registerBenchmarks as registerFindBenchmarks } from './find';

import type { BenchmarkResult } from './utils';

export function startBench(): BenchmarkResult[] {
  return [
    ...registerInsertBenchmarks(),
    ...registerContainsBenchmarks(),
    ...registerFindBenchmarks(),
  ];
}
