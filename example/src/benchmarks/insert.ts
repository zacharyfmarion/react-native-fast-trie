import { Trie } from '../Trie';
import { FastTrie } from 'react-native-fast-trie';
import {
  createTrie,
  type BenchmarkResult,
  runBenchmark,
  createBip39Dictionaries,
} from './utils';
import { wordlistEN } from '../wordlists/allWordlists';

function singleWordlistBench(wordlist: string[]): BenchmarkResult {
  return runBenchmark(
    'Single wordlist',
    () => {
      createTrie(Trie, wordlist);
    },
    () => {
      createTrie(FastTrie, wordlist);
    }
  );
}

function allWordlistsBench(): BenchmarkResult {
  return runBenchmark(
    'All wordlists',
    () => {
      createBip39Dictionaries(Trie);
    },
    () => {
      createBip39Dictionaries(FastTrie);
    }
  );
}

export function registerBenchmarks() {
  return [singleWordlistBench(wordlistEN), allWordlistsBench()];
}
