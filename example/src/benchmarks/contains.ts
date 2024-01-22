import { Trie } from '../Trie';
import { FastTrie } from 'react-native-fast-trie';
import { wordlistEN } from '../wordlists/allWordlists';
import {
  getRandomWords,
  type BenchmarkResult,
  createTrie,
  runBenchmark,
} from './utils';

function containsBench(wordlist: string[]): BenchmarkResult {
  const words = getRandomWords(wordlist, 1000000);
  const trie = createTrie(Trie, wordlist);
  const fastTrie = createTrie(FastTrie, wordlist);

  return runBenchmark(
    'Contains',
    () => {
      for (const word of words) {
        trie.contains(word);
      }
    },
    () => {
      for (const word of words) {
        fastTrie.contains(word);
      }
    }
  );
}

export function registerBenchmarks() {
  return [containsBench(wordlistEN)];
}
