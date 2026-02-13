import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Easing,
  KeyboardEvent,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import useNunitoFonts from "@/hooks/useNunitoFonts";

const MIN_HEIGHT = 400;
const MAX_HEIGHT = 200;

type IngredientTextInputProps = {
  value: string;
  onChangeText: (text: string) => void;
};

const IngredientTextInput = ({value, onChangeText}: IngredientTextInputProps ) => {
  const fontsLoaded = useNunitoFonts();
  const heightAnim = useRef(new Animated.Value(MAX_HEIGHT)).current;
  // const [value, setValue] = useState("");

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e: KeyboardEvent) => {
        Animated.timing(heightAnim, {
          toValue: MIN_HEIGHT,
          duration: e.duration || 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }).start();
      }
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      (e: KeyboardEvent) => {
        Animated.timing(heightAnim, {
          toValue: MAX_HEIGHT,
          duration: e.duration || 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }).start();
      }
    );
    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, [heightAnim]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Animated.View style={[styles.textInputContainer, {height: heightAnim}]}>
        <TextInput
          placeholder="Enter your ingredients..."
          placeholderTextColor="#00c48c"
          multiline
          onChangeText={onChangeText}
          style={styles.textInput}
          textAlignVertical="top"
          value={value}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default IngredientTextInput;

const styles = StyleSheet.create({
 
  textInputContainer: {

    // flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,

    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
  },
  textInput: {
    // flex: 1,
    height: "100%",
    borderRadius: 25,
    padding: 16,
    fontSize: 18,
    fontFamily: "NunitoRegular",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    // borderColor: "#00c48c",
    borderColor: "white",
    borderWidth: 2,
    color: "#2e2e2e",
  },
});
