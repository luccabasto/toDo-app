import React from 'react'; 
import { View } from 'native-base'; 

// Estrutura
import AddTak from '../../components/AddTask'; 
import TaskList from '../../components/TaskList';

const TaskScreen: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#wihte' }}>
      <AddTak /> 
      <TaskList />
    </View>
  );
};

export default TaskScreen;