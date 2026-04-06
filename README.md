# Aspie Guide

A comprehensive mobile app for people on the Autism Spectrum (DSM-5) and with Asperger's Syndrome (DSM-4). Built with React Native and Expo.

## Features

### AI Chat Assistant
Ask anything about ASD — social situations, emotions, sensory challenges, and coping strategies. Powered by OpenAI's GPT API with a system prompt specifically designed for clear, literal, and empathetic communication.

- Bring your own OpenAI API key (stored locally on device)
- Step-by-step setup instructions included
- Quick-prompt suggestions for common questions
- Conversation history

### Mini-Games
4 interactive games to build social skills through practice:

- **Emotion Decoder** — Identify emotions from body language and facial expression descriptions
- **Social Scenario Practice** — Choose the most appropriate response in real-world situations
- **Conversation Flow** — Learn to keep conversations going with balanced responses
- **Literal vs. Figurative** — Identify idioms, metaphors, and figurative language

### Quizzes
- **Understanding ASD** — 10-question knowledge quiz covering neurodiversity, masking, stimming, burnout, and more
- **Sensory Profile Self-Assessment** — Discover your sensory sensitivities across auditory, visual, tactile, and other channels
- **Social Situations Knowledge Check** — Test your understanding of unwritten social rules

### Psychology & Therapy
Evidence-based therapeutic approaches adapted for ASD:

- Cognitive Behavioural Therapy (CBT)
- Dialectical Behaviour Therapy (DBT)
- Social Stories (Carol Gray)
- Mindfulness for ASD
- Sensory Integration Therapy
- Executive Function Strategies
- Emotion Regulation
- Leveraging Special Interests

### Sensory Relaxation
Guided breathing exercises with:
- 5 preset breathing patterns (Box, Deep Calm, Pranayama, Ujjayi, Awake)
- Custom pattern builder
- Voice guidance (Laura, Paul, or Bell)
- Haptic feedback
- Calming animated visuals with dark mode support

### Articles
32 chapters from "Coping: A Survival Guide for People with Asperger Syndrome" by Marc Segar, covering social skills, conversation, work, relationships, and daily life.

### Search
Full-text search across all articles, games, quizzes, and therapy content with keyword matching and grouped results.

## Tech Stack

- **Framework:** React Native + Expo (SDK 49)
- **Navigation:** React Navigation (Drawer)
- **State:** Zustand + AsyncStorage
- **Styling:** NativeWind (Tailwind CSS for RN)
- **Animations:** React Native Reanimated + Animated API
- **Audio:** Expo AV
- **Haptics:** Expo Haptics

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android
```

## Building for Production

```bash
# Build for both platforms
eas build --platform all --profile production

# Submit to App Store
eas submit --platform ios --latest

# Submit to Google Play
eas submit --platform android --latest
```

## Privacy

Aspie Guide collects no personal data. All settings, chat history, and API keys are stored locally on your device. See the full [Privacy Policy](https://wonmor.github.io/Aspie-Helper/).

## Credits

- Article content: "Coping: A Survival Guide for People with Asperger Syndrome" by Marc Segar
- Typing: Pauline Greenhough
- App development: John Wonmo Seong / [Orchestr, Inc.](mailto:john@orchestrsim.com)

## License

All rights reserved. Copyright 2026 John Wonmo Seong / Orchestr, Inc.
