/*
  "react-native-google-mobile-ads": {
    "android_app_id": "ca-app-pub-6461064835542419~9356922403",
    "ios_app_id": "ca-app-pub-6461064835542419~6855414974"
  }
*/

import AppLoading from "expo-app-loading";
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import { LoveYaLikeASister_400Regular } from "@expo-google-fonts/love-ya-like-a-sister";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Copilot from "./pages/Copilot";
import * as Haptics from "expo-haptics";
import {
  Foreword,
  Introduction,
  GettingTheBestFromThisBook,
  Worrying,
  LookingOnTheBrightSide,
  BodyLanguage,
  Boundaries,
  EyeContact,
  ToneOfVoice,
  DressSense,
  DistortionsOfTheTruth,
  MisunderstandingsOtherPeopleMightHaveAboutYou,
  Conversation,
  GeneralKnowledge,
  Names,
  HumourAndConflict,
  Invitation,
  PersonalSecurity,
  FindingTheRightFriends,
  KeepingACleanSlate,
  ComingClean,
  Education,
  LivingAwayFromHome,
  UsingThePhone,
  Guests,
  JobsAndInterviews,
  Driving,
  TravellingAbroad,
  Bartering,
  Opportunities,
  APersonalInDepthAnalysisOfTheProblem,
  FurtherReading,
} from "./pages/Contents";

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
  "Invitation",
  "Personal Security",
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
      <View style={styles.nestedContainer}>
        <Text
          style={[styles.title, { fontFamily: "LoveYaLikeASister_400Regular" }]}
        >
          Aspie Guide
        </Text>

        <Text style={styles.subtitle}>
          Designed for people who are neurodiverse; on the Autism Spectrum,
          ADHD, or other related conditions.
        </Text>
      </View>

      <TouchableOpacity style={styles.copilotButton} onPress={() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        navigation.navigate("Copilot");
      }}>
        <Image
          style={styles.copilotImage}
          source={require("./assets/icon.png")}
        />
        <View style={styles.copilotTextContainer}>
          <Text style={styles.copilotTitle}>Try Aspie Copilot</Text>
          <Text style={styles.copilotSubtitle}>Powered by GPT-4</Text>
        </View>
      </TouchableOpacity>

      <Text style={[styles.header, { fontFamily: "Quicksand_600SemiBold" }]}>
        Contents
      </Text>
      {/* Table of Contents Grid */}
      <View style={styles.gridContainer}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
              navigation.navigate(item);
            }}
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
        was written by Marc Segar. Special thanks are due to Pauline Greenhough
        for her typing.
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

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
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
    LoveYaLikeASister_400Regular,
  });
  function ContentScreen({ route }) {
    const { title, chapterNumber } = route.params;

    const chapterComponents = {
      Foreword: Foreword,
      Introduction: Introduction,
      "Getting the best from this book": GettingTheBestFromThisBook,
      Worrying: Worrying,
      "Looking on the bright side": LookingOnTheBrightSide,
      "Body language": BodyLanguage,
      Boundaries: Boundaries,
      "Eye contact": EyeContact,
      "Tone of voice": ToneOfVoice,
      "Dress sense": DressSense,
      "Distortions of the truth": DistortionsOfTheTruth,
      "Misunderstandings other people might have about you":
        MisunderstandingsOtherPeopleMightHaveAboutYou,
      Conversation: Conversation,
      "General knowledge": GeneralKnowledge,
      Names: Names,
      "Humour and conflict": HumourAndConflict,
      Invitation: Invitation,
      "Personal Security": PersonalSecurity,
      "Finding the right friends": FindingTheRightFriends,
      "Keeping a clean slate": KeepingACleanSlate,
      "Coming Clean": ComingClean,
      Education: Education,
      "Living Away from Home": LivingAwayFromHome,
      "Using the Phone": UsingThePhone,
      Guests: Guests,
      "Jobs and Interviews": JobsAndInterviews,
      Driving: Driving,
      "Travelling abroad": TravellingAbroad,
      Bartering: Bartering,
      Opportunities: Opportunities,
      "A Personal in depth analysis of the problem":
        APersonalInDepthAnalysisOfTheProblem,
      "Further Reading": FurtherReading,
    };

    const ChapterComponent = chapterComponents[title] || null;

    return (
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontFamily: "Quicksand_400Regular", fontSize: 20 }}>
          <Text style={{ fontFamily: "Quicksand_600SemiBold" }}>
            Chapter {chapterNumber}:{" "}
          </Text>
          {title}
        </Text>

        {/* Dynamically render the component if it exists, otherwise default content */}
        {ChapterComponent ? (
          <ChapterComponent />
        ) : (
          <Text
            style={{
              fontFamily: "Quicksand_400Regular",
              fontSize: 16,
              marginTop: 20,
            }}
          >
            This chapter is not available yet. Please check back later!
          </Text>
        )}
      </ScrollView>
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
           <Drawer.Screen
            name="Copilot"
            component={Copilot}
            options={{
              headerTitleStyle: {
                fontFamily: "Quicksand_600SemiBold",
              },
              drawerLabel: ({ focused, color }) => (
                <Text style={{ fontFamily: "Quicksand_600SemiBold", color }}>
                  Copilot
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
              initialParams={{ title: item, chapterNumber: index + 1 }}
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
  nestedContainer: {
    flex: 1, // Allows the container to expand
    alignItems: "center", // Centers children horizontally
    justifyContent: "center", // Centers children vertically
  },
  title: {
    fontSize: 48,
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
  imageStyle: {
    width: 150, // Adjust the width as required
    height: 150, // Should be same as width to ensure a circle
    resizeMode: "cover", // Adjusts the image to fit within the boundaries. Changed to 'cover' to fill the circular frame.
    marginBottom: 20, // Space between image and the following text
    alignSelf: "center",
    borderRadius: 100, // Half of the width & height to make it circle
    overflow: "hidden", // Hide the parts of the image that exceed the borderRadius
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
    marginVertical: 20,
    color: "#666",
  },
  subtitle: {
    fontFamily: "Quicksand_600SemiBold",
    marginBottom: 40,
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
  copilotButton: {
    flexDirection: "row", // Image on left, text on right
    alignItems: "center", // Vertically align items in the center
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20, // Adding some margin to separate from other elements
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  copilotImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Half of the width & height to make it circle
    overflow: "hidden", // Hide the parts of the image that exceed the borderRadius
    marginRight: 15, // Space between image and text
  },
  copilotTextContainer: {
    flexDirection: "column", // Stack title above subtitle
  },
  copilotTitle: {
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 18,
    color: "#333",
  },
  copilotSubtitle: {
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 14,
    color: "#666",
    marginTop: 5, // Small space between title and subtitle
  },
});
