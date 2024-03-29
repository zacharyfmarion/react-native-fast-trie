import * as React from 'react';

import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { startBench } from './benchmarks/bench';
import { type BenchmarkResult } from './benchmarks/utils';

export function SpeedBenchmarks() {
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
            <Text style={styles.textColor}>Test: {it.name}</Text>
            <Text style={styles.textColor}>
              JS Trie URL: {it.b1.toFixed(2)}ms
            </Text>
            <Text style={styles.textColor}>FastTrie: {it.b2.toFixed(2)}ms</Text>
            <Text style={styles.textColor}>
              FastTrie is {(it.b1 / it.b2).toFixed(2)}x faster
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
