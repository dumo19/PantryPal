import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Pressable,
  View,
  Text,
  Keyboard,
  Platform,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import IngredientTextInput from "@/components/IngredientTextInput";
import GenerateButton from "@/components/GenerateButton";
import { generateRecipe } from "@/utils/openai";
import { router } from "expo-router";
import { ActivityIndicator } from "react-native";
import useNunitoFonts from "@/hooks/useNunitoFonts";
import ApplianceButton from "@/components/ApplianceButton";

const screenWidth = Dimensions.get("window").width;
const containerWidth = screenWidth * 0.9;
const sideMargin = (screenWidth - containerWidth) / 2;

// import 'expo-router/entry';

const appliances = [
  { name: "oven" },
  { name: "microwave" },
  { name: "stove" },
  { name: "air fryer" },
  { name: "grill" },
  { name: "hot plate" },
];

export default function HomeScreen() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const fontsLoaded = useNunitoFonts();

  const isLoggedIn = false;

  const handleIngredientsChange = (text: string) => {
    setIngredients(text);
    console.log("Ingredients", text);
  };

  const handleGenerate = async () => {
    // console.log("generate pressed");
    setLoading(true);
    try {
      const result = await generateRecipe(ingredients);
      setRecipe(result);

      // console.log("handle generate recipe: ", result);
      // recipe ? console.log("Generated Recipe:", recipe) : null;
      let recipeObj = result;
      if (typeof result === "string") {
        try {
          recipeObj = JSON.parse(result);
        } catch {
          // fallback or error handling
          return;
        }
      }

      // Navigate to modal and pass recipe data as params
      router.push({
        pathname: "/modal",
        params: {
          title: recipeObj.title || recipeObj.name || "Recipe",
          ingredients: Array.isArray(recipeObj.ingredients)
            ? recipeObj.ingredients
            : JSON.stringify(recipeObj.ingredients),
          instructions: recipeObj.instructions || "",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (recipe) {
      console.log("Recipe updated:", recipe);
    }
  }, [recipe]);

  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <View style={{ flex: 1, backgroundColor: "#f5f0eb" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <KeyboardAvoidingView
              style={styles.container}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={sideMargin} // adjust to match header height
            >
              <View style={styles.header}>
                <View style={styles.headerSide} />
                <Text style={styles.pantryPal}>PantryPal</Text>
                <View style={styles.headerSide}>
                  <Pressable
                    style={styles.userButton}
                    onPress={() => {
                      console.log("User button pressed");
                      if (isLoggedIn) {
                        router.push("/account");
                      } else {
                        router.push("/login");
                      }
                    }}
                  >
                    <Ionicons
                      name="person-circle-outline"
                      size={36}
                      color="#00c48c"
                    />
                  </Pressable>
                </View>
              </View>

              <IngredientTextInput
                value={ingredients}
                onChangeText={handleIngredientsChange}
              />

              <Text style={styles.appliancesText}>Appliances Available</Text>

              <ScrollView
                horizontal
                // bounces={false}
                showsHorizontalScrollIndicator={false}
                style={styles.applianceView}
                contentContainerStyle={{
                  alignItems: "center", 
                  paddingLeft: sideMargin
                }}
              >
                {appliances.map((appliance, idx) => (
                  <ApplianceButton key={appliance.name} name={appliance.name} />
                ))}
              </ScrollView>

              <GenerateButton onPress={handleGenerate} />

              {loading && (
                <View style={styles.loadingOverlay}>
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#white" />
                    <Text>Generating recipe...</Text>
                  </View>
                </View>
              )}

            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#f5f0eb",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  loadingContainer: {
    height: 200,
    width: 200,
    backgroundColor: "#00c48c",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "90%",
  },
  headerSide: {
    width: 40,
    alignItems: "flex-end",
    backgroundColor: "transparent",
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
  appliancesText: {
    fontFamily: "NunitoSemiBold",
    fontSize: 21,
    color: "#00c48c",
    paddingHorizontal: sideMargin,
    marginTop: sideMargin,
  },
  applianceView: {
    // flex: 0,
    // height: 100,
    // backgroundColor: "yellow",
    marginTop: 10,
    // flexDirection: "row",
    // flexWrap: "wrap",
  },
});
