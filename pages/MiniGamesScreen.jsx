import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView,
} from 'react-native';
import * as Haptics from 'expo-haptics';

// ─── Game Data ────────────────────────────────────────────────────────────────

const emotionData = [
  {
    id: 1,
    description:
      'A person\'s eyebrows are raised high, their mouth is open and turned downward at the corners, and they are leaning backwards.',
    answer: 'Surprised / Shocked',
    options: ['Happy', 'Surprised / Shocked', 'Angry', 'Sad'],
    explanation:
      'Raised eyebrows + wide open mouth + leaning back = surprise or shock. This is often an involuntary reaction to unexpected news or events.',
    tip: 'Look for raised eyebrows as a key signal. They rise quickly and are hard to fake.',
  },
  {
    id: 2,
    description:
      'A person has slightly upturned corners of their mouth, their eyes are a little narrowed (creating small wrinkles at the corners), and they are making relaxed eye contact.',
    answer: 'Friendly / Genuinely Happy',
    options: ['Bored', 'Nervous', 'Suspicious', 'Friendly / Genuinely Happy'],
    explanation:
      'A genuine smile (called a Duchenne smile) involves both the mouth AND the eyes. Fake smiles usually only involve the mouth.',
    tip: 'The eye wrinkles (called "crow\'s feet") are the key difference between a real smile and a polite one.',
  },
  {
    id: 3,
    description:
      'A person\'s brow is furrowed (forehead wrinkled), their jaw is tense, they are staring with narrowed eyes, and they are leaning slightly forward.',
    answer: 'Angry / Frustrated',
    options: ['Angry / Frustrated', 'Excited', 'Confused', 'Proud'],
    explanation:
      'Furrowed brow + tense jaw + narrowed eyes + forward lean = anger or strong frustration. This is the body preparing to confront something.',
    tip: 'If you see someone with this expression directed at you, it often means they are unhappy about something. Calmly asking "Is everything okay?" can help.',
  },
  {
    id: 4,
    description:
      'A person has downturned corners of their mouth, drooping eyelids, slumped shoulders, and is moving slowly. They may avoid making eye contact.',
    answer: 'Sad / Dejected',
    options: ['Tired', 'Sad / Dejected', 'Bored', 'Sick'],
    explanation:
      'Sadness shows up throughout the whole body: the face droops, the body slumps, and movements slow down. It is different from just being tired.',
    tip: 'When someone looks sad, a simple "Are you okay?" or "Do you want to talk?" can mean a lot, even if they say they\'re fine.',
  },
  {
    id: 5,
    description:
      'A person is avoiding direct eye contact, touching their face or hair repeatedly, shifting their weight from foot to foot, and giving short answers.',
    answer: 'Nervous / Anxious',
    options: ['Rude', 'Disinterested', 'Nervous / Anxious', 'Angry'],
    explanation:
      'Avoidance of eye contact combined with self-touching (face, hair, neck) and fidgeting usually signals anxiety or nervousness — not rudeness.',
    tip: 'Many people with ASD also show these signs. Knowing this can help you empathise with others who look nervous in social situations.',
  },
  {
    id: 6,
    description:
      'A person keeps checking their phone or watch, gives one-word answers, looks around the room instead of at you, and their body is turned slightly away from you.',
    answer: 'Wants to Leave / Disengaged',
    options: ['Angry at you', 'Deeply concentrating', 'Wants to Leave / Disengaged', 'Daydreaming'],
    explanation:
      'These signals together often mean the person wants to end the interaction or move on. This is one of the hardest social signals to read — it is usually NOT personal.',
    tip: 'If you notice these signals, it is usually fine to wrap up with "Well, I won\'t keep you!" — people generally appreciate the exit.',
  },
];

