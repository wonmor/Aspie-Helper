import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView,
} from 'react-native';
import * as Haptics from 'expo-haptics';

// ─── Quiz Data ────────────────────────────────────────────────────────────────

const asdKnowledgeQuiz = {
  title: 'Understanding ASD & Asperger\'s',
  description:
    'Test your knowledge about Autism Spectrum Disorder and Asperger\'s Syndrome. Learn key facts supported by current research.',
  icon: '🧠',
  color: '#ede9fe',
  border: '#8b5cf6',
  questions: [
    {
      question: 'What does ASD stand for?',
      options: ['Attention Seeking Disorder', 'Autism Spectrum Disorder', 'Adaptive Sensory Difference', 'Auditory System Dysregulation'],
      correct: 1,
      fact: 'ASD (Autism Spectrum Disorder) is the current diagnostic term used in the DSM-5 (2013). Asperger\'s Syndrome was a separate diagnosis in DSM-4 but is now considered part of the autism spectrum.',
    },
    {
      question: 'Approximately how many people are on the autism spectrum worldwide?',
      options: ['1 in 1,000', '1 in 500', '1 in 100', '1 in 36'],
      correct: 3,
      fact: 'The CDC\'s 2023 data estimates 1 in 36 children in the US is diagnosed with ASD — up from 1 in 44 just a few years ago. This increase is largely attributed to broader diagnostic criteria and greater awareness.',
    },
    {
      question: 'What is "masking" in the context of ASD?',
      options: [
        'Wearing a mask to avoid sensory issues',
        'Consciously suppressing or hiding autistic traits to appear neurotypical',
        'A therapy technique for managing meltdowns',
        'Using a facial covering to reduce sensory input',
      ],
      correct: 1,
      fact: 'Masking is the effortful, often exhausting process of hiding or suppressing autistic behaviours to fit into neurotypical social environments. It is especially common in women and girls and can lead to burnout and mental health challenges.',
    },
    {
      question: 'Which of the following is NOT typically associated with Asperger\'s / High-Functioning Autism?',
      options: ['Deep focus on specific interests', 'Intellectual disability', 'Difficulty with social communication', 'Sensory sensitivities'],
      correct: 1,
      fact: 'People with Asperger\'s Syndrome typically have average to above-average intelligence. Intellectual disability is NOT part of the Asperger\'s profile. This distinguishes it from some other forms of autism.',
    },
    {
      question: 'What is "stimming"?',
      options: [
        'A negative behaviour that should always be stopped',
        'Repetitive sensory behaviours used for self-regulation and expression',
        'A medical treatment for ASD',
        'Stimulating conversation skills training',
      ],
      correct: 1,
      fact: 'Stimming (self-stimulatory behaviour) includes rocking, hand-flapping, humming, or other repetitive actions. Stimming serves important functions: sensory regulation, expressing emotions, and managing anxiety. It should only be addressed if it causes harm.',
    },
    {
      question: 'What is "Theory of Mind" in relation to ASD?',
      options: [
        'A theory about how ASD develops',
        'The ability to understand that others have different thoughts, beliefs, and perspectives',
        'A type of CBT therapy for autism',
        'The scientific study of autistic intelligence',
      ],
      correct: 1,
      fact: 'Theory of Mind (ToM) refers to the ability to understand that other people have different knowledge, beliefs, and feelings than your own. Some autistic people find this more effortful, which affects social interaction — but ToM can be learned and improved.',
    },
    {
      question: 'Which statement about special interests in ASD is most accurate?',
      options: [
        'Special interests are a symptom to be reduced',
        'Special interests are only about trains and dinosaurs',
        'Special interests can be powerful strengths and sources of joy, identity, and career success',
        'Special interests disappear in adulthood',
      ],
      correct: 2,
      fact: 'Special interests (or "hyperfocuses") are a core part of autistic identity for many people. They can lead to deep expertise, bring immense joy, support mental health, and even lead to successful careers. They deserve celebration, not pathologisation.',
    },
    {
      question: 'What is "executive function"?',
      options: [
        'The ability to work with senior executives',
        'The cognitive ability to plan, organise, manage time, and shift attention',
        'Running and physical exercise',
        'A specific type of memory recall',
      ],
      correct: 1,
      fact: 'Executive function involves planning, organising, prioritising, managing time, switching tasks, and regulating impulses. Many autistic people have executive function differences, which can look like disorganisation, "laziness," or difficulty starting tasks — but are neurological, not character flaws.',
    },
    {
      question: 'What is autistic burnout?',
      options: [
        'Being too engaged in a special interest',
        'A temporary bad mood',
        'Chronic exhaustion, reduced functioning, and loss of skills caused by prolonged masking and stress',
        'Getting too much sun',
      ],
      correct: 2,
      fact: 'Autistic burnout is a serious state of physical and mental exhaustion often caused by long-term masking, sensory overload, or insufficient support. It can last months or years. Recovery typically requires significant rest and reduction of demands.',
    },
    {
      question: 'The neurodiversity model of autism suggests:',
      options: [
        'Autism is a disease that needs to be cured',
        'Autistic brains are simply different, not defective — diversity in brain types benefits society',
        'Autistic people cannot live independently',
        'ASD only affects children',
      ],
      correct: 1,
      fact: 'The neurodiversity movement, pioneered by autistic advocates, frames autism as a natural variation in human neurology — not a disorder to be fixed. This model focuses on accommodation, accessibility, and celebrating strengths rather than "normalising" autistic people.',
    },
  ],
};

