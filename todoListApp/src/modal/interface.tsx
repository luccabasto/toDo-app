export default interface iTask {
  id: number;
  tarefa: string;
} {/* Interface TaskList */}

export default interface iTaskItem {
  id: number;
  title: string;
  onUpdate: (id: number, task: string) => void;
  onDelete: (id: number) => Promise<void>; 
} {/* Interface TaskItem */}

export default interface iAddTask {
  onAddTask: () => void; // callback para fazer o update da Task List
} {/* Interface AddTask */}

export interface iContextoGlobalState {
  task: Task[];
  addTask: (titulo: string) => void;
  editTask: (id: number, novoTitulo: string) => void;
  excluirTask: (id: number) => void;
} {/* Interface GlobalState */}
