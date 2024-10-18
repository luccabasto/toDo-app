import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdicionarTarefa from '../components/AddTask';
import TaskList from '../components/TaskList';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

const NavApp = () => {
  return (
    <Stack.Navigator>
      {/* Login Screen */}
      <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      {/* Front da tela de login com Forms de taks/taskList */}
      <Stack.Screen 
        name="TaskScreen" // Registrando como "Task Screen"
        component={MainScreen} 
        options={{ title: 'TO-DOS' }} 
      />
    </Stack.Navigator>
  );
};

// Componente para a Tela Principal
const MainScreen = () => {
  return (
    <>
      <TaskList />
    </>
  );
};

export default NavApp;