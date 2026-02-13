import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import useNunitoFonts from "@/hooks/useNunitoFonts";

import { Dimensions } from "react-native";

export const screenWidth = Dimensions.get("window").width;
export const containerWidth = screenWidth * 0.9;
export const sideMargin = (screenWidth - containerWidth) / 2;

type GenerateButtonProps = {
  onPress: () => void;
};

const GenerateButton = ({ onPress }: GenerateButtonProps) => {
  const fontsLoaded = useNunitoFonts();

  return (
    <View style={styles.shadow}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // console.log("Generate Recipe Pressed");
          onPress();
        }}
      >
        <Text style={styles.text}>Generate Recipe</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenerateButton;

const styles = StyleSheet.create({
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
    marginTop: sideMargin,
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
});