const scenarioData = [
  {
    id: 1,
    situation:
      'You are working on a group project. A colleague makes an error that will affect the final result. What is usually the best response?',
    options: [
      'A) Send a message to the whole group calling out the mistake',
      'B) Bring it up privately with the colleague in a calm, non-blaming way',
      'C) Fix it yourself without saying anything',
      'D) Report it immediately to your manager',
    ],
    correct: 1,
    explanation:
      'Bringing it up privately (B) is usually best. It solves the problem while preserving the relationship and the other person\'s dignity. Option A risks embarrassing them. Option C might breed resentment or the same mistake happening again. Option D may be appropriate for serious issues, but should not be the first step for a simple mistake.',
  },
  {
    id: 2,
    situation:
      'You receive an invitation to a party but you do not want to go. The host is someone you know and like. What is the most socially appropriate response?',
    options: [
      'A) Ignore the invitation and hope they forget',
      'B) Say yes, then cancel the day before',
      'C) Decline promptly and thank them sincerely for the invitation',
      'D) Give a very detailed explanation of all your reasons for not going',
    ],
    correct: 2,
    explanation:
      'Declining promptly and graciously (C) is the most respectful. It lets the host plan accordingly and keeps the relationship intact. Ignoring it (A) is confusing and rude. Cancelling last minute (B) wastes their planning. A lengthy explanation (D) is usually unnecessary and can feel awkward.',
  },
  {
    id: 3,
    situation:
      'Someone says to you: "We should hang out sometime!" What do they most likely mean?',
    options: [
      'A) They have a specific plan in mind and will send details soon',
      'B) It is a polite phrase that may or may not lead to actual plans',
      'C) They are asking you to organise something right now',
      'D) They are saying this to be polite but do not actually want to meet',
    ],
    correct: 1,
    explanation:
      'This phrase is often a friendly expression of goodwill rather than a concrete invitation (B). If you want it to lead to real plans, you can reply: "I\'d like that! I\'m free on Saturday — would that work for you?" Turning vague phrases into specific suggestions is a great social skill.',
  },
  {
    id: 4,
    situation:
      'Your manager seems unusually stressed and short-tempered today. You need to ask them a question that is not urgent. What is usually the best approach?',
    options: [
      'A) Ask the question immediately because it is your right to get help',
      'B) Send a lengthy email explaining everything you need',
      'C) Wait for a calmer moment or briefly ask "Is now a good time?"',
      'D) Avoid them for the rest of the day',
    ],
    correct: 2,
    explanation:
      'Checking if now is a good time (C) shows emotional awareness and is usually appreciated. People who are stressed often respond better when they feel their state is acknowledged. Non-urgent questions can usually wait a few hours.',
  },
  {
    id: 5,
    situation:
      'During a conversation, the other person keeps interrupting you before you finish your point. What is a good response?',
    options: [
      'A) Stop talking entirely and let them take over',
      'B) Raise your voice to be heard over them',
      'C) Calmly say "Sorry, let me just finish my thought" and continue',
      'D) Interrupt them back to show it is annoying',
    ],
    correct: 2,
    explanation:
      'Assertively but calmly completing your thought (C) is the most effective approach. It sets a boundary without being aggressive. Giving up (A) leaves you unheard. Raising your voice (B) escalates tension. Retaliating (D) usually leads to conflict rather than better communication.',
  },
  {
    id: 6,
    situation:
      'You notice that a friend you have not heard from in a while has posted on social media that they are going through a tough time. What is usually a good response?',
    options: [
      'A) Leave a thumbs-up emoji on the post',
      'B) Comment publicly about similar problems you have had',
      'C) Send them a private message saying you are thinking of them',
      'D) Wait to see how the situation develops before doing anything',
    ],
    correct: 2,
    explanation:
      'A private, caring message (C) is usually the most meaningful. It shows genuine concern without putting them on the spot publicly. A simple "Hey, I saw your post — thinking of you. Here if you want to chat" is enough. You don\'t need to have a solution.',
  },
];