const sensoryProfileQuiz = {
  title: 'Sensory Profile Self-Assessment',
  description:
    'Explore your personal sensory sensitivities. This is not a diagnostic tool — it is a self-awareness exercise to help you understand your sensory needs.',
  icon: '🎯',
  color: '#fef3c7',
  border: '#f59e0b',
  questions: [
    {
      question: 'How do you usually respond to loud, unexpected noises (e.g. alarms, shouting)?',
      options: [
        'I barely notice them',
        'I notice them but it does not bother me much',
        'I find them quite startling or unpleasant',
        'They cause me significant distress or pain',
      ],
      sensoryType: 'Auditory',
    },
    {
      question: 'How do you feel in busy, crowded environments (e.g. shopping centres, parties)?',
      options: [
        'I enjoy the energy — more stimulation is better',
        'I\'m comfortable for a while then need a break',
        'I find them draining and overwhelming quite quickly',
        'I avoid them whenever possible — they cause anxiety or distress',
      ],
      sensoryType: 'Social/Environmental',
    },
    {
      question: 'How do you react to certain clothing textures (e.g. tags, wool, tight waistbands)?',
      options: [
        'I never think about it',
        'Sometimes a texture is slightly uncomfortable',
        'Certain textures bother me enough that I avoid those clothes',
        'Clothing textures can cause significant discomfort and are a daily concern',
      ],
      sensoryType: 'Tactile',
    },
    {
      question: 'How do bright lights or fluorescent lighting affect you?',
      options: [
        'No effect at all',
        'Slightly uncomfortable after a long time',
        'I find bright or flickering lights distracting and draining',
        'Bright lights can cause headaches, eye pain, or shutdown',
      ],
      sensoryType: 'Visual',
    },
    {
      question: 'How sensitive are you to strong smells (e.g. perfume, cleaning products, food)?',
      options: [
        'I barely notice smells',
        'Some smells are pleasant or unpleasant but don\'t affect my functioning',
        'Strong smells are distracting and can make me feel ill',
        'Certain smells cause immediate strong physical or emotional reactions',
      ],
      sensoryType: 'Olfactory',
    },
    {
      question: 'How do you feel about physical touch from other people (e.g. hugs, handshakes, accidental touching)?',
      options: [
        'I enjoy physical touch and seek it out',
        'Touch is fine in most contexts',
        'Unexpected touch is startling; I need to be prepared for it',
        'Most physical touch is uncomfortable or I actively avoid it',
      ],
      sensoryType: 'Tactile',
    },
    {
      question: 'How do you respond to certain food textures, temperatures, or tastes?',
      options: [
        'I eat almost anything without issues',
        'Some foods are unpleasant but I can manage',
        'Food textures/tastes strongly influence what I can eat comfortably',
        'I have a very limited safe food list due to sensory sensitivities',
      ],
      sensoryType: 'Gustatory/Oral',
    },
    {
      question: 'Do you seek out certain sensory experiences (e.g. rocking, spinning, fidgeting, pressure)?',
      options: [
        'No — I rarely seek sensory input',
        'Occasionally, when stressed',
        'Yes — regularly and it helps me regulate',
        'Yes — sensory seeking is a significant part of how I manage',
      ],
      sensoryType: 'Proprioceptive',
    },
    {
      question: 'How do you cope with multiple sensory inputs at once (e.g. background noise + bright lights + conversation)?',
      options: [
        'No difficulty at all',
        'Slightly harder to concentrate',
        'I can manage but it takes significant effort and energy',
        'Multiple inputs quickly lead to overload and I need to withdraw',
      ],
      sensoryType: 'Multisensory',
    },
    {
      question: 'After a highly stimulating day, how do you typically feel?',
      options: [
        'Fine — ready to go again',
        'A little tired, but a normal night\'s sleep restores me',
        'Very drained — I need quiet and alone time to recover',
        'Completely depleted — it may take days to recover fully',
      ],
      sensoryType: 'Recovery',
    },
  ],
};

