import React, { useEffect, useState } from "react";
import { FlatList, Text, Box, Spinner, ScrollView, Toast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";

// Estrutura
import TaskItem from '../TaskItem';
import AddTask from '../AddTask'; 
import iTask from "../../modal/interface";



const TaskList: React.FC = () => {
  const [task, setTask] = useState<iTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  const fetchTask = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('LoginScreen');
        return;
      }

      const response = await fetch('http://localhost:3000/api/task', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar tarefas');
      }

      const data = await response.json();
      setTask(data);
    } catch (error) {
      setError("Erro ao buscar tarefas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const handleAddTask = () => {
    fetchTask(); // Atualiza a list quando uma new task é adicionada
  };

  const handleDelete = async (id: number) => {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      console.error('Token não encontrado!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/task/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setTask(prevTask => prevTask.filter(task => task.id !== id));
        Toast.show({
          description: 'Tarefa excluída com sucesso!',
          bgColor: "green.500"
        });
      } else {
        const errorData = await response.json();
        console.error('Erro ao excluir a tarefa:', errorData);
        Toast.show({
          description: 'Não foi possível excluir a tarefa. Tente novamente.',
          bgColor: "red.500"
        });
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      Toast.show({
        description: 'Ocorreu um erro. Tente novamente.',
        bgColor: "red.500"
      });
    }
  };

  if (loading) {
    return <Spinner color="blue.500" />;
  }

  if (error) {
    return (
      <Box padding={4}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </Box>
    );
  }

  
  const handleUpdate = async (id: number, novoTitulo: string) => {
    const token = await AsyncStorage.getItem('token');
  
    if (!token) {
      console.error('Token não encontrado!');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/api/task/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: novoTitulo }),
      });
  
      if (response.ok) {
        setTask((prevTask) =>
          prevTask.map((task) =>
            task.id === id ? { ...task, task: novoTitulo } : task
          )
        );
        Toast.show({
          description: 'Tarefa atualizada com sucesso!',
          bgColor: "green.500",
        });
      } else {
        const errorData = await response.json();
        console.error('Erro ao atualizar tarefa:', errorData);
        Toast.show({
          description: 'Não foi possível atualizar a tarefa.',
          bgColor: "red.500",
        });
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      Toast.show({
        description: 'Ocorreu um erro. Tente novamente.',
        bgColor: "red.500",
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

      <AddTask onAddTask={handleAddTask} />
      <FlatList
        data={task}
        renderItem={({ item }) => (
          <TaskItem
            id={item.id}
            title={item.tarefa}
            onUpdate={handleUpdate}
            onDelete={handleDelete} // Passa a função de exclusão
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default TaskList;