const conversationData = [
  {
    id: 1,
    opener: 'Person: "I just adopted a rescue dog last week!"',
    task: 'Pick the best follow-up response to keep the conversation going.',
    options: [
      'A) "Oh." (and say nothing more)',
      'B) "I don\'t really like dogs."',
      'C) "That\'s great! What kind of dog is it? What have you named them?"',
      'D) "Dogs are a lot of work, you know."',
    ],
    correct: 2,
    explanation:
      'Response C shows genuine interest and asks open-ended follow-up questions — this is the engine of good conversation. The other options close the conversation down or introduce negativity.',
    rule: 'Social rule: Show interest by asking a follow-up question about what the other person just shared.',
  },
  {
    id: 2,
    opener: 'Person: "How was your weekend?"',
    task: 'Pick the most conversationally balanced response.',
    options: [
      'A) "Fine." (end of response)',
      'B) Give a 10-minute detailed account of every activity',
      'C) "It was good, thanks — I visited a museum. How about yours?"',
      'D) "Why do you ask?"',
    ],
    correct: 2,
    explanation:
      'Response C gives a brief, friendly answer and returns the question. This is called "conversational reciprocity" — sharing a little and inviting the other person to share too. One-word answers feel cold; extremely long answers can feel overwhelming.',
    rule: 'Social rule: Brief answer + return the question = balanced small talk.',
  },
  {
    id: 3,
    opener: 'Person: "I\'m really stressed about work lately — my boss keeps changing the deadlines."',
    task: 'What is the best first response?',
    options: [
      'A) "Have you tried making a better schedule?"',
      'B) "That sounds really frustrating. What\'s been going on?"',
      'C) "My job is stressful too, actually..."',
      'D) "At least you have a job!"',
    ],
    correct: 1,
    explanation:
      'When someone shares a problem, the first thing they usually need is to feel heard — not immediately given advice (A), have the topic changed to you (C), or be told it could be worse (D). Response B acknowledges the feeling and invites them to share more.',
    rule: 'Social rule: Acknowledge the feeling first, give advice only if asked.',
  },
  {
    id: 4,
    opener: 'You want to leave a conversation that has been going on for a while.',
    task: 'Pick the most appropriate way to exit.',
    options: [
      'A) Just walk away in the middle of what they are saying',
      'B) Say "I\'m bored now, I\'m going."',
      'C) Give a subtle signal like checking your watch, then say "I should get going — it was great talking with you!"',
      'D) Wait silently until they stop talking, however long it takes',
    ],
    correct: 2,
    explanation:
      'Response C gives a polite, clear signal and ends warmly. Abruptly leaving (A) is considered rude. Being bluntly honest about boredom (B), while not dishonest, is socially jarring. Waiting indefinitely (D) is unnecessary — you are allowed to end conversations.',
    rule: 'Social rule: It is always okay to politely exit a conversation. A closing phrase ("Great talking with you!") signals the conversation is ending.',
  },
  {
    id: 5,
    opener: 'Person: "Can you keep a secret? I want to tell you something."',
    task: 'What is the most careful response before agreeing?',
    options: [
      'A) "Of course, I promise!" (immediately)',
      'B) "Only if it\'s actually interesting."',
      'C) "I\'ll try, but I should mention I can\'t promise to keep it if it involves someone being hurt."',
      'D) "No, I can\'t keep secrets."',
    ],
    correct: 2,
    explanation:
      'Response C is honest and thoughtful. Immediately promising (A) can put you in a difficult situation if the secret involves harm. Option C sets an honest boundary while still being caring. This is often called a "conditional promise" and is the most ethical choice.',
    rule: 'Social rule: You are never obligated to keep a secret that involves someone\'s safety.',
  },
];

