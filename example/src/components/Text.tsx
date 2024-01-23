import * as React from 'react';
import { StyleSheet, Text as TextNative } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: any[];
};

export function Text({ children, style }: Props) {
  const styles = React.useMemo(() => {
    const res = [textStyles.text];
    if (style) {
      res.concat(style);
    }
    return res;
  }, [style]);

  return <TextNative style={styles}>{children}</TextNative>;
}

const textStyles = StyleSheet.create({
  text: {
    color: 'black',
  },
});