const socialSkillsQuiz = {
  title: 'Social Situations Knowledge Check',
  description:
    'Test your understanding of common social norms and unwritten rules. Many of these are not obvious — they are simply conventions that neurotypical society has agreed on.',
  icon: '🗣️',
  color: '#dcfce7',
  border: '#22c55e',
  questions: [
    {
      question: 'When someone asks "How are you?" in passing, what do they usually expect?',
      options: [
        'An honest, detailed account of your current wellbeing',
        'A brief positive response ("Good, thanks! You?") regardless of how you actually feel',
        'A medical update',
        'A shrug and no response',
      ],
      correct: 1,
      fact: 'In most English-speaking cultures, "How are you?" in a casual context is a greeting ritual, not a literal enquiry into your health. A brief positive response and returning the question is standard. This can feel dishonest to many autistic people — and that instinct is understandable — but it helps social flow.',
    },
    {
      question: 'At a party where you know only the host, what is a good way to start a conversation with a stranger?',
      options: [
        'Ask them a detailed personal question immediately',
        'Stand near them and wait for them to speak first',
        'Make a simple observation or ask an easy question about the shared environment',
        'Tell them about your special interest in detail',
      ],
      correct: 2,
      fact: 'Simple, low-pressure openers work best: "How do you know [host\'s name]?" or "Have you tried the food? It\'s really good." These are easy to answer and create a shared conversational starting point.',
    },
    {
      question: 'A new acquaintance says "We should get coffee sometime!" What is the most likely meaning?',
      options: [
        'They want coffee right now',
        'They are making a firm commitment',
        'A friendly expression of goodwill that may or may not lead to actual plans',
        'They are testing whether you like coffee',
      ],
      correct: 2,
      fact: 'Vague future plans ("we should hang out / get coffee / catch up") are social pleasantries in many cultures. If you want it to become real, you can say: "I\'d like that! How does Saturday work for you?" Being concrete turns pleasantries into actual plans.',
    },
    {
      question: 'During a conversation, appropriate eye contact in Western cultures typically means:',
      options: [
        'Staring intensely without breaking contact',
        'Never making eye contact to show you\'re thinking',
        'Looking at the person most of the time while listening, breaking contact occasionally',
        'Exactly 3 seconds of eye contact per minute',
      ],
      correct: 2,
      fact: 'There is no perfect formula for eye contact. In most Western contexts, more eye contact while listening than while speaking is considered attentive. Looking away periodically is normal. Many autistic people find eye contact difficult — looking at the nose or mouth is a common workaround.',
    },
    {
      question: 'Someone is telling a long, boring story. What is the most polite response?',
      options: [
        'Tell them the story is boring',
        'Walk away mid-story',
        'Maintain a neutral attentive expression and wait for a natural pause to redirect',
        'Pull out your phone',
      ],
      correct: 2,
      fact: 'Social conventions generally expect you to listen politely until a natural break, then you can steer the conversation. It feels dishonest to some autistic people — but being polite in this context is about managing the interaction with minimal harm to the relationship.',
    },
    {
      question: 'You receive a gift you don\'t like. What is the socially standard response?',
      options: [
        '"This isn\'t really my style."',
        'Say nothing',
        '"Thank you, that\'s so kind of you!" and express genuine gratitude for the gesture',
        'Ask for the receipt immediately',
      ],
      correct: 2,
      fact: 'The social convention is to thank the giver for the gesture and thought, not to evaluate the gift itself. The giver\'s intent was kindness — acknowledging that is considered polite. This is one of the social white lies most cultures accept.',
    },
    {
      question: 'When is it usually appropriate to disagree with someone at a social gathering?',
      options: [
        'Always — honesty is the best policy in every situation',
        'Never — always agree to avoid conflict',
        'When the topic matters, using "I" statements calmly ("I see it differently because...")',
        'Only if you have documents to back up your claim',
      ],
      correct: 2,
      fact: 'Disagreement is fine in social settings, especially about ideas, topics, or preferences. The key is HOW: calm tone, "I" statements, and a willingness to hear the other perspective. Vigorous argument at a casual gathering is generally considered inappropriate.',
    },
    {
      question: 'What does it typically mean when someone says "I\'m fine" but their body language suggests otherwise?',
      options: [
        'They are definitely fine — trust their words',
        'There might be a discrepancy — they may not want to discuss it but could appreciate acknowledgment',
        'They are angry at you specifically',
        'You should immediately ask "Are you SURE you\'re fine?"',
      ],
      correct: 1,
      fact: 'When verbal and non-verbal signals conflict, body language is often the more accurate signal. A simple "You seem a bit down today — I\'m here if you want to chat" can be enough. Many people say "I\'m fine" because they don\'t want to burden others.',
    },
  ],
};