const literalData = [
  {
    id: 1,
    phrase: '"It\'s raining cats and dogs outside."',
    options: ['Literal — actual animals are falling', 'Figurative — it is raining very heavily'],
    correct: 1,
    explanation: 'This is a common idiom meaning it is raining very hard. Animals do not actually fall from the sky.',
    category: 'Idiom',
  },
  {
    id: 2,
    phrase: '"Break a leg tonight!"',
    options: ['Literal — break your actual leg', 'Figurative — good luck'],
    correct: 1,
    explanation: 'This is a common expression in theatre and performances meaning "good luck." It is always figurative. No one wants you to actually break a leg.',
    category: 'Idiom',
  },
  {
    id: 3,
    phrase: '"She has butterflies in her stomach before her presentation."',
    options: ['Literal — she swallowed butterflies', 'Figurative — she feels nervous'],
    correct: 1,
    explanation: 'The fluttery feeling of nervousness is often described as "butterflies." It describes the physical sensation of anxiety.',
    category: 'Metaphor',
  },
  {
    id: 4,
    phrase: '"The teacher said the test would be on Friday."',
    options: ['Literal — the test is scheduled for Friday', 'Figurative — meaning something else'],
    correct: 0,
    explanation: 'This is completely literal. When someone states a fact or schedule directly, take it at face value.',
    category: 'Literal',
  },
  {
    id: 5,
    phrase: '"He\'s pulling your leg."',
    options: ['Literal — he is grabbing your leg', 'Figurative — he is joking with you'],
    correct: 1,
    explanation: '"Pulling your leg" means someone is joking or teasing you playfully. It does not involve anyone\'s leg.',
    category: 'Idiom',
  },
  {
    id: 6,
    phrase: '"Could you give me a hand with this?"',
    options: ['Literal — they want your actual hand', 'Figurative — they want your help'],
    correct: 1,
    explanation: '"Give me a hand" almost always means "help me." Very rarely it means literal applause. Context usually makes it clear.',
    category: 'Idiom',
  },
  {
    id: 7,
    phrase: '"The meeting starts at 9am sharp."',
    options: ['Literal — the meeting is at exactly 9:00am', 'Figurative — sometime around 9am'],
    correct: 0,
    explanation: 'The word "sharp" here reinforces the literal time — it means exactly 9:00am, not approximately. Arrive a few minutes early.',
    category: 'Literal',
  },
  {
    id: 8,
    phrase: '"She bit off more than she could chew."',
    options: ['Literal — she took too big a bite of food', 'Figurative — she took on too much responsibility'],
    correct: 1,
    explanation: 'This idiom means someone committed to more tasks or responsibilities than they can handle. Nothing to do with actual food.',
    category: 'Idiom',
  },
];

// ─── Helper: One Game Question ────────────────────────────────────────────────

function QuestionCard({ question, questionIndex, total, onAnswer, answered, selectedIndex, correctIndex }) {
  return (
    <View style={styles.questionCard}>
      <Text style={styles.questionCounter}>Question {questionIndex + 1} of {total}</Text>
      {question.description && <Text style={styles.questionText}>{question.description}</Text>}
      {question.situation && <Text style={styles.questionText}>{question.situation}</Text>}
      {question.opener && (
        <>
          <View style={styles.openerBox}>
            <Text style={styles.openerText}>{question.opener}</Text>
          </View>
          <Text style={styles.taskText}>{question.task}</Text>
        </>
      )}
      {question.phrase && (
        <View style={styles.phraseBox}>
          <Text style={styles.phraseText}>{question.phrase}</Text>
          {question.category && <Text style={styles.categoryTag}>{question.category}</Text>}
        </View>
      )}

      {question.options.map((opt, i) => {
        let bg = '#fff';
        let textColor = '#222';
        if (answered) {
          if (i === correctIndex) { bg = '#dcfce7'; textColor = '#166534'; }
          else if (i === selectedIndex) { bg = '#fee2e2'; textColor = '#991b1b'; }
        }
        return (
          <TouchableOpacity
            key={i}
            style={[styles.optionBtn, { backgroundColor: bg }]}
            onPress={() => !answered && onAnswer(i)}
            disabled={answered}
          >
            <Text style={[styles.optionText, { color: textColor }]}>{opt}</Text>
          </TouchableOpacity>
        );
      })}

      {answered && (
        <View style={[styles.explanationBox, selectedIndex === correctIndex ? styles.explanationCorrect : styles.explanationWrong]}>
          <Text style={styles.explanationTitle}>
            {selectedIndex === correctIndex ? 'Correct!' : 'Not quite — here\'s why:'}
          </Text>
          <Text style={styles.explanationText}>
            {question.explanation || question.rule}
          </Text>
          {question.tip && (
            <Text style={styles.tipText}>Tip: {question.tip}</Text>
          )}
          {question.rule && question.explanation && (
            <Text style={styles.tipText}>{question.rule}</Text>
          )}
        </View>
      )}
    </View>
  );
}

