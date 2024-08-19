import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, CheckBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from 'react-native-elements';

const Stack = createStackNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const loginData = await AsyncStorage.getItem('loginData');
      if (loginData !== null) {
        const parsedData = JSON.parse(loginData);
        const foundUser = parsedData.find(user => user.username === username && user.password === password);
        if (foundUser) {
          navigation.navigate('TodoApp');
        } else {
          alert('Invalid username or password');
        }
      } else {
        alert('No user registered. Please register first.');
      }
    } catch (error) {
      console.error('Error retrieving login data:', error);
    }
  };


  const handleKeyPress = (event) => {
    if (event.nativeEvent.key === 'Enter') {
      addTask();
    }
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
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setNewTaskDescription('');
  };

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
    saveTasks(updatedTasks);
  };

  const LoginScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text>Login Screen</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          testID="login-username"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          testID="login-password"
        />
        <Button
          title="Login"
          onPress={handleLogin}
          testID="login-button"
        />
        <Button
          title="Register"
          onPress={() => navigation.navigate('Registration')}
          testID="login-register"
        />
      </View>
    );
  };

  const RegistrationScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [newsletter, setNewsletter] = useState(false);

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    email: '',
    zipCode: ''
  });

  const handleRegister = async () => {
    const errorValues = Object.values(errors);
    if (errorValues.some(error => error !== '')) {
      alert('Please fix the errors before registering.');
      return;
    }

    try {
      let userData = [];
      const existingData = await AsyncStorage.getItem('userData');
      if (existingData !== null) {
        userData = JSON.parse(existingData);
      }
      userData.push({ 
        firstName, 
        lastName, 
        username, 
        phoneNumber, 
        password, 
        email, 
        zipCode, 
        newsletter 
      });
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'firstName':
        setErrors(prevErrors => ({ ...prevErrors, firstName: value.trim() ? '' : 'First name is required' }));
        break;
      case 'lastName':
        setErrors(prevErrors => ({ ...prevErrors, lastName: value.trim() ? '' : 'Last name is required' }));
        break;
      case 'username':
        setErrors(prevErrors => ({ ...prevErrors, username: value.trim() ? '' : 'Username is required' }));
        break;
      case 'phoneNumber':
        setErrors(prevErrors => ({ ...prevErrors, phoneNumber: /^\(\d{3}\)\s\d{3}-\d{4}$/.test(value) ? '' : 'Invalid phone number' }));
        break;
      case 'password':
        setErrors(prevErrors => ({ ...prevErrors, password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ? '' : 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character' }));
        break;
      case 'confirmPassword':
        setErrors(prevErrors => ({ ...prevErrors, confirmPassword: value === password ? '' : 'Passwords do not match' }));
        break;
      case 'email':
        setErrors(prevErrors => ({ ...prevErrors, email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email' }));
        break;
      case 'zipCode':
        setErrors(prevErrors => ({ ...prevErrors, zipCode: /^\d{5}$/.test(value) ? '' : 'Invalid ZIP code' }));
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text>Registration Screen</Text>
      <Input
        label="First Name"
        value={firstName}
        onChangeText={setFirstName}
        onBlur={() => validateField('firstName', firstName)}
        errorMessage={errors.firstName}
        testID="firstname"
      />
      <Input
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
        onBlur={() => validateField('lastName', lastName)}
        errorMessage={errors.lastName}
        testID="lastname"
      />
      <Input
        label="Username"
        value={username}
        onChangeText={setUsername}
        onBlur={() => validateField('username', username)}
        errorMessage={errors.username}
        testID="username"
      />
      <Input
        label="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        onBlur={() => validateField('phoneNumber', phoneNumber)}
        errorMessage={errors.phoneNumber}
        testID="phonenumber"
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        onBlur={() => validateField('password', password)}
        errorMessage={errors.password}
        testID="password"
      />
      <Input
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        onBlur={() => validateField('confirmPassword', confirmPassword)}
        errorMessage={errors.confirmPassword}
        testID="confirmpassword"
      />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        onBlur={() => validateField('email', email)}
        errorMessage={errors.email}
        testID="email"
      />
      <Input
        label="ZIP Code"
        value={zipCode}
        onChangeText={setZipCode}
        onBlur={() => validateField('zipCode', zipCode)}
        errorMessage={errors.zipCode}
        testID="zip"
      />
      <CheckBox
        title="Sign up for newsletter"
        checked={newsletter}
        onPress={() => setNewsletter(!newsletter)}
        testID="newsletter"
      />
      <Button
        title="Register"
        onPress={handleRegister}
        disabled={
          !firstName.trim() ||
          !lastName.trim() ||
          !username.trim() ||
          !phoneNumber.trim() ||
          !password.trim() ||
          !confirmPassword.trim() ||
          !email.trim() ||
          !zipCode.trim() ||
          !!Object.values(errors).find(error => error !== '')
        }
        testID="register-button"
      />
    </View>
  );
};

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Registration" component={RegistrationScreen} options={{ title: 'Registration' }} />
        <Stack.Screen name="TodoApp" options={{ title: 'Todo App' }}>
          {() => (
            <View style={styles.container}>
              <Text>Todo App</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter task description"
                  value={newTaskDescription}
                  onChangeText={(text) => setNewTaskDescription(text)}
                />
                <Button title="Add" onPress={addTask} />
              </View>
              <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.list}
              />
            </View>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
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