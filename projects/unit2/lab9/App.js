import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, FlatList, Button } from 'react-native';
import RepetitionExercise from './components/RepetitionExercise';
import DurationExercise from './components/DurationExercise';
import RunningExercise from './components/RunningExercise';

const Stack = createStackNavigator();

const App = () => {
  const Home = ({ navigation }) => {
    const exercises = [
      { key: 'push-ups', title: 'Push-ups', suggested: false },
      { key: 'sit-ups', title: 'Sit-ups', suggested: false },
      { key: 'cycling', title: 'Cycling', suggested: false },
      { key: 'jumping jacks', title: 'Jumping Jacks', suggested: false },
      { key: 'running', title: 'Running', suggested: false },
      { key: 'suggested', title: 'Suggested Exercise', suggested: true },
      { key: 'home', title: 'Home', suggested: false },
    ];

    const handleExercisePress = (exercise) => {
      if (exercise.key === 'push-ups' || exercise.key === 'sit-ups' || exercise.key === 'jumping jacks') {
        navigation.navigate('RepetitionExercise', { exercise });
      } else if (exercise.key === 'cycling') {
        navigation.navigate('DurationExercise', { exercise });
      } else if (exercise.key === 'running') {
        navigation.navigate('RunningExercise', { exercise });
      } else if (exercise.key === 'home') {
        navigation.navigate('homeScreen');
      } else {
        navigation.navigate('RunningExercise', { exercise });
      }
    };

    return (
      <View>
        <FlatList
          data={exercises}
          renderItem={({ item }) => (
            <Button
              title={item.title}
              onPress={() => handleExercisePress(item)}
            />
          )}
        />
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="RepetitionExercise" component={RepetitionExercise} />
        <Stack.Screen name="DurationExercise" component={DurationExercise} />
        <Stack.Screen name="RunningExercise" component={RunningExercise} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;