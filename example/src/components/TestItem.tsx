import React from 'react';
import { View, StyleSheet } from 'react-native';
import Checkbox from '@react-native-community/checkbox';
import { Text } from './Text';

type TestItemProps = {
  description: string;
  value: boolean;
  index: number;
  onToggle: (index: number) => void;
};

export const TestItem: React.FC<TestItemProps> = ({
  description,
  value,
  index,
  onToggle,
}: TestItemProps) => {
  return (
    <View style={styles.container}>
      <Text>{description}</Text>
      <Checkbox
        value={value}
        onValueChange={() => {
          onToggle(index);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    width: '100%',
    padding: 10,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#d1e8ff',
    marginTop: 10,
  },
});