// ─── Sensory Profile Scoring ─────────────────────────────────────────────────

function getSensoryProfile(answers) {
  if (!answers || answers.length < 10) return null;
  const totalScore = answers.reduce((sum, a) => sum + a, 0);
  const maxScore = answers.length * 3;
  const pct = (totalScore / maxScore) * 100;

  const profile = [];

  if (pct >= 70) {
    profile.push({
      type: 'High Sensory Sensitivity',
      desc: 'You appear to be significantly sensitive to sensory input across multiple channels. You likely benefit from quiet spaces, predictable environments, noise-cancelling tools, and regular sensory "recovery" time.',
      suggestions: ['Noise-cancelling headphones in busy environments', 'Sensory kit (fidget tools, sunglasses)', 'Build in regular alone-time to recharge', 'Communicate your needs to people you trust'],
      color: '#fee2e2',
      textColor: '#991b1b',
    });
  } else if (pct >= 40) {
    profile.push({
      type: 'Moderate Sensory Sensitivity',
      desc: 'You have some sensory sensitivities but can typically manage them in most contexts. You may find certain environments draining and benefit from having coping strategies ready.',
      suggestions: ['Notice your own patterns — which situations drain you most?', 'Have an exit strategy for overwhelming environments', 'Don\'t push through overload — rest early is better than burnout'],
      color: '#fef3c7',
      textColor: '#92400e',
    });
  } else {
    profile.push({
      type: 'Lower Sensory Sensitivity / Sensory Seeking',
      desc: 'You may be less sensitive to sensory input, or you may actually seek sensory stimulation. Some autistic people are hypo-sensitive (under-reactive) rather than hyper-sensitive.',
      suggestions: ['Weighted blankets or compression clothing can provide grounding input', 'Physical movement and exercise may help with regulation', 'Chewing, fidgeting, or textured objects can provide helpful sensory input'],
      color: '#dcfce7',
      textColor: '#166534',
    });
  }

  return { profile, pct, totalScore, maxScore };
}

