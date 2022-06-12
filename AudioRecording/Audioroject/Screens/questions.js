import 'react-native-gesture-handler';
import React, {Component, useState, useEffect} from 'react';
import Voice from 'react-native-voice';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  PermissionsAndroid,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const levels = {
  'Level 1': {
    English: {
      Letters: ['A', 'B', 'C', 'D', 'E'],
      Words: ['MY', 'HELLO', 'GOOD', 'BAD', 'YES'],
    },
    Hindi: {
      Letters: ['अ', 'आ', 'इ', 'उ', 'ए'],
      Words: ['निशान', 'करना', 'अचानक', 'इशारा', 'सुझाव'],
    },
    Marathi: {
      Letters: ['क', 'ख', 'ग', 'घ', 'च'],
      Words: ['मी', 'त्या', 'तो', 'वर', 'सह'],
    },
  },
  'Level 2': {
    English: {
      Letters: ['F', 'G', 'H', 'I', 'J'],
      Words: ['MAY', 'STAND', 'WORLD', 'DANCE', 'SING'],
    },
    Hindi: {
      Letters: ['झ', 'ञ', 'ट', 'ठ', 'ड'],
      Words: ['सुरक्षा', 'मना', 'सुधारना', 'प्रवेश', 'व्यक्त'],
    },
    Marathi: {
      Letters: ['च', 'छ', 'ज', 'झ', 'ञ'],
      Words: ['म्हणून', 'त्याच्या', 'साठी', 'आहेत', 'पासून'],
    },
  },
  'Level 3': {
    English: {
      Letters: ['V', 'W', 'X', 'Y', 'Z'],
      Words: ['UNSHAKEN', 'DEVIL', 'MYTHICAL', 'AMIDST', 'CLASH'],
    },
    Hindi: {
      Letters: ['थ', 'द', 'ध', 'न', 'प'],
      Words: ['अस्वीकार', 'खुबसूरत', 'दिक्कत', 'इंतज़ार', 'अवसर'],
    },
    Marathi: {
      Letters: ['य', 'र', 'ल', 'व', 'श'],
      Words: ['परंतु', 'किंवा', 'मध्ये', 'त्यांच्या', 'म्हणाला'],
    },
  },
};

var textIndex = 0;

