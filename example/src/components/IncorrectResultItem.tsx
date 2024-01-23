import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';

type IncorrectResultItemProps = {
  description: string;
  errorMsg: string;
};

export const IncorrectResultItem: React.FC<IncorrectResultItemProps> = ({
  description,
  errorMsg,
}: IncorrectResultItemProps) => {
  const emoji = '😵‍💫';
  const fullText = emoji + ' [' + description + '] ---> ' + errorMsg;

  return (
    <View style={styles.itemContainer}>
      <Text style={[styles.text]}>{fullText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  itemContainer: {
    borderWidth: 1,
    margin: 5,
    flexDirection: 'column',
    borderRadius: 5,
    padding: 5,
  },
  text: {
    flexShrink: 1,
  },
});
