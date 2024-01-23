import * as React from 'react';
import { StyleSheet, Text as TextNative } from 'react-native';

type Props = {
  children: React.ReactNode;
};

export function Text({ children }: Props) {
  return <TextNative style={styles.text}>{children}</TextNative>;
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});