let languageCodes = {
  English: 'en-US',
  Hindi: 'hi-IN',
  Marathi: 'mr-IN',
};
let userSentence = '';
function QuestionScreen({navigation, route}) {
  console.log(route);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  let languageSelectedCode = languageCodes[route.params.lang];
  let languageSelected = route.params.lang;
  let selectedLevel = route.params.level;
  let assignment = route.params.assignment;
  if (selectedLevel === 'Level 3') {
    useEffect(() => {
      const intervalId = setInterval(async () => {
        console.log('----------Text Picked---------- ' + textIndex);
        if (textIndex == 0) await Voice.start(languageSelectedCode);
        if (
          textIndex < levels[selectedLevel][languageSelected][assignment].length
        ) {
          setCurrentQuestion(
            levels[selectedLevel][languageSelected][assignment][textIndex],
          );
          textIndex += 1;
        } else {
          setCurrentQuestion(null);
          textIndex = 0;

          // do {
          //   console.log('Waiting for userSentence to be completed');
          //   console.log('exitScreen ' + exitScreen);

          // } while (!exitScreen);
          setTimeout(() => {
            console.log('userSentence ' + userSentence);
            const {rating, userSaid, wrongUtterance} = calculateRating(
              userSentence,
              selectedLevel,
              languageSelected,
              assignment,
            );
            route.params.rating = rating;
            route.params.wrongUtterances = wrongUtterance;
            route.params.userSaid = userSaid;
            userSentence = '';
            navigation.navigate('Levels', {...route.params});
          }, 2000);
        }
      }, 5000);

      return () => clearInterval(intervalId);
    }, []);
  } else {
    useEffect(() => {
      let triggerFunction = async () => {
        console.log('useEffect triggered for level 1 or 2');
        console.log('textIndex ' + textIndex);
        console.log(
          'levels[selectedLevel][languageSelected][assignment].length ' +
            levels[selectedLevel][languageSelected][assignment].length,
        );
        console.log(
          textIndex >=
            levels[selectedLevel][languageSelected][assignment].length,
        );
        if (textIndex == 0) {
          await Voice.start(languageSelectedCode);
          setCurrentQuestion(
            levels[selectedLevel][languageSelected][assignment][textIndex],
          );
        }
        if (
          textIndex >=
          levels[selectedLevel][languageSelected][assignment].length
        ) {
          console.log('userSentence before exiting ' + userSentence);
          const {rating, userSaid, wrongUtterance} = calculateRating(
            userSentence,
            selectedLevel,
            languageSelected,
            assignment,
          );
          route.params.rating = rating;
          route.params.wrongUtterances = wrongUtterance;
          route.params.userSaid = userSaid;
          userSentence = '';
          navigation.navigate('Levels', {...route.params});
          setCurrentQuestion(null);
          textIndex = 0;
        }
      };
      triggerFunction();
      return () => {
        console.log('Clean the record..................');
      };
    }, [currentQuestion]);
  }

  const _onSpeechStart = event => {
    // startDate = new Date();
    console.log('onSpeechStart ' + JSON.stringify(event));
    // setText('');
  };
  const _onSpeechEnd = async () => {
    console.log('onSpeechEnd');
  };
  const _onSpeechResults = async event => {
    console.log('onSpeechResults  ' + event.value[0]);
    userSentence = userSentence + event.value[0].toUpperCase() + ' ';
    console.log('userSentence ' + userSentence);
    if (
      selectedLevel !== 'Level 3' &&
      textIndex + 1 < levels[selectedLevel][languageSelected][assignment].length
    ) {
      console.log('Setting the element of i ' + textIndex);
      console.log('Adding 1 ' + textIndex + 1);
      textIndex += 1;
      setCurrentQuestion(
        levels[selectedLevel][languageSelected][assignment][textIndex],
      );
    } else if (
      selectedLevel !== 'Level 3' &&
      textIndex + 1 >=
        levels[selectedLevel][languageSelected][assignment].length
    ) {
      textIndex += 1;
      setCurrentQuestion(null);
    }

    // console.log('testRecord ' + testRecord);
    // if (testRecord) {
    //   //console.log("TIME DELAY START");
    //   //await timeDelay();
    //   await await Voice.start('hi-IN')
    // }
    console.log('--------- textIndex ------------- ' + textIndex);
    await Voice.start(languageSelectedCode);
    // if (textIndex < levels['Level 1'].English.Letters.length) {
    //   await await Voice.start('hi-IN')
    // } else {
    //   exitScreen = true;
    //   console.log('exitScreen ' + exitScreen);
    // }
  };
  const _onSpeechError = async event => {
    console.log('_onSpeechError');
    console.log(event.error);
    // console.log("testRecord "+testRecord);
    // if (testRecord) {
    //   //console.log("TIME DELAY START");
    //   //await timeDelay();
    //   await await Voice.start('hi-IN')
    // }

    console.log('--------- textIndex ------------- ' + textIndex);
    await Voice.start(languageSelectedCode);
    // if (textIndex < levels['Level 1'].English.Letters.length) {
    //   await await Voice.start('hi-IN')
    // } else {
    //   exitScreen = true;
    //   console.log('exitScreen ' + exitScreen);
    // }
  };
  // const _onSpeechPartialResults = async event => {
  //   console.log('_onSpeechPartialResults' + event.value[0]);
  //   if (event.value[0] == 'I am Rohan') {
  //     // check = !check;
  //     // console.log(check);
  //   }
  //   //await timeDelay();
  // };

  useEffect(() => {
    Voice.onSpeechStart = _onSpeechStart;
    Voice.onSpeechEnd = _onSpeechEnd;
    Voice.onSpeechResults = _onSpeechResults;
    Voice.onSpeechError = _onSpeechError;
    // Voice.onSpeechPartialResults = _onSpeechPartialResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  function RenderData(props) {
    const selectedLevel = props.selectedLevel;
    const assignment = props.assignment;
    if (selectedLevel === 'Level 3') {
      return (
        <Text style={assignment != 'Words' ? styles.text : styles.word}>
          {currentQuestion}
        </Text>
      );
    }
    return (
      <Text style={assignment != 'Words' ? styles.text : styles.word}>
        {currentQuestion}
      </Text>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <RenderData
          selectedLevel={selectedLevel}
          assignment={assignment}></RenderData>
      </ScrollView>
    </SafeAreaView>
  );
}

const calculateRating = (
  userSentence,
  selectedLevel,
  languageSelected,
  assignment,
) => {
  let originalQuestions = levels[selectedLevel][languageSelected][assignment];
  userSentence = userSentence.split(' ');
  const filteredArray = originalQuestions.filter(value =>
    userSentence.includes(value),
  );
  const wrongUtterance = originalQuestions.filter(data => {
    if (!userSentence.includes(data)) return data;
  });
  let userSaid = new Set(userSentence);
  console.log('userSentence ' + userSentence);
  console.log('originalQuestions ' + JSON.stringify(originalQuestions));
  console.log('userSentence ' + userSaid);
  console.log('filteredArray ' + JSON.stringify(filteredArray));
  console.log('could not catch ' + JSON.stringify(wrongUtterance));
  userSaid = Array.from(userSaid);
  console.log('checkArray ', userSaid);
  const rating = filteredArray.length;
  return {wrongUtterance, userSaid, rating};
};

const styles = StyleSheet.create({
  wrapperCustom: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'green',
  },
  text: {
    marginTop: 15,
    padding: 10,
    alignSelf: 'center',
    fontSize: 250,
    //lineHeight: 200,
    fontWeight: 'bold',
    color: 'Black',
  },
  nameText: {
    alignSelf: 'center',
    color: 'maroon',
    textDecorationColor: 'blue',
    textShadowColor: 'red',
    textShadowRadius: 3,
    margin: 24,
    fontSize: 20,
    fontFamily: 'monospace',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  word: {
    marginTop: 120,
    padding: 10,
    alignSelf: 'center',
    fontSize: 80,
    //lineHeight: 200,
    fontWeight: 'bold',
    color: 'Black',
  },
});

export default QuestionScreen;
