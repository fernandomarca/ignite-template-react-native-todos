import React, { useState } from 'react';
import { Alert, StyleSheet, View, AlertButton } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number,
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const findTask = tasks.find((task) => task.title === newTaskTitle);
    if (findTask) {
      return Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome");
    }
    setTasks((old) => [...old,
    {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }]);
  }

  function handleToggleTaskDone(id: number) {
    const findTask = tasks.find((task) => task.id === id);
    if (!findTask) {
      return
    }
    setTasks((old) => old.map((task) => {
      if (task.id === id) {
        return {
          ...findTask,
          done: !findTask.done
        }
      }
      return task;
    }));
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover item", "Tem certeza que você deseja remover esse item?", [
      {
        style: "cancel",
        text: "Não"
      },
      {
        style: "destructive",
        text: "Sim",
        onPress: () => {
          setTasks((old) => old.filter((item) => item.id !== id));
        }
      }
    ])
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updateTasks = tasks.map(task => ({ ...task }));
    const task = updateTasks.find(task => task.id === taskId);
    if (!task) {
      return;
    }

    task.title = taskNewTitle;
    setTasks(updateTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})