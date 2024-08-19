import { StatusBar } from 'expo-status-bar' 
import { StyleSheet, View } from 'react-native' 
import { FlatList} from 'react-native'
import { Button, ButtonGroup, CheckBox, Input, Text } from '@rneui/themed' 
import * as Font from 'expo-font'
import FontAwesome from '@expo/vector-icons/FontAwesome' 
import { useEffect, useState } from 'react' 
import { NavigationContainer } from '@react-navigation/native' 
import { createNativeStackNavigator } from '@react-navigation/native-stack' 

async function cacheFonts (fonts) { 
return fonts.map(async (font) => await Font.loadAsync(font)) 
}


const Stack = createNativeStackNavigator();
const sampleData = [
  {
    prompt: 'This is the question..',
    type: 'multiple-choice', 
    choices: ['choice 1', 'choice 2', 'choice 3', 'choice 4'],
    correct: 0,
  },
  {
    prompt: 'This is another question..',
    type: 'multiple-answer',
    choices: ['choice 1', 'choice 2', 'choice 3', 'choice 4'],
    correct: [0,2],
  },
  {
    prompt: 'This is the third question..',
    type: 'true-false',
    choices: ['choice 1', 'choice 2'],
    correct: 1,
  },
]

function Question({ navigation, route }) { 
  console.log(route.params) 
  const { questionNumber, userChoices, data } = route.params 
  let { choices, prompt, type } = data[questionNumber] 
  let initialSelection = 0 
  let [selectedIndex, setSelectedIndex] = useState(0) 
  let [selectedIndexes, setSelectedIndexes] = useState([]) 
  const toggleSelectedIndex = (index) => {
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
    } else {
      setSelectedIndexes([...selectedIndexes, index]);
    }
  };

  let nextQuestion = () => { 
    let nextQuestion = questionNumber + 1 
    console.log(selectedIndex) 
    if (type !== 'multiple-answer') { 
      userChoices.push(selectedIndex) 
    } else { 
      userChoices.push(selectedIndexes) 
    }
    if (nextQuestion < sampleData.length) {
      console.log('Navigating to next question...') 
      console.log({ questionNumber: nextQuestion, sampleData, userChoices }) 
      navigation.navigate( 'Question', {
        questionNumber: nextQuestion, 
        sampleData, 
        userChoices,
      })
    } else { 
      navigation.navigate( 'SummaryScreen', { 
        questionNumber: nextQuestion, 
        sampleData, 
        userChoices, 
      }) 
    }
  }
  
  return (
    <View style={styles.container}> 
    <Text>{prompt}</Text> 
    {type !== 'multiple-answer' ? (
      <ButtonGroup 
      testID="choices" 
      buttons={choices} 
      vertical 
      selectedIndex={selectedIndex} 
      onPress={(value) => {
        console.log(value)
        console.log(selectedIndex)
        setSelectedIndex(value)
      }}
      containerStyle={{ marginBottom: 20, width: '70%'}}
    />
  ) : (
     <ButtonGroup
          testID="choices"
          buttons={choices}
          vertical
          selectedIndexes={selectedIndexes}
          onPress={(value) => {
            toggleSelectedIndex(value);
          }}
          containerStyle={{ marginBottom: 20, width: '70%' }}
      />
    )}
    <Button
    testID="next-question"
    onPress={nextQuestion}
    title="Submit"
    ></Button>
    </View>
  )
}

function SummaryScreen({ route }) { 
  let calculateCorrect = (userSelected, correct, type) => { 
    let userCorrect = false 
    if (type == 'multiple-answer') { 
      userCorrect = userSelected.sort().toString() === correct.sort().toString()
    } else {
      userCorrect = userSelected === correct
    }
    return userCorrect
  }
  let calculateCorrectSet = (userSelected, correct, type) => {
    let userCorrect = false
    if (type == 'multiple-answer') {
      userCorrect = correct.every((item) => userSelected. includes(item)) 
        && userSelected. every( (item) => correct. includes(item)) 
    } else { 
      userCorrect = userSelected === correct
    }
    return userCorrect
  }
  let totalScore = 0
  for (let i = 0; i < route.params.data.length; i++) {
    if (
      calculateCorrect( 
        route.params.userChoices[i], 
        route.params.data[i].correct, 
        route.params.data[i].type 
      ) 
    ){
      totalScore++
    }
  }
  return (
    <View style={styles.container}>
      <FlatList
      data={route.params.data}
      renderItem={({ item, index }) => {
        let { choices, prompt, type, correct } = item

        
        let userSelected = route.params.userChoices[index]
        let userCorrect = calculateCorrect(userSelected, correct, type)

        return (
          <View key={index}> 
          <Text>{prompt}</Text> 
          {choices.map((value, choiceIndex) => { 
            let incorrect = false 
            let userDidSelect = false 
            if (type == 'multiple-answer') { 
              userDidSelect = userSelected.includes (choiceIndex) 
              incorrect = userDidSelect && !correct.includes (choiceIndex) 
            } else {
              userDidSelect = userSelected == choiceIndex 
              incorrect = userDidSelect && userSelected !== correct
            }
            return (
              <CheckBox
              containerStyle={{
                backgroundColor: userDidSelect
                ? incorrect == false
                ? 'lightgreen'
                : 'gray'
                : undefined,
              }}
              checked={
                type == 'multiple-answer'
                ? correct.includes(choiceIndex)
                : correct == choiceIndex
              }
              textStyle={{
                textDecorationLine: incorrect
                ? 'line-through'
                : undefined,
              }}
              key={value}
              title={value}
              ></CheckBox>
            )
          })}
          </View>
        )
      }}
      ></FlatList>
      <Text>Score: {totalScore}</Text>
      </View>
  )
}

export default function App() {
  cacheFonts([FontAwesome.font])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Question">
        <Stack.Screen 
        initialParams={{
          questionNumber:0,
          data: sampleData,
          userChoices: [],
        }}
        name="Question"
        options={{headerShown: false}}
        >
          {(props)=> <Question {...props}/>}
        </Stack.Screen>
        <Stack.Screen 
        name = "SummaryScreen"
        initialParams={{
          questionNumber: sampleData.length -1,
          data: sampleData,
          userChoices: [1, [0,2], 1],
        }}
        options={{headerShown: false}}
        component={SummaryScreen}
        ></Stack.Screen>
        </Stack.Navigator>
        </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    aspectRatio: 1,
    width: '50%',
    backgroundColor: '#0553',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  button:{
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
})