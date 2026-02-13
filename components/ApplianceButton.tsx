import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import useNunitoFonts from "@/hooks/useNunitoFonts";


const size = 80;

const screenWidth = Dimensions.get("window").width;
const containerWidth = screenWidth * 0.9;
const sideMargin = (screenWidth - containerWidth) / 2;

const ApplianceButton = ({ name }) => {
  const fontsLoaded = useNunitoFonts();
  
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.buttonContainer, { height: size, width: size }]}
      >
        <MaterialCommunityIcons name="toaster-oven" size={50} color="#00c48c" />
        {/* <Text>{name}</Text> */}
      </Pressable>
      <Text style={styles.applianceText}>{name}</Text>
    </View>
  );
};

export default ApplianceButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: sideMargin / 2,
  },
  buttonContainer: {
    // backgroundColor: "#00c48c",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderColor: "white",
    borderWidth: 2,

    // alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,

    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
  },
  applianceText: {
    marginTop: 2,
    fontFamily: "NunitoSemiBold",
    fontSize: 16,
    color: "#00c48c",
  }
});
