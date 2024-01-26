import * as React from 'react';

import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { measureAllocationSize } from 'react-native-heap-profiler';
import { wordlistEN } from '../../wordlists/allWordlists';
import { FastTrie } from 'react-native-fast-trie';
import { JsTrie } from '../../JsTrie';

type Result = {
  name?: string;
  jsTrieAllocation: number;
  fastTrieAllocation: number;
  diff: number;
  percentReduction: number;
};

function runMemoryBench() {
  const results: Result[] = [];

  for (let i = 0; i < 10; i++) {
    const jsTrieAllocation = measureAllocationSize(() => {
      const trie = new JsTrie();
      wordlistEN.forEach((word) => {
        trie.insert(word);
      });
    });

    const jsTrieAllocationInBytes = jsTrieAllocation / 1024 / 1024;

    const fastTrieAllocation = measureAllocationSize(() => {
      const trie = new FastTrie();
      wordlistEN.forEach((word) => {
        trie.insert(word);
      });
    });

    const fastTrieAllocationInBytes = fastTrieAllocation / 1024 / 1024;

    // Measure in MB
    results.push({
      jsTrieAllocation: jsTrieAllocationInBytes,
      fastTrieAllocation: fastTrieAllocationInBytes,
      diff: jsTrieAllocationInBytes - fastTrieAllocationInBytes,
      percentReduction:
        (1 - fastTrieAllocationInBytes / jsTrieAllocationInBytes) * 100,
    });
  }

  // Avg the results
  return {
    name: 'Single trie',
    jsTrieAllocation: avgElement(results, 'jsTrieAllocation'),
    fastTrieAllocation: avgElement(results, 'fastTrieAllocation'),
    diff: avgElement(results, 'diff'),
    percentReduction: avgElement(results, 'percentReduction'),
  };
}

function avgElement<T extends string>(results: Record<T, number>[], key: T) {
  return results.reduce((acc, curr) => acc + curr[key], 0) / results.length;
}

export function MemoryBenchmarks() {
  const [results, setResults] = React.useState<Result[]>();
  React.useEffect(() => {
    setTimeout(() => {
      const result = runMemoryBench();
      setResults([result]);
    }, 100);
  }, []);

  return (
    <View style={styles.container}>
      {results ? (
        results.map((it, index) => (
          // eslint-disable-next-line react-native/no-inline-styles
          <View key={index} style={{ marginBottom: 32 }}>
            <Text style={styles.textColor}>Test: {it.name}</Text>
            <Text style={styles.textColor}>
              JS Trie URL: {it.jsTrieAllocation.toFixed(2)}MB
            </Text>
            <Text style={styles.textColor}>
              FastTrie: {it.fastTrieAllocation.toFixed(2)}MB
            </Text>
            <Text style={styles.textColor}>
              FastTrie uses {it.percentReduction.toFixed(2)}% less memory
            </Text>
          </View>
        ))
      ) : (
        <View>
          <ActivityIndicator size={64} />
          <Text style={styles.textColor}>Running benchmark...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColor: {
    color: 'black',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
