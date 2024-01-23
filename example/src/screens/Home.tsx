import React, { useState, useCallback } from 'react';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { TestItemType } from './Tests/types';
import { TEST_LIST } from './Tests/testList';
import { TestItem } from '../components/TestItem';
import { Button } from '../components/Button';

type EntryProps = NativeStackScreenProps<any, 'Entry'>;

const useTests = (): [
  Array<TestItemType>,
  (index: number) => void,
  () => void,
  () => void
] => {
  const [tests, setTests] = useState<Array<TestItemType>>(TEST_LIST);

  const toggle = useCallback(
    (index: number) => {
      setTests((tests) => {
        // @ts-expect-error
        tests[index].value = !tests[index].value;
        return [...tests];
      });
    },
    [setTests]
  );

  const clearAll = useCallback(() => {
    setTests((tests) => {
      return tests.map((it) => {
        it.value = false;
        return it;
      });
    });
  }, [setTests]);

  const checkAll = useCallback(() => {
    setTests((tests) => {
      return tests.map((it) => {
        it.value = true;
        return it;
      });
    });
  }, [setTests]);

  return [tests, toggle, clearAll, checkAll];
};

export function Home() {
  const [tests, toggle, clearAll, checkAll] = useTests();
  const navigation = useNavigation<NativeStackNavigationProp<any, 'Entry'>>();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.testList}>
        <ScrollView style={styles.scrollView}>
          {tests.map((test, index: number) => (
            <TestItem
              key={index.toString()}
              index={index}
              description={test.description}
              value={test.value}
              onToggle={toggle}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.menu}>
        <Button title="checkAll" onPress={checkAll} />
        <Button title="clearAll" onPress={clearAll} />
        <Button
          title="run"
          onPress={() => {
            navigation.navigate('TestingScreen', {
              testRegistrators: tests
                .filter((it) => it.value)
                .map((it) => it.registrator),
            });
          }}
        />
        <Button
          title="benchmarks"
          onPress={() => {
            navigation.navigate('Benchmarks');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  testList: {
    flex: 9,
  },
  menu: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-around',
    justifyContent: 'space-around',
  },
  scrollView: {
    paddingHorizontal: 10,
  },
});
