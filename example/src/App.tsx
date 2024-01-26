import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from './screens/Home';
import { Benchmarks } from './screens/Benchmarks/Benchmarks';
import { Tests } from './screens/Tests/Tests';
import type { RootStackParamList } from './screens/params';
import { SpeedBenchmarks } from './screens/Benchmarks/SpeedBenchmarks';
import { MemoryBenchmarks } from './screens/Benchmarks/MemoryBenchmarks';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Benchmarks" component={Benchmarks} />
        <Stack.Screen name="SpeedBenchmarks" component={SpeedBenchmarks} />
        <Stack.Screen name="MemoryBenchmarks" component={MemoryBenchmarks} />
        <Stack.Screen name="Tests" component={Tests} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
