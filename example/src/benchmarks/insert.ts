import {
  createTrie,
  type BenchmarkResult,
  runBenchmark,
  createBip39Dictionaries,
  getFastTrie,
  getFastJsTrie,
} from './utils';
import { wordlistEN } from '../wordlists/allWordlists';

function singleWordlistBench(wordlist: string[]): BenchmarkResult {
  return runBenchmark(
    'Single wordlist',
    () => {
      createTrie(getFastJsTrie, wordlist);
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
      createBip39Dictionaries(getFastJsTrie);
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
      createTrie(getFastJsTrie, wordlist);
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
