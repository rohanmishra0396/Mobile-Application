import 'react-native-gesture-handler';
import React, {Component, useState, useEffect} from 'react';

import {Rating, AirbnbRating} from 'react-native-ratings';

import uuid from 'react-native-uuid';
// uuid.v4(); // ⇨ '11edc52b-2918-4d71-9058-f7285e29d894'

const {updateStudentData, getStudentRecord} = require('../apiService/apiCall');

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  PermissionsAndroid,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

let levels = [
  {
    Level: 'Level 1',
    id: uuid.v4(),
    wordRating: 0,
    letterRating: 0,
  },
  {
    Level: 'Level 2',
    id: uuid.v4(),
    wordRating: 0,
    letterRating: 0,
  },
  {
    Level: 'Level 3',
    id: uuid.v4(),
    wordRating: 0,
    letterRating: 0,
  },
];

function LevelScreen({navigation, route}) {
  let boolean = route.params.wrongUtterances ? true : false;
  console.log('ROUTE...', JSON.stringify(route.params));
  console.log('boolean ' + boolean);

  const [modalVisible, setModalVisible] = useState(boolean);
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    console.log('Fetch useData');
    getStudentRecord(route.params.students.id)
      .then(result => {
        console.log(
          'Student Data ',
          JSON.stringify(result),
          route.params.students.id,
        );
        if (result.list.length > 0) {
          levels =
            result.list[0].classes[route.params.divisions.id].Reading[
              route.params.lang
            ];
        }
        console.log('levels fetched from api ', levels);
        setReRender(!reRender);
      })
      .catch(error => {
        console.log('error ------------- ', error);
      });
  }, []);

  console.log('modalVisible ' + modalVisible);
  let forceUpdate = null;
  if (route.params.wrongUtterances) {
    forceUpdate = [...route.params.wrongUtterances];
    // setModalVisible(true);
  }

  if (route.params.rating) {
    if (route.params.assignment === 'Words')
      levels[route.params.key].wordRating = route.params.rating;
    else levels[route.params.key].letterRating = route.params.rating;
  }
  console.log(route);
  console.log('Levels ' + JSON.stringify(levels));

  if (boolean) {
    console.log('Updated student records....................');
    updateStudentData({
      id: route.params.students.id,
      language: route.params.lang,
      class: route.params.divisions.id,
      result: levels,
    })
      .then(result => {
        console.log('result ', JSON.stringify(result));
      })
      .catch(error => {
        console.log('error ------------- ', error);
      });
  }

  const onPressHandler = i => {
    navigation.navigate('QuestionScreen', {
      lang: route.params.lang,
      assignment: route.params.assignment,
      level: levels[i].Level,
      key: i,
      ...route.params,
    });
  };
  console.log('After onPressHandler');
  let levelButtons = [],
    ratingRender = 0;
  for (let i = 0; i < levels.length; i++) {
    if (route.params.assignment === 'Words')
      ratingRender = levels[i].wordRating;
    else ratingRender = levels[i].letterRating;
    levelButtons.push(
      <Pressable
        key={levels[i].id}
        onPress={() => onPressHandler(i)}
        style={styles.wrapperCustom}>
        <Text style={styles.text}>{levels[i].Level}</Text>
      </Pressable>,
      <Rating
        key={levels[i].id + i.toString()}
        imageSize={20}
        // ratingBackgroundColor="#c8c7c8"
        readonly
        startingValue={ratingRender}
        style={{paddingVertical: 10}}
        // onFinishRating={this.ratingCompleted}
      />,
    );
  }
  console.log('After for loop for buttons');

  useEffect(() => {
    console.log('the rerender function in level');
  }, [reRender]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={boolean}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Wrongly said utterances -{' '}
                {route.params.wrongUtterances
                  ? route.params.wrongUtterances.join(', ')
                  : ''}
              </Text>
              <Text style={styles.modalText}>
                User said -{' '}
                {route.params.userSaid ? route.params.userSaid.join(', ') : ''}
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  boolean = false;
                  delete route.params.wrongUtterances;
                  setModalVisible(!modalVisible);
                  console.log('Close the modal');
                  forceUpdate = undefined;
                  //this.forceUpdate();
                }}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={styles.container}>{levelButtons}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default LevelScreen;
