import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../params';

export function Benchmarks() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  return (
    <View style={styles.container}>
      <Button
        title="Speed benchmarks"
        onPress={() => {
          navigation.navigate('SpeedBenchmarks');
        }}
      />
      <Button
        title="Memory benchmarks"
        onPress={() => {
          navigation.navigate('MemoryBenchmarks');
        }}
      />
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
