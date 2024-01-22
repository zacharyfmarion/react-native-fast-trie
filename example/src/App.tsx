import * as React from 'react';

import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { startBench } from './benchmarks/bench';
import type { BenchmarkResult } from './benchmarks/utils';

export default function App() {
  const [result, setResult] = React.useState<BenchmarkResult[]>();
  React.useEffect(() => {
    setTimeout(() => {
      setResult(startBench());
    }, 100);
  }, []);

  return (
    <View style={styles.container}>
      {result ? (
        result.map((it, index) => (
          // eslint-disable-next-line react-native/no-inline-styles
          <View key={index} style={{ marginBottom: 32 }}>
            <Text>Test: {it.name}</Text>
            <Text>JS Trie URL: {it.b1.toFixed(2)}ms</Text>
            <Text>FastTrie: {it.b2.toFixed(2)}ms</Text>
            <Text>FastTrie is {(it.b1 / it.b2).toFixed(2)}x faster</Text>
          </View>
        ))
      ) : (
        <View>
          <ActivityIndicator size={64} />
          <Text>Running benchmark...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
