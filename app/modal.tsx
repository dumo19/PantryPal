import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const containerWidth = screenWidth * 0.9;
const sideMargin = (screenWidth - containerWidth) / 2;

export default function ModalScreen() {
  const { title, ingredients, instructions } = useLocalSearchParams();
  const router = useRouter();
  const [isFavorite, setFavorite] = useState(false);

  return (
    <View style={{ backgroundColor: "#f5f0eb" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.containerHeading}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Feather name="x" size={35} color={"#00c48c"} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setFavorite((prev) => !prev)}
          >
            <AntDesign
              name={isFavorite ? "star" : "staro"}
              size={30}
              color="#00c48c"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.titleText}>{title}</Text>

        <View style={styles.textContainer}>
          <Text style={styles.subHeader}>Ingredients:</Text>

          {Array.isArray(ingredients) ? (
            ingredients.map((item, idx) => <Text key={idx}>- {item}</Text>)
          ) : (
            <Text style={styles.ingredientsText}>{ingredients}</Text>
          )}

          <Text style={styles.subHeader}>Instructions:</Text>

          <Text style={styles.instructionsText}>{instructions}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: sideMargin,
  },
  containerHeading: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {},
  favoriteButton: {},

  titleText: {
    fontSize: 36,
    color: "#00c48c",
    fontFamily: "NunitoBold",
    marginBottom: 16,
    marginHorizontal: sideMargin
  },
  textContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 25,
    borderColor: "white",
    borderWidth: 2,
    padding: sideMargin,
  },
  subHeader: {
    fontSize: 21,
    color: "#00c48c",
    fontFamily: "NunitoBold",
  },
  ingredientsText: {
    fontSize: 15,
    color: "#555",
    // marginHorizontal: sideMargin,
    fontFamily: "NunitoRegular",
    marginBottom: 16,
    marginTop: 5,
  },
  instructionsText: {
    fontSize: 15,
    color: "#555",
    // marginHorizontal: 20,
    fontFamily: "NunitoRegular",
    marginTop: 5,
  },
});
