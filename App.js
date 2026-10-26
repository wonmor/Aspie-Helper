/*
  "react-native-google-mobile-ads": {
    "android_app_id": "ca-app-pub-6461064835542419~9356922403",
    "ios_app_id": "ca-app-pub-6461064835542419~6855414974"
  }
*/

import * as SplashScreen from "expo-splash-screen";
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
import { EntryPoint } from "./core/entry-point";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import ScriptsScreen from "./pages/ScriptsScreen";
import CoachScreen from "./pages/CoachScreen";
import MyScriptsScreen from "./pages/MyScriptsScreen";
import HelpNowScreen from "./pages/HelpNowScreen";
import ProScreen from "./pages/ProScreen";
import PaywallModal from "./components/Paywall";
import { usePro } from "./lib/pro";
import { SCENARIOS } from "./data/scenarios";
import SearchScreen from "./pages/SearchScreen";
import ChatbotScreen from "./pages/ChatbotScreen";
import MiniGamesScreen from "./pages/MiniGamesScreen";
import QuizzesScreen from "./pages/QuizzesScreen";
import TherapyScreen from "./pages/TherapyScreen";
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

const chapterData = [
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

// ─── Feature cards shown on the home screen ───────────────────────────────────
const features = [
  {
    id: "Situation Scripts",
    title: "Situation Scripts",
    subtitle: "What to say and do",
    icon: "library-outline",
    color: "#e0e7ff",
    border: "#6366f1",
    desc: `${SCENARIOS.length} everyday situations: work, phone calls, shops, friends, dating, safety and health.`,
  },
  {
    id: "Practice & Coach",
    title: "Practice & Coach",
    subtitle: "Rehearse before the real thing",
    icon: "chatbubbles-outline",
    color: "#fae8ff",
    border: "#c026d3",
    desc: "Practice rounds with feedback, a private AI role-play partner, and Message Check.",
  },
  {
    id: "My Scripts",
    title: "My Scripts",
    subtitle: "Your saved lines",
    icon: "bookmark-outline",
    color: "#f1f5f9",
    border: "#64748b",
    desc: "Keep the lines that work for you and show them full screen when you need them.",
  },
  {
    id: "AI Chat Assistant",
    title: "AI Chat Assistant",
    subtitle: "Ask anything about ASD",
    icon: "chatbubble-ellipses-outline",
    color: "#ede9fe",
    border: "#8b5cf6",
    desc: "Direct, clear answers to social, emotional and ASD-related questions. Private on-device AI on iPhones with Apple Intelligence, or your own OpenAI key.",
  },
  {
    id: "Mini-Games",
    title: "Mini-Games",
    subtitle: "Build social skills playfully",
    icon: "game-controller-outline",
    color: "#fef3c7",
    border: "#f59e0b",
    desc: "4 interactive games: Emotion Decoder, Social Scenarios, Conversation Flow, and Literal vs. Figurative.",
  },
  {
    id: "Quizzes",
    title: "Quizzes",
    subtitle: "Test and expand your knowledge",
    icon: "clipboard-outline",
    color: "#dcfce7",
    border: "#22c55e",
    desc: "ASD Knowledge, Sensory Profile Self-Assessment, and Social Situations quizzes.",
  },
  {
    id: "Psychology & Therapy",
    title: "Psychology & Therapy",
    subtitle: "Evidence-based techniques",
    icon: "bulb-outline",
    color: "#e0f2fe",
    border: "#0ea5e9",
    desc: "CBT, DBT, Social Stories, Mindfulness, Sensory Integration, Emotion Regulation, and more.",
  },
];

function HomeScreen({ navigation }) {
  const isPro = usePro((x) => x.isPro);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ── Hero ──────────────────────────────────────────── */}
      <View style={styles.hero}>
        <Text style={[styles.title, { fontFamily: "LoveYaLikeASister_400Regular" }]}>
          Aspie Guide
        </Text>
        <Text style={styles.heroSubtitle}>
          A comprehensive resource for people on the Autism Spectrum (DSM-5) and with Asperger's Syndrome (DSM-4).
        </Text>
      </View>

      {/* ── Search ─────────────────────────────────────────── */}
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          navigation.navigate("Search");
        }}
      >
        <Ionicons name="search-outline" size={18} color="#9ca3af" style={{ marginRight: 10 }} />
        <Text style={[styles.searchButtonText, { fontFamily: "Quicksand_500Medium" }]}>
          Search articles, games, quizzes, therapy...
        </Text>
      </TouchableOpacity>

      {/* ── Get Help Now (always free) ─────────────────────── */}
      <TouchableOpacity
        style={styles.helpCard}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          navigation.navigate("Get Help Now");
        }}
        accessibilityRole="button"
      >
        <Ionicons name="hand-left-outline" size={26} color="#b91c1c" style={{ marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.helpTitle, { fontFamily: "Quicksand_700Bold" }]}>Get Help Now</Text>
          <Text style={[styles.helpSub, { fontFamily: "Quicksand_500Medium" }]}>
            Crisis lines, help cards and a meltdown plan. Always free.
          </Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={20} color="#b91c1c" />
      </TouchableOpacity>

      {/* ── Sensory Relaxation ────────────────────────────── */}
      <Text style={[styles.sectionHeader, { fontFamily: "Quicksand_700Bold" }]}>
        Sensory Relaxation
      </Text>
      <TouchableOpacity
        style={styles.relaxButton}
        onPress={() => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          navigation.navigate("Sensory Relaxation");
        }}
      >
        <Image
          style={styles.relaxImage}
          source={require("./assets/marc.jpg")}
        />
        <View style={styles.relaxTextContainer}>
          <Text style={styles.relaxTitle}>Breathing Exercises</Text>
          <Text style={styles.relaxSubtitle}>
            Guided breathing with custom patterns, audio cues, and haptic feedback
          </Text>
          <View style={styles.relaxBadge}>
            <Text style={styles.relaxBadgeText}>Tap to Begin</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* ── New Features ──────────────────────────────────── */}
      <Text style={[styles.sectionHeader, { fontFamily: "Quicksand_700Bold" }]}>
        Tools & Learning
      </Text>

      {features.map((f) => (
        <TouchableOpacity
          key={f.id}
          style={[styles.featureCard, { backgroundColor: f.color, borderLeftColor: f.border }]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            navigation.navigate(f.id);
          }}
        >
          <Ionicons name={f.icon} size={30} color={f.border} style={styles.featureIcon} />
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { fontFamily: "Quicksand_700Bold" }]}>{f.title}</Text>
            <Text style={[styles.featureSubtitle, { fontFamily: "Quicksand_600SemiBold" }]}>{f.subtitle}</Text>
            <Text style={[styles.featureDesc, { fontFamily: "Quicksand_400Regular" }]}>{f.desc}</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#9ca3af" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.proCard}
        onPress={() => navigation.navigate("Aspie Guide Pro")}
        accessibilityRole="button"
      >
        <Ionicons name={isPro ? "checkmark-done-outline" : "sparkles-outline"} size={24} color="#fff" style={{ marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.proTitle, { fontFamily: "Quicksand_700Bold" }]}>
            {isPro ? "Aspie Guide Pro is active" : "Aspie Guide Pro"}
          </Text>
          <Text style={[styles.proSub, { fontFamily: "Quicksand_500Medium" }]}>
            {isPro
              ? "Thank you for supporting the app."
              : "All situations, practice, a private AI coach and unlimited saved scripts."}
          </Text>
        </View>
      </TouchableOpacity>

      {/* ── Articles ──────────────────────────────────────── */}
      <Text style={[styles.sectionHeader, { fontFamily: "Quicksand_700Bold" }]}>
        Articles: Coping Guide
      </Text>
      <Text style={[styles.articlesSubtitle, { fontFamily: "Quicksand_400Regular" }]}>
        32 chapters from "Coping: A Survival Guide for People with Asperger Syndrome" by Marc Segar.
      </Text>

      <View style={styles.gridContainer}>
        {chapterData.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              navigation.navigate(item);
            }}
          >
            <View style={styles.gridItem}>
              <Text style={{ ...styles.gridItemText, fontFamily: "Quicksand_600SemiBold" }}>
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Footer ────────────────────────────────────────── */}
      <View style={styles.footer}>
        <Text style={styles.acknowledgment}>
          The article content, "Coping: A Survival Guide for People with Asperger Syndrome", was originally written by Marc Segar.
          Special thanks to Pauline Greenhough for her typing.
          Edited for digital accessibility by John Wonmo Seong.
        </Text>
        <Text style={styles.development}>
          App developed by John Wonmo Seong.{" "}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("mailto:john@orchestrsim.com")}
          >
            john@orchestrsim.com
          </Text>
          {" | Orchestr, Inc."}
        </Text>
      </View>

      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

