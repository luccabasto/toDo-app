import React, { useState } from "react";
import { View, Input, IconButton } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useGlobalState } from "../../hooks/GlobalState";
import AsyncStorage from '@react-native-community/async-storage'; // Para recuperar o token
// Estrutura
import iAddTask from "../../modal/interface";

const AddTask: React.FC<iAddTask> = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState("");
  const { addTask } = useGlobalState();

  const handleAddTask = async () => {
    if (newTask.trim() === "") return;

    try {
      const token = await AsyncStorage.getItem('token'); // Recuperando o token
      if (!token) {
        console.error('Token não encontrado!');
        return;
      }

      const response = await fetch('http://localhost:3000/api/task', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Incrementa o token JWT ao header
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: newTask }), // Envia a nova task
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar tarefa');
      }

      // Adiciona a tarefa no estado global
      addTask(newTask);
      setNewTask("");

      onAddTask(); // Faz o update da task list pela function
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  return (
    <View 
      style={{ 
        backgroundColor: '#402291', 
        paddingVertical: 20, 
        paddingHorizontal: 20, 
        paddingTop: 50 
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Input
            placeholder="Escreva sua task"
            placeholderTextColor="white"
            value={newTask}
            onChangeText={setNewTask}
            fontSize={18}
            color="white"
          />
        </View>
        <IconButton
          icon={<Ionicons name="add" size={24} color="#402291" />}
          colorScheme="light"
          onPress={handleAddTask}
          style={{ borderRadius: 50, backgroundColor: 'gold' }}
        />
      </View>
    </View>
  );
};

export default AddTask;