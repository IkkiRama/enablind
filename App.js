import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home, DetailArtikel, Pekerjaan, Artikel } from "./src/pages";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Beranda">
        <Stack.Screen
          name="Beranda"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DetailArtikel"
          component={DetailArtikel}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Pekerjaan"
          component={Pekerjaan}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Artikel"
          component={Artikel}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
