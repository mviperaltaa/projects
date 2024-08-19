import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, CheckBox, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      description: "Title1",
      completed: false
    },
    {
      id: "2",
      description: "Title2",
      completed: false
    }
  ]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.taskItem}>
        <CheckBox
          value={item.completed}
          onValueChange={() => toggleTaskCompletion(item.id)}
        />
        <Text style={[styles.taskDescription, item.completed && styles.completedTask]}>
          {item.description}
        </Text>
      </View>
    );
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const addTask = () => {
    if (newTaskDescription.trim() === "") {
      return;
    }
    const newTask = {
      id: (tasks.length + 1).toString(),
      description: newTaskDescription,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setNewTaskDescription('');
  };

  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleKeyPress = (event) => {
    if (event.nativeEvent.key === 'Enter') {
      addTask();
    }
  };

  return (
    <View style={styles.container}>
      <Text>Hello!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task description"
          value={newTaskDescription}
          onChangeText={(text) => setNewTaskDescription(text)}
          onKeyPress={handleKeyPress}
        />
        <Button title="Add" onPress={addTask} />
      </View>
      <StatusBar style="auto" />
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10
  },
  list: {
    marginTop: 20,
    width: '100%'
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  taskDescription: {
    marginLeft: 10,
    fontSize: 16
  },
  completedTask: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  }
});