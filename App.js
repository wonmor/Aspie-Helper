import AppLoading from "expo-app-loading";
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity,
} from "react-native";

const data = [
  "Foreword",
  "Introduction",
  "Getting the best from this book",
  "Worrying",
  "Looking on the bright side",
  "Body language",
  "Boundaries",
  "Eye contact",
  "Tone of voice",
  "Dress sense",
  "Distortions of the truth",
  "Misunderstandings other people might have about you",
  "Conversation",
  "General knowledge",
  "Names",
  "Humour and conflict",
  "Sexually related problems and points about going out",
  "Nights Out",
  "Chat ups",
  "Invitation",
  "Personal Security",
  "Rape Crisis",
  "Finding the right friends",
  "Keeping a clean slate",
  "Coming Clean",
  "Education",
  "Living Away from Home",
  "Using the Phone",
  "Guests",
  "Jobs and Interviews",
  "Driving",
  "Travelling abroad",
  "Bartering",
  "Opportunities",
  "A Personal in depth analysis of the problem",
  "Further Reading",
];

function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, { fontFamily: "Quicksand_600SemiBold" }]}>
        Aspie Guide
      </Text>

      <Text style={[styles.header, { fontFamily: "Quicksand_600SemiBold" }]}>
        Contents
      </Text>
      {/* Table of Contents Grid */}
      <View style={styles.gridContainer}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item)}
          >
            <View style={styles.gridItem}>
              <Text
                style={{
                  ...styles.contents,
                  fontFamily: "Quicksand_600SemiBold",
                }}
              >
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Acknowledgments */}
      <Text style={styles.acknowledgment}>
        The book, ‘Coping: A Survival Guide for People with Asperger Syndrome’
        was written by Marc Segar. Special thanks are due to Pauline
        Greenhough for her typing.
      </Text>

      {/* App Development */}
      <Text style={styles.development}>
        The app has been developed by John Wonmo Seong for better accessibility
        to the public. Contact:{" "}
        <Text
          style={styles.link}
          onPress={() => Linking.openURL("mailto:wonmos@uci.edu")}
        >
          wonmos@uci.edu
        </Text>{" "}
        at University of California, Irvine.
      </Text>
    </ScrollView>
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

  function ContentScreen({ route }) {
    const { title } = route.params;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontFamily: "Quicksand_600SemiBold", fontSize: 20 }}>
          {title}
        </Text>
      </View>
    );
  }

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
          {/* Loop through the data array and render screens */}
          {data.map((item, index) => (
            <Drawer.Screen
              key={index}
              name={item}
              component={ContentScreen}
              initialParams={{ title: item }}
              options={{
                headerTitleStyle: {
                  fontFamily: "Quicksand_600SemiBold",
                },
                drawerLabel: ({ focused, color }) => (
                  <Text style={{ fontFamily: "Quicksand_600SemiBold", color }}>
                    {item}
                  </Text>
                ),
              }}
            />
          ))}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  header: {
    fontSize: 22,
    marginTop: 15,
    marginBottom: 15,
    color: "#555",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  contents: {
    fontFamily: "Quicksand_600SemiBold",
    color: "#444",
    fontSize: 16,
  },
  acknowledgment: {
    fontFamily: "Quicksand_600SemiBold",
    marginBottom: 20,
    color: "#666",
  },
  development: {
    fontFamily: "Quicksand_600SemiBold",
    marginBottom: 30,
    color: "#666",
  },
  link: {
    color: "#2196F3",
  },
});