// ─── Generic Game Engine ──────────────────────────────────────────────────────

function GameEngine({ title, subtitle, questions, onBack }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);

  const q = questions[current];
  const correctIndex = q.correct !== undefined ? q.correct : questions[current].options.indexOf(q.answer);

  const handleAnswer = (i) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedIndex(i);
    setAnswered(true);
    if (i === correctIndex) {
      setScore((s) => s + 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setSelectedIndex(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setSelectedIndex(null);
    setAnswered(false);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const feedback =
      pct >= 80
        ? 'Excellent work! You have a strong grasp of this skill.'
        : pct >= 60
        ? 'Good effort! Review the explanations to reinforce the concepts you missed.'
        : 'Keep practising — each round helps build your instincts. The explanations are the most valuable part.';
    return (
      <ScrollView contentContainerStyle={styles.resultContainer}>
        <Text style={styles.resultEmoji}>{pct >= 80 ? '🌟' : pct >= 60 ? '👍' : '💪'}</Text>
        <Text style={styles.resultTitle}>Game Complete!</Text>
        <Text style={styles.resultScore}>{score} / {questions.length} correct ({pct}%)</Text>
        <Text style={styles.resultFeedback}>{feedback}</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleRestart}>
          <Text style={styles.primaryBtnText}>Play Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={onBack}>
          <Text style={styles.secondaryBtnText}>Back to Games</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <TouchableOpacity onPress={onBack} style={styles.backLink}>
        <Text style={styles.backLinkText}>← Back to Games</Text>
      </TouchableOpacity>
      <Text style={styles.gameTitle}>{title}</Text>
      <Text style={styles.gameSubtitle}>{subtitle}</Text>
      <View style={styles.scoreBar}>
        <Text style={styles.scoreText}>Score: {score} / {questions.length}</Text>
      </View>
      <QuestionCard
        question={q}
        questionIndex={current}
        total={questions.length}
        onAnswer={handleAnswer}
        answered={answered}
        selectedIndex={selectedIndex}
        correctIndex={correctIndex}
      />
      {answered && (
        <TouchableOpacity style={styles.primaryBtn} onPress={handleNext}>
          <Text style={styles.primaryBtnText}>
            {current + 1 >= questions.length ? 'See Results' : 'Next Question →'}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

// ─── Games Hub ────────────────────────────────────────────────────────────────

const GAMES = [
  {
    id: 'emotion',
    title: 'Emotion Decoder',
    description: 'Read a description of facial expressions and body language, then identify the emotion.',
    icon: '😊',
    color: '#fef3c7',
    border: '#f59e0b',
    skills: ['Facial expression recognition', 'Body language reading'],
  },
  {
    id: 'scenario',
    title: 'Social Scenario Practice',
    description: 'Given a real-world social situation, choose the most appropriate response.',
    icon: '🤝',
    color: '#ede9fe',
    border: '#8b5cf6',
    skills: ['Social judgment', 'Conflict resolution', 'Relationship skills'],
  },
  {
    id: 'conversation',
    title: 'Conversation Flow',
    description: 'Practise choosing the right responses to keep conversations going smoothly.',
    icon: '💬',
    color: '#dcfce7',
    border: '#22c55e',
    skills: ['Conversation skills', 'Active listening', 'Reciprocity'],
  },
  {
    id: 'literal',
    title: 'Literal vs. Figurative',
    description: 'Identify whether common phrases are meant literally or figuratively.',
    icon: '🔍',
    color: '#e0f2fe',
    border: '#0ea5e9',
    skills: ['Idiom recognition', 'Language comprehension'],
  },
];

export default function MiniGamesScreen() {
  const [activeGame, setActiveGame] = useState(null);

  if (activeGame === 'emotion') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <GameEngine
          title="Emotion Decoder"
          subtitle="Read the description and identify the emotion being shown."
          questions={emotionData.map((q) => ({
            ...q,
            correct: q.options.indexOf(q.answer),
          }))}
          onBack={() => setActiveGame(null)}
        />
      </SafeAreaView>
    );
  }

  if (activeGame === 'scenario') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <GameEngine
          title="Social Scenario Practice"
          subtitle="Choose the most socially appropriate response for each situation."
          questions={scenarioData}
          onBack={() => setActiveGame(null)}
        />
      </SafeAreaView>
    );
  }

  if (activeGame === 'conversation') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <GameEngine
          title="Conversation Flow"
          subtitle="Choose the response that best keeps the conversation going well."
          questions={conversationData}
          onBack={() => setActiveGame(null)}
        />
      </SafeAreaView>
    );
  }

  if (activeGame === 'literal') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <GameEngine
          title="Literal vs. Figurative"
          subtitle="Is the phrase literal or figurative? Read carefully before answering."
          questions={literalData}
          onBack={() => setActiveGame(null)}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text style={styles.hubTitle}>Mini-Games</Text>
        <Text style={styles.hubSubtitle}>
          Interactive games to help build social skills, emotion recognition, and communication skills.
          Each game includes explanations to help you learn as you play.
        </Text>

        {GAMES.map((game) => (
          <TouchableOpacity
            key={game.id}
            style={[styles.gameCard, { backgroundColor: game.color, borderLeftColor: game.border }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setActiveGame(game.id);
            }}
          >
            <Text style={styles.gameIcon}>{game.icon}</Text>
            <View style={styles.gameCardContent}>
              <Text style={styles.gameCardTitle}>{game.title}</Text>
              <Text style={styles.gameCardDesc}>{game.description}</Text>
              <View style={styles.skillsRow}>
                {game.skills.map((s) => (
                  <View key={s} style={[styles.skillChip, { borderColor: game.border }]}>
                    <Text style={[styles.skillChipText, { color: game.border }]}>{s}</Text>
                  </View>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.tipBox}>
          <Text style={styles.tipBoxTitle}>How to use these games</Text>
          <Text style={styles.tipBoxBody}>
            Read each explanation carefully — even when you get the answer right. The "why" behind social rules is often more useful than just memorising the right answer.{'\n\n'}
            You can replay games as many times as you like. Repetition helps build pattern recognition over time.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8f8fc' },

  // Hub
  hubTitle: { fontSize: 26, fontFamily: 'Quicksand_700Bold', color: '#1e1b4b', marginBottom: 8 },
  hubSubtitle: { fontSize: 15, fontFamily: 'Quicksand_400Regular', color: '#555', lineHeight: 22, marginBottom: 24 },
  gameCard: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  gameIcon: { fontSize: 36, marginRight: 14, marginTop: 2 },
  gameCardContent: { flex: 1 },
  gameCardTitle: { fontSize: 17, fontFamily: 'Quicksand_700Bold', color: '#1e1b4b', marginBottom: 4 },
  gameCardDesc: { fontSize: 13, fontFamily: 'Quicksand_400Regular', color: '#444', lineHeight: 19, marginBottom: 8 },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skillChip: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  skillChipText: { fontSize: 11, fontFamily: 'Quicksand_600SemiBold' },
  tipBox: {
    backgroundColor: '#fffbeb',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  tipBoxTitle: { fontFamily: 'Quicksand_700Bold', fontSize: 14, color: '#92400e', marginBottom: 6 },
  tipBoxBody: { fontFamily: 'Quicksand_400Regular', fontSize: 13, color: '#78350f', lineHeight: 20 },

  // Game Engine
  backLink: { marginBottom: 12 },
  backLinkText: { color: '#6366f1', fontFamily: 'Quicksand_600SemiBold', fontSize: 15 },
  gameTitle: { fontSize: 22, fontFamily: 'Quicksand_700Bold', color: '#1e1b4b', marginBottom: 4 },
  gameSubtitle: { fontSize: 14, fontFamily: 'Quicksand_400Regular', color: '#555', marginBottom: 12 },
  scoreBar: {
    backgroundColor: '#ede9fe',
    borderRadius: 8,
    padding: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
    paddingHorizontal: 14,
  },
  scoreText: { fontFamily: 'Quicksand_700Bold', color: '#6366f1', fontSize: 14 },

  // Question Card
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  questionCounter: { fontSize: 12, fontFamily: 'Quicksand_600SemiBold', color: '#9ca3af', marginBottom: 10 },
  questionText: { fontSize: 15, fontFamily: 'Quicksand_500Medium', color: '#1e1b4b', lineHeight: 22, marginBottom: 14 },
  openerBox: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#6366f1',
  },
  openerText: { fontFamily: 'Quicksand_500Medium', fontSize: 14, color: '#1e1b4b', lineHeight: 20, fontStyle: 'italic' },
  taskText: { fontSize: 14, fontFamily: 'Quicksand_500Medium', color: '#444', marginBottom: 14 },
  phraseBox: {
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    alignItems: 'center',
  },
  phraseText: { fontFamily: 'Quicksand_700Bold', fontSize: 17, color: '#1e1b4b', textAlign: 'center', marginBottom: 6 },
  categoryTag: {
    backgroundColor: '#dbeafe',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 11,
    color: '#1d4ed8',
  },
  optionBtn: {
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 13,
    marginBottom: 8,
  },
  optionText: { fontFamily: 'Quicksand_500Medium', fontSize: 14, lineHeight: 20 },
  explanationBox: {
    borderRadius: 10,
    padding: 14,
    marginTop: 8,
  },
  explanationCorrect: { backgroundColor: '#dcfce7' },
  explanationWrong: { backgroundColor: '#fee2e2' },
  explanationTitle: { fontFamily: 'Quicksand_700Bold', fontSize: 14, color: '#1e293b', marginBottom: 6 },
  explanationText: { fontFamily: 'Quicksand_400Regular', fontSize: 13, color: '#334155', lineHeight: 19 },
  tipText: { fontFamily: 'Quicksand_600SemiBold', fontSize: 12, color: '#475569', marginTop: 8, fontStyle: 'italic' },

  // Buttons
  primaryBtn: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryBtnText: { color: '#fff', fontFamily: 'Quicksand_700Bold', fontSize: 16 },
  secondaryBtn: {
    borderWidth: 1.5,
    borderColor: '#6366f1',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  secondaryBtnText: { color: '#6366f1', fontFamily: 'Quicksand_700Bold', fontSize: 15 },

  // Results
  resultContainer: { padding: 24, paddingBottom: 60, alignItems: 'center' },
  resultEmoji: { fontSize: 56, marginBottom: 12 },
  resultTitle: { fontSize: 26, fontFamily: 'Quicksand_700Bold', color: '#1e1b4b', marginBottom: 6 },
  resultScore: { fontSize: 20, fontFamily: 'Quicksand_700Bold', color: '#6366f1', marginBottom: 16 },
  resultFeedback: { fontSize: 15, fontFamily: 'Quicksand_400Regular', color: '#555', textAlign: 'center', lineHeight: 22, marginBottom: 28, paddingHorizontal: 16 },
});
