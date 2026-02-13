import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Pressable
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
// import FavoriteCard from "@/components/FavoriteCard";

export const screenWidth = Dimensions.get("window").width;
export const containerWidth = screenWidth * 0.9;
export const sideMargin = (screenWidth - containerWidth) / 2;

const AccountScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>

       <View style={styles.headerLeftSide}>
          <Pressable style={styles.userButton} onPress={() => router.back()}>
            <Feather name="chevron-left" size={36} color="#00c48c" />
          </Pressable>
        </View>

        <Text style={styles.pantryPal}></Text>

        <View style={styles.headerRightSide}>
          <Pressable style={styles.userButton}>
            <Feather name="settings" size={28} color="#00c48c" />
          </Pressable>
        </View>

      </View>

      <View style={styles.favoritesContainer}>
        <Text style={styles.favoritesHeader}>Favorite Recipes</Text>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f0eb",
  },
  header: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "100%",
    marginBottom: 20
  },
  headerLeftSide: {
    backgroundColor: "transparent",
    width: 70,
    alignItems: "flex-start",
    paddingLeft: sideMargin - 10
    // backgroundColor: "transparent",
  },
  headerRightSide: {
    backgroundColor: "transparent",
    width: 70,
    alignItems: "flex-end",
    paddingRight: sideMargin,
    // backgroundColor: "transparent",
  },
  userButton: {},
  pantryPal: {
    flex: 1,
    color: "#00c48c",
    textAlign: "center",
    fontSize: 32,
    fontFamily: "NunitoSemiBold",
    letterSpacing: -1,
  },
  backButton: {
    // position: "absolute",
    // top: 60,
    // left: 15
    marginLeft: sideMargin,
  },

  favoritesContainer: {
    // flex: 1,
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
    alignSelf: "center",
    width: "90%",
  },
  favoritesHeader: {
    color: "#00c48c",
    // backgroundColor: "blue",
    textAlign: "left",
    // justifyContent: "center",
    // alignItems: "center",
    fontSize: 32,
    fontFamily: "NunitoSemiBold",
    letterSpacing: -1,
  },
});
