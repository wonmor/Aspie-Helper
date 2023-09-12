import AppLoading from "expo-app-loading";
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        style={{ backgroundColor: "#2196F3", padding: 10, borderRadius: 5 }}
        onPress={() => navigation.navigate("Notifications")}
      >
        <Text
          style={{
            fontSize: 16,
            color: "white",
            fontFamily: "Quicksand_600SemiBold",
          }}
        >
          Go to notifications
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        style={{ backgroundColor: "#2196F3", padding: 10, borderRadius: 5 }}
        onPress={() => navigation.goBack()}
      >
        <Text
          style={{
            fontSize: 16,
            color: "white",
            fontFamily: "Quicksand_600SemiBold",
          }}
        >
          Go back home
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTitleStyle: {
                fontFamily: "Quicksand_600SemiBold",
              },
              drawerLabel: ({ focused, color }) => (
                <Text style={{ fontFamily: "Quicksand_600SemiBold", color }}>
                  Home
                </Text>
              ),
            }}
          />
          <Drawer.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
              headerTitleStyle: {
                fontFamily: "Quicksand_600SemiBold",
              },
              drawerLabel: ({ focused, color }) => (
                <Text style={{ fontFamily: "Quicksand_600SemiBold", color }}>
                  Notifications
                </Text>
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
