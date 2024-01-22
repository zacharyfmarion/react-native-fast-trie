import { Trie } from '../Trie';
import { FastTrie } from 'react-native-fast-trie';
import { wordlistEN } from '../wordlists/allWordlists';
import {
  type BenchmarkResult,
  createTrie,
  runBenchmark,
  getRandomWordSubstrings,
} from './utils';

function findBench(wordlist: string[]): BenchmarkResult {
  const words = getRandomWordSubstrings(wordlist, 10000);
  const trie = createTrie(Trie, wordlist);
  const fastTrie = createTrie(FastTrie, wordlist);

  return runBenchmark(
    'Find',
    () => {
      for (const word of words) {
        trie.find(word);
      }
    },
    () => {
      for (const word of words) {
        fastTrie.find(word);
      }
    }
  );
}

export function registerBenchmarks() {
  return [findBench(wordlistEN)];
}
