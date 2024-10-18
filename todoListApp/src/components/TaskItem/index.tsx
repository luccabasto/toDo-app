import React, { useState } from "react";
import { Box, Text, IconButton, Input, HStack, Button, Modal, Center } from 'native-base';
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
// Estrutura
import iTaskItem from "../../modal/interface";



const TaskItem: React.FC<iTaskItem> = ({ id, title, onUpdate, onDelete }) => {
  const [isEditMode, setIsEditMode] = useState(false); 
  const [newTask, setNewTask] = useState(title);
  const [isModalOpen, setIsModalOpen] = useState(false);

 // UPDATE
  const handleUpdate = async () => {
    if (newTask.trim() === "") return;
    await onUpdate(id, newTask);
    setIsEditMode(false);
  };

// DELETE
  const handleDelete = async () => {
    await onDelete(id);
    setIsModalOpen(false);
  };

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.300"
      p={4}
      my={2}
      mx={2}
      borderRadius={8}
    >
      {isEditMode ? (
        <HStack flex={3} alignItems="center">
          <Input
            value={newTask}
            onChangeText={setNewTask}
            autoFocus
          />
          <IconButton icon={<AntDesign name="check" size={24} />} onPress={handleUpdate} />
        </HStack>
      ) : (
        <Text flex={3} fontSize={18}>{title}</Text>
      )}
      
      {/* Edit / Excluir */}
      <HStack space={2}>
        <IconButton
          icon={<AntDesign name="edit" size={24} />}
          onPress={() => setIsEditMode(!isEditMode)}
        />
        <IconButton
          icon={<MaterialIcons name="delete" size={24} />}
          onPress={() => setIsModalOpen(true)} 
        />
      </HStack>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Content>
          <Modal.Header>Excluir Task</Modal.Header>
          <Modal.Body>
            Deseja realmente excluir esta tarefa?
          </Modal.Body>
          <Modal.Footer>
            <Button.Group>
              <Button colorScheme="coolGray" onPress={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button colorScheme="danger" onPress={handleDelete}>
                Excluir
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default TaskItem;