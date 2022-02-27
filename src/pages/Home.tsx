import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks((old)=>[...old,
      {
      id:new Date().getTime(),
      title:newTaskTitle,
      done:false
    }]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const findTask = tasks.find((task)=>task.id === id);
    if(!findTask){
      return
    }
    setTasks((old)=>old.map((task)=>{
      if(task.id === id){
        return {
          ...findTask,
          done:!findTask.done
        }
      }
      return task;
    }));
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    // const filteredTasks = tasks.filter((item)=>item.id !== id);
    // setTasks(filteredTasks);
    setTasks((old)=>old.filter((item)=>item.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
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