// ─── Chapter content screen ───────────────────────────────────────────────────

const chapterComponents = {
  Foreword,
  Introduction,
  "Getting the best from this book": GettingTheBestFromThisBook,
  Worrying,
  "Looking on the bright side": LookingOnTheBrightSide,
  "Body language": BodyLanguage,
  Boundaries,
  "Eye contact": EyeContact,
  "Tone of voice": ToneOfVoice,
  "Dress sense": DressSense,
  "Distortions of the truth": DistortionsOfTheTruth,
  "Misunderstandings other people might have about you": MisunderstandingsOtherPeopleMightHaveAboutYou,
  Conversation,
  "General knowledge": GeneralKnowledge,
  Names,
  "Humour and conflict": HumourAndConflict,
  Invitation,
  "Personal Security": PersonalSecurity,
  "Finding the right friends": FindingTheRightFriends,
  "Keeping a clean slate": KeepingACleanSlate,
  "Coming Clean": ComingClean,
  Education,
  "Living Away from Home": LivingAwayFromHome,
  "Using the Phone": UsingThePhone,
  Guests,
  "Jobs and Interviews": JobsAndInterviews,
  Driving,
  "Travelling abroad": TravellingAbroad,
  Bartering,
  Opportunities,
  "A Personal in depth analysis of the problem": APersonalInDepthAnalysisOfTheProblem,
  "Further Reading": FurtherReading,
};

