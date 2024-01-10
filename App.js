import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TextInput } from "react-native";

import {
  Home,
  DetailArtikel,
  Pekerjaan,
  Artikel,
  Login,
  Profile,
  Bantuan,
  FAQ,
  LaporEror,
  DetailJob,
  FormApplay,
  DetailLamaran,
  CompanyVacancy,
  FormInterview,
  AddVacancy,
  EditProfile,
} from "./src/pages";
import Register from "./src/pages/Auth/register";
import TentangAplikasi from "./src/pages/Profile/tentangAplikasi";

const Stack = createNativeStackNavigator();
// TextInput;

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

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Bantuan"
          component={Bantuan}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TentangAplikasi"
          component={TentangAplikasi}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="FAQ"
          component={FAQ}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="LaporEror"
          component={LaporEror}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DetailJob"
          component={DetailJob}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="FormApplay"
          component={FormApplay}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DetailLamaran"
          component={DetailLamaran}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CompanyVacancy"
          component={CompanyVacancy}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Form Interview"
          component={FormInterview}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Add Vacancy"
          component={AddVacancy}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
