import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import NavApp from './src/navigation';

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <NavApp />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
