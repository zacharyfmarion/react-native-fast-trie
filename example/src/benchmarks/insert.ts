import {
  createTrie,
  type BenchmarkResult,
  runBenchmark,
  createBip39Dictionaries,
  getTrie,
  getFastTrie,
} from './utils';
import { wordlistEN } from '../wordlists/allWordlists';

function singleWordlistBench(wordlist: string[]): BenchmarkResult {
  return runBenchmark(
    'Single wordlist',
    () => {
      createTrie(getTrie, wordlist);
    },
    () => {
      createTrie(getFastTrie, wordlist);
    }
  );
}

function allWordlistsBench(): BenchmarkResult {
  return runBenchmark(
    'All wordlists',
    () => {
      createBip39Dictionaries(getTrie);
    },
    () => {
      createBip39Dictionaries(getFastTrie);
    }
  );
}

export function registerBenchmarks() {
  return [singleWordlistBench(wordlistEN), allWordlistsBench()];
}
