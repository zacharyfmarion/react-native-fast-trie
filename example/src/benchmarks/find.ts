import { wordlistEN } from '../wordlists/allWordlists';
import {
  type BenchmarkResult,
  createTrie,
  runBenchmark,
  getRandomWordSubstrings,
  getJsTrie,
  getFastTrie,
} from './utils';

function findBench(wordlist: string[]): BenchmarkResult {
  const words = getRandomWordSubstrings(wordlist, 10000);
  const trie = createTrie(getJsTrie, wordlist);
  const fastTrie = createTrie(getFastTrie, wordlist);

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
