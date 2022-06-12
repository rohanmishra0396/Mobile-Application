import 'react-native-gesture-handler';
import React, {Component} from 'react';

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

const lang = ['English', 'Hindi', 'Marathi'];

function LangScreen({navigation, route}) {
  console.log(route);
  const onPressHandler = i => {
    console.log('Lang.......... ', lang[i]);
    navigation.navigate('Levels', {lang: lang[i], ...route.params});
  };
  let langButtons = [];
  for (let i = 0; i < lang.length; i++) {
    langButtons.push(
      <Pressable
        key={i}
        onPress={() => onPressHandler(i)}
        style={styles.wrapperCustom}>
        <Text style={styles.text}>{lang[i]}</Text>
      </Pressable>,
    );
  }

  return (
    <SafeAreaView>
      <Text style={styles.nameText}>Welcome {route.params.user}</Text>
      <ScrollView>
        <View style={styles.container}>{langButtons}</View>
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
});

export default LangScreen;
