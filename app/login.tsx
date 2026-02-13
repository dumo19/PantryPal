import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import React from "react";

// import { Link } from "expo-router";

import { Dimensions } from "react-native";
import { router } from "expo-router";

import useNunitoFonts from "@/hooks/useNunitoFonts";
import { Feather } from "@expo/vector-icons";

export const screenWidth = Dimensions.get("window").width;
export const containerWidth = screenWidth * 0.9;
export const sideMargin = (screenWidth - containerWidth) / 2;

const LoginScreen = () => {
  const fontsLoaded = useNunitoFonts();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.screenContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather
            name="chevron-left"
            size={35}
            color={"#00c48c"}
          />
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.loginHeader}>Login</Text>

          <TextInput 
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="#00c48c"

          />

          <TextInput 
            style={styles.textInput} 
            placeholder="Password"
            placeholderTextColor="#00c48c"
          />

          <View style={styles.shadow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => console.log("Generate Recipe Pressed")}
            >
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.push("/create-account")}>
            <Text style={styles.createAccount}>Don't Have an Account?</Text>
          </TouchableOpacity>

        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 60,
    left: 15
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#f5f0eb",
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    backgroundColor: "transparent",
    // borderColor: "#00c48c",
    // borderWidth: 2,
    height: containerWidth,
    width: containerWidth,
    borderRadius: 25,
    justifyContent: "center",
  },
  loginHeader: {
    color: "#00c48c",
    textAlign: "center",
    fontSize: 32,
    fontFamily: "NunitoSemiBold",
    letterSpacing: -1,
    marginBottom: 10,
  },

  subHeaderText: {
    color: "#00c48c",
    marginHorizontal: 40,
    // textAlign: "center",
    fontSize: 16,
    fontFamily: "NunitoSemiBold",
    // letterSpacing: ,
  },
  textInput: {
    width: "90%",
    height: 50,
    borderRadius: 25,
    padding: 12,
    marginVertical: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderColor: "white",
    borderWidth: 2,
    color: "#2e2e2e",
    fontSize: 18,
    fontFamily: "NunitoRegular",
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  button: {
    backgroundColor: "#00c48c",
    // marginTop: sideMargin,
    marginVertical: 10,

    borderRadius: 25,
    width: "90%",
    height: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "#f5f0eb",
    // borderWidth: 2,
  },
  text: {
    fontFamily: "NunitoBold",
    fontSize: 21,
    // color: "#f5f0eb",
    color: "white",
  },
  createAccount: {
    fontSize: 14,
    fontFamily: "NunitoRegular",
    color: "#00c48c",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  }
});