// ─── Knowledge Quiz Engine ────────────────────────────────────────────────────

function KnowledgeQuiz({ quiz, onBack }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);

  const q = quiz.questions[current];

  const handleAnswer = (i) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelected(i);
    setAnswered(true);
    if (i === q.correct) {
      setScore((s) => s + 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleNext = () => {
    if (current + 1 >= quiz.questions.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / quiz.questions.length) * 100);
    return (
      <ScrollView contentContainerStyle={styles.resultContainer}>
        <Text style={styles.resultEmoji}>{pct >= 80 ? '🌟' : pct >= 60 ? '👍' : '📚'}</Text>
        <Text style={styles.resultTitle}>Quiz Complete!</Text>
        <Text style={styles.resultScore}>{score} / {quiz.questions.length} ({pct}%)</Text>
        <Text style={styles.resultFeedback}>
          {pct >= 80
            ? 'Excellent! You have a strong understanding of this topic.'
            : pct >= 60
            ? 'Good effort! Review the explanations for the questions you missed.'
            : 'Keep learning — re-reading the explanations is the most valuable part of this quiz.'}
        </Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleRestart}>
          <Text style={styles.primaryBtnText}>Retry Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={onBack}>
          <Text style={styles.secondaryBtnText}>Back to Quizzes</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <TouchableOpacity onPress={onBack} style={styles.backLink}>
        <Text style={styles.backLinkText}>← Back to Quizzes</Text>
      </TouchableOpacity>
      <Text style={styles.quizTitle}>{quiz.title}</Text>
      <View style={styles.progressRow}>
        <Text style={styles.progressText}>Question {current + 1} of {quiz.questions.length}</Text>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${((current) / quiz.questions.length) * 100}%` }]} />
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{q.question}</Text>
        {q.options.map((opt, i) => {
          let bg = '#fff';
          let textColor = '#222';
          let border = '#e5e7eb';
          if (answered) {
            if (i === q.correct) { bg = '#dcfce7'; textColor = '#166534'; border = '#22c55e'; }
            else if (i === selected) { bg = '#fee2e2'; textColor = '#991b1b'; border = '#ef4444'; }
          }
          return (
            <TouchableOpacity
              key={i}
              style={[styles.optionBtn, { backgroundColor: bg, borderColor: border }]}
              onPress={() => !answered && handleAnswer(i)}
              disabled={answered}
            >
              <Text style={[styles.optionText, { color: textColor }]}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
        {answered && q.fact && (
          <View style={[styles.factBox, selected === q.correct ? styles.factCorrect : styles.factWrong]}>
            <Text style={styles.factTitle}>{selected === q.correct ? '✓ Correct!' : '✗ Not quite'}</Text>
            <Text style={styles.factText}>{q.fact}</Text>
          </View>
        )}
      </View>

      {answered && (
        <TouchableOpacity style={styles.primaryBtn} onPress={handleNext}>
          <Text style={styles.primaryBtnText}>
            {current + 1 >= quiz.questions.length ? 'See Results' : 'Next →'}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

// ─── Sensory Profile Quiz Engine ──────────────────────────────────────────────

function SensoryProfileQuiz({ quiz, onBack }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);

  const q = quiz.questions[current];

  const handleAnswer = (i) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(i);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    if (current + 1 >= quiz.questions.length) {
      setAnswers(newAnswers);
      setDone(true);
    } else {
      setAnswers(newAnswers);
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setDone(false);
  };

  if (done) {
    const result = getSensoryProfile(answers);
    const p = result.profile[0];
    return (
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        <TouchableOpacity onPress={onBack} style={styles.backLink}>
          <Text style={styles.backLinkText}>← Back to Quizzes</Text>
        </TouchableOpacity>
        <Text style={styles.quizTitle}>Your Sensory Profile</Text>

        <View style={[styles.profileCard, { backgroundColor: p.color, borderColor: p.textColor }]}>
          <Text style={[styles.profileType, { color: p.textColor }]}>{p.type}</Text>
          <Text style={[styles.profileDesc, { color: p.textColor }]}>{p.desc}</Text>
        </View>

        <Text style={styles.suggestionsTitle}>Strategies to consider:</Text>
        {p.suggestions.map((s, i) => (
          <View key={i} style={styles.suggestionRow}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.suggestionText}>{s}</Text>
          </View>
        ))}

        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>
            This is a self-reflection tool, not a clinical assessment. For a formal sensory profile assessment, consult an occupational therapist who specialises in sensory processing.
          </Text>
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={handleRestart}>
          <Text style={styles.primaryBtnText}>Retake Assessment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={onBack}>
          <Text style={styles.secondaryBtnText}>Back to Quizzes</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <TouchableOpacity onPress={onBack} style={styles.backLink}>
        <Text style={styles.backLinkText}>← Back to Quizzes</Text>
      </TouchableOpacity>
      <Text style={styles.quizTitle}>{quiz.title}</Text>
      <View style={styles.progressRow}>
        <Text style={styles.progressText}>Question {current + 1} of {quiz.questions.length}</Text>
        <View style={[styles.sensoryTypeBadge]}>
          <Text style={styles.sensoryTypeText}>{q.sensoryType}</Text>
        </View>
      </View>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${(current / quiz.questions.length) * 100}%` }]} />
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{q.question}</Text>
        {q.options.map((opt, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.optionBtn, selected === i && styles.optionSelected]}
            onPress={() => handleAnswer(i)}
          >
            <Text style={[styles.optionText, selected === i && styles.optionTextSelected]}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.primaryBtn, selected === null && styles.primaryBtnDisabled]}
        onPress={handleNext}
        disabled={selected === null}
      >
        <Text style={styles.primaryBtnText}>
          {current + 1 >= quiz.questions.length ? 'See My Profile' : 'Next →'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ─── Quiz Hub ─────────────────────────────────────────────────────────────────

const QUIZZES = [asdKnowledgeQuiz, sensoryProfileQuiz, socialSkillsQuiz];

export default function QuizzesScreen() {
  const [activeQuiz, setActiveQuiz] = useState(null);

  if (activeQuiz === asdKnowledgeQuiz) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <KnowledgeQuiz quiz={asdKnowledgeQuiz} onBack={() => setActiveQuiz(null)} />
      </SafeAreaView>
    );
  }

  if (activeQuiz === sensoryProfileQuiz) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <SensoryProfileQuiz quiz={sensoryProfileQuiz} onBack={() => setActiveQuiz(null)} />
      </SafeAreaView>
    );
  }

  if (activeQuiz === socialSkillsQuiz) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <KnowledgeQuiz quiz={socialSkillsQuiz} onBack={() => setActiveQuiz(null)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text style={styles.hubTitle}>Quizzes</Text>
        <Text style={styles.hubSubtitle}>
          Knowledge checks and self-assessments to help you understand ASD, your own sensory profile, and social conventions.
        </Text>

        {QUIZZES.map((quiz, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.quizCard, { backgroundColor: quiz.color, borderLeftColor: quiz.border }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setActiveQuiz(quiz);
            }}
          >
            <Text style={styles.quizCardIcon}>{quiz.icon}</Text>
            <View style={styles.quizCardContent}>
              <Text style={styles.quizCardTitle}>{quiz.title}</Text>
              <Text style={styles.quizCardDesc}>{quiz.description}</Text>
              <Text style={styles.quizCardMeta}>{quiz.questions.length} questions</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.noteBox}>
          <Text style={styles.noteTitle}>Important note</Text>
          <Text style={styles.noteText}>
            The quizzes and assessments in this app are educational and self-reflection tools only. They are not diagnostic instruments and cannot diagnose or rule out ASD. For a formal assessment, please consult a qualified psychologist or psychiatrist.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8f8fc' },

  hubTitle: { fontSize: 26, fontFamily: 'Quicksand_700Bold', color: '#1e1b4b', marginBottom: 8 },
  hubSubtitle: { fontSize: 15, fontFamily: 'Quicksand_400Regular', color: '#555', lineHeight: 22, marginBottom: 24 },
  quizCard: {
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
  quizCardIcon: { fontSize: 36, marginRight: 14, marginTop: 2 },
  quizCardContent: { flex: 1 },
  quizCardTitle: { fontSize: 17, fontFamily: 'Quicksand_700Bold', color: '#1e1b4b', marginBottom: 4 },
  quizCardDesc: { fontSize: 13, fontFamily: 'Quicksand_400Regular', color: '#444', lineHeight: 19, marginBottom: 6 },
  quizCardMeta: { fontSize: 12, fontFamily: 'Quicksand_600SemiBold', color: '#888' },
  noteBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  noteTitle: { fontFamily: 'Quicksand_700Bold', fontSize: 14, color: '#1e40af', marginBottom: 6 },
  noteText: { fontFamily: 'Quicksand_400Regular', fontSize: 13, color: '#1d4ed8', lineHeight: 20 },

  // Quiz Engine
  backLink: { marginBottom: 12 },
  backLinkText: { color: '#6366f1', fontFamily: 'Quicksand_600SemiBold', fontSize: 15 },
  quizTitle: { fontSize: 20, fontFamily: 'Quicksand_700Bold', color: '#1e1b4b', marginBottom: 12 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  progressText: { fontFamily: 'Quicksand_500Medium', fontSize: 13, color: '#888' },
  scoreText: { fontFamily: 'Quicksand_700Bold', fontSize: 13, color: '#6366f1' },
  progressBarBg: { height: 6, backgroundColor: '#e5e7eb', borderRadius: 3, marginBottom: 16 },
  progressBarFill: { height: 6, backgroundColor: '#6366f1', borderRadius: 3 },
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
  questionText: { fontSize: 16, fontFamily: 'Quicksand_600SemiBold', color: '#1e1b4b', lineHeight: 23, marginBottom: 16 },
  optionBtn: {
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 13,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  optionSelected: { borderColor: '#6366f1', backgroundColor: '#ede9fe' },
  optionText: { fontFamily: 'Quicksand_500Medium', fontSize: 14, color: '#222', lineHeight: 20 },
  optionTextSelected: { color: '#4338ca' },
  factBox: { borderRadius: 10, padding: 14, marginTop: 8 },
  factCorrect: { backgroundColor: '#dcfce7' },
  factWrong: { backgroundColor: '#fee2e2' },
  factTitle: { fontFamily: 'Quicksand_700Bold', fontSize: 14, color: '#1e293b', marginBottom: 6 },
  factText: { fontFamily: 'Quicksand_400Regular', fontSize: 13, color: '#334155', lineHeight: 19 },

  // Sensory profile result
  sensoryTypeBadge: { backgroundColor: '#fef3c7', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 3 },
  sensoryTypeText: { fontFamily: 'Quicksand_600SemiBold', fontSize: 12, color: '#92400e' },
  profileCard: { borderRadius: 14, padding: 18, marginBottom: 20, borderWidth: 1.5 },
  profileType: { fontSize: 18, fontFamily: 'Quicksand_700Bold', marginBottom: 8 },
  profileDesc: { fontSize: 14, fontFamily: 'Quicksand_400Regular', lineHeight: 21 },
  suggestionsTitle: { fontSize: 16, fontFamily: 'Quicksand_700Bold', color: '#1e1b4b', marginBottom: 12 },
  suggestionRow: { flexDirection: 'row', marginBottom: 8, paddingRight: 8 },
  bulletDot: { fontSize: 18, color: '#6366f1', marginRight: 8, lineHeight: 22 },
  suggestionText: { flex: 1, fontFamily: 'Quicksand_400Regular', fontSize: 14, color: '#333', lineHeight: 21 },
  disclaimerBox: {
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 14,
    marginTop: 4,
    marginBottom: 20,
  },
  disclaimerText: { fontFamily: 'Quicksand_400Regular', fontSize: 13, color: '#64748b', lineHeight: 19, fontStyle: 'italic' },

  // Buttons
  primaryBtn: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryBtnDisabled: { backgroundColor: '#c4b5fd' },
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