function ContentScreen({ route }) {
  const { title, chapterNumber } = route.params;
  const ChapterComponent = chapterComponents[title] || null;

  return (
    <ScrollView style={styles.chapterContainer}>
      <Text style={{ fontFamily: "Quicksand_400Regular", fontSize: 20, marginBottom: 4 }}>
        <Text style={{ fontFamily: "Quicksand_700Bold" }}>Chapter {chapterNumber}: </Text>
        {title}
      </Text>

      {ChapterComponent ? (
        <ChapterComponent />
      ) : (
        <Text style={{ fontFamily: "Quicksand_400Regular", fontSize: 16, marginTop: 20, color: "#666" }}>
          This chapter is not available yet. Please check back later.
        </Text>
      )}
    </ScrollView>
  );
}

// ─── Drawer navigator ─────────────────────────────────────────────────────────

const Drawer = createDrawerNavigator();

const drawerLabelStyle = { fontFamily: "Quicksand_600SemiBold" };

function makeLabel(name) {
  return ({ color }) => (
    <Text style={[drawerLabelStyle, { color }]}>{name}</Text>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
    LoveYaLikeASister_400Regular,
  });

  useEffect(() => {
    usePro.getState().init();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        initialRouteName={process.env.EXPO_PUBLIC_DEMO_ROUTE || "Home"}
        screenOptions={{ headerTitleStyle: { fontFamily: "Quicksand_600SemiBold" } }}
      >
        {/* ── Main screens ─────────────────────────────── */}
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ drawerLabel: makeLabel("Home") }}
        />
        <Drawer.Screen
          name="Get Help Now"
          component={HelpNowScreen}
          options={{ drawerLabel: makeLabel("Get Help Now") }}
        />
        <Drawer.Screen
          name="Search"
          component={SearchScreen}
          options={{ drawerLabel: makeLabel("Search") }}
        />
        <Drawer.Screen
          name="Sensory Relaxation"
          component={EntryPoint}
          options={{ drawerLabel: makeLabel("Sensory Relaxation") }}
        />

        {/* ── New feature screens ───────────────────────── */}
        <Drawer.Screen
          name="Situation Scripts"
          component={ScriptsScreen}
          options={{ drawerLabel: makeLabel("Situation Scripts") }}
        />
        <Drawer.Screen
          name="Practice & Coach"
          component={CoachScreen}
          options={{ drawerLabel: makeLabel("Practice & Coach") }}
        />
        <Drawer.Screen
          name="My Scripts"
          component={MyScriptsScreen}
          options={{ drawerLabel: makeLabel("My Scripts") }}
        />
        <Drawer.Screen
          name="AI Chat Assistant"
          component={ChatbotScreen}
          options={{ drawerLabel: makeLabel("AI Chat Assistant") }}
        />
        <Drawer.Screen
          name="Mini-Games"
          component={MiniGamesScreen}
          options={{ drawerLabel: makeLabel("Mini-Games") }}
        />
        <Drawer.Screen
          name="Quizzes"
          component={QuizzesScreen}
          options={{ drawerLabel: makeLabel("Quizzes") }}
        />
        <Drawer.Screen
          name="Psychology & Therapy"
          component={TherapyScreen}
          options={{ drawerLabel: makeLabel("Psychology & Therapy") }}
        />

        <Drawer.Screen
          name="Aspie Guide Pro"
          component={ProScreen}
          options={{ drawerLabel: makeLabel("Aspie Guide Pro") }}
        />

        {/* ── Chapter screens ───────────────────────────── */}
        {chapterData.map((item, index) => (
          <Drawer.Screen
            key={index}
            name={item}
            component={ContentScreen}
            initialParams={{ title: item, chapterNumber: index + 1 }}
            options={{ drawerLabel: makeLabel(item) }}
          />
        ))}
      </Drawer.Navigator>
      <PaywallModal />
    </NavigationContainer>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  chapterContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  // Hero
  hero: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 24,
    backgroundColor: "#fff",
    marginBottom: 4,
  },
  title: {
    fontSize: 46,
    textAlign: "center",
    marginBottom: 12,
    color: "#1e1b4b",
  },
  heroSubtitle: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 8,
  },

  // Search button
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  searchButtonIcon: { fontSize: 18, marginRight: 10 },
  searchButtonText: { fontSize: 15, color: "#9ca3af" },

  // Section headers
  sectionHeader: {
    fontSize: 20,
    color: "#1e1b4b",
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },

  // Get Help Now
  helpCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef2f2",
    borderWidth: 1.5,
    borderColor: "#fecaca",
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 14,
    padding: 14,
  },
  helpTitle: { fontSize: 17, color: "#b91c1c" },
  helpSub: { fontSize: 13, color: "#7f1d1d", marginTop: 2, lineHeight: 18 },

  // Pro
  proCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6366f1",
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 14,
    padding: 16,
  },
  proTitle: { fontSize: 16, color: "#fff" },
  proSub: { fontSize: 13, color: "#e0e7ff", marginTop: 2, lineHeight: 18 },

  // Relaxation button
  relaxButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 14,
    marginBottom: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  relaxImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 14,
  },
  relaxTextContainer: {
    flex: 1,
  },
  relaxTitle: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 17,
    color: "#1e1b4b",
    marginBottom: 3,
  },
  relaxSubtitle: {
    fontFamily: "Quicksand_400Regular",
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginBottom: 8,
  },
  relaxBadge: {
    backgroundColor: "#6366f1",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  relaxBadgeText: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 12,
    color: "#fff",
  },

  // Feature cards
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  featureIcon: { marginRight: 14, flexShrink: 0 },
  featureContent: { flex: 1 },
  featureTitle: { fontSize: 16, color: "#1e1b4b", marginBottom: 1 },
  featureSubtitle: { fontSize: 12, color: "#64748b", marginBottom: 4 },
  featureDesc: { fontSize: 13, color: "#444", lineHeight: 18 },
  featureChevron: { fontSize: 22, color: "#9ca3af", marginLeft: 8 },

  // Articles
  articlesSubtitle: {
    fontSize: 13,
    color: "#888",
    paddingHorizontal: 20,
    marginBottom: 12,
    lineHeight: 19,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 15,
    justifyContent: "flex-start",
  },
  gridItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  gridItemText: {
    color: "#444",
    fontSize: 14,
  },

  // Footer
  footer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
  acknowledgment: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 13,
    color: "#888",
    lineHeight: 20,
    marginBottom: 12,
  },
  development: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 13,
    color: "#888",
    lineHeight: 20,
  },
  link: {
    color: "#6366f1",
  },
});
