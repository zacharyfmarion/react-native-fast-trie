import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from './screens/Home';
import { Benchmarks } from './screens/Benchmarks';
import { Tests } from './screens/Tests/Tests';
import type { RootStackParamList } from './screens/params';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Benchmarks" component={Benchmarks} />
        <Stack.Screen name="Tests" component={Tests} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
