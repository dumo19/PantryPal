import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_300Light,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";

export default function useNunitoFonts() {
  const [fontsLoaded] = useFonts({
    NunitoLight: Nunito_300Light,
    NunitoRegular: Nunito_400Regular,
    NunitoSemiBold: Nunito_600SemiBold,
    NunitoBold: Nunito_700Bold,
  });

  if (!fontsLoaded) {
    console.warn("Nunito fonts are not loaded yet.");
  }

  return fontsLoaded;
}