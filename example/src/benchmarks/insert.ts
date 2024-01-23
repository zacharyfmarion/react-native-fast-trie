import {
  createTrie,
  type BenchmarkResult,
  runBenchmark,
  createBip39Dictionaries,
  getJsTrie,
  getFastTrie,
} from './utils';
import { wordlistEN } from '../wordlists/allWordlists';

function singleWordlistBench(wordlist: string[]): BenchmarkResult {
  return runBenchmark(
    'Single wordlist',
    () => {
      createTrie(getJsTrie, wordlist);
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
      createBip39Dictionaries(getJsTrie);
    },
    () => {
      createBip39Dictionaries(getFastTrie);
    }
  );
}

function batchInsertBench(wordlist: string[]): BenchmarkResult {
  return runBenchmark(
    'Batch insert',
    () => {
      createTrie(getJsTrie, wordlist);
    },
    () => {
      const result = getFastTrie();
      result.batchInsert(wordlist);
    }
  );
}

export function registerBenchmarks() {
  return [
    singleWordlistBench(wordlistEN),
    batchInsertBench(wordlistEN),
    allWordlistsBench(),
  ];
}
