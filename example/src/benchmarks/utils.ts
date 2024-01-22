import performance from 'react-native-performance';
import {
  wordlistCZ,
  wordlistEN,
  wordlistES,
  wordlistFR,
  wordlistIT,
  wordlistJP,
  wordlistKR,
  wordlistPT,
  wordlistZHCN,
  wordlistZHTW,
} from '../wordlists/allWordlists';

export type BenchmarkResult = {
  name: string;
  b1: number;
  b2: number;
};

export function bench(tag: string, fn: () => void) {
  performance.mark('start_' + tag);
  fn();
  performance.mark('end_' + tag);
  performance.measure(tag, 'start_' + tag, 'end_' + tag);
  console.log(tag, performance.getEntriesByName(tag));
  return performance.getEntriesByName(tag);
}

export function runBenchmark(
  name: string,
  f1: () => void,
  f2: () => void
): BenchmarkResult {
  global.gc?.();
  const b1 = bench(`pure js Trie x - ${name}`, f1);
  global.gc?.();
  const b2 = bench(`fast Trie x - ${name}`, f2);

  return {
    name,
    b1: b1[0]?.duration!,
    b2: b2[0]?.duration!,
  };
}

export function createTrie(trie: any, wordlist: string[]) {
  const result = new trie();
  for (const word of wordlist) {
    result.insert(word);
  }
  return result;
}

export function getRandomWords(wordlist: string[], numWords: number) {
  const result: string[] = [];
  for (let i = 0; i < numWords; i++) {
    result.push(
      wordlist[Math.floor(Math.random() * wordlist.length)] as string
    );
  }
  return result;
}

export function getRandomWordSubstrings(wordlist: string[], numWords: number) {
  const result: string[] = [];
  for (let i = 0; i < numWords; i++) {
    const word = wordlist[
      Math.floor(Math.random() * wordlist.length)
    ] as string;
    const start = Math.floor(Math.random() * word.length);
    const end = Math.floor(Math.random() * word.length);
    result.push(word.substring(start, end));
  }
  return result;
}

const wordlists: [string, string[]][] = [
  ['en', wordlistEN],
  ['es', wordlistES],
  ['fr', wordlistFR],
  ['it', wordlistIT],
  ['pt', wordlistPT],
  ['cz', wordlistCZ],
  ['jp', wordlistJP],
  ['kr', wordlistKR],
  ['zhCN', wordlistZHCN],
  ['zhTW', wordlistZHTW],
];

export function createBip39Dictionaries(trie: any) {
  const bip39Dictionaries: Record<string, any> = {
    allLangs: new trie(),
    en: new trie(),
    es: new trie(),
    fr: new trie(),
    it: new trie(),
    pt: new trie(),
    cz: new trie(),
    jp: new trie(),
    kr: new trie(),
    zhCN: new trie(),
    zhTW: new trie(),
  };

  wordlists.forEach(([locale, wordList]) => {
    for (const word of wordList) {
      bip39Dictionaries[locale].insert(word);
      bip39Dictionaries.allLangs.insert(word);
    }
  });
}
