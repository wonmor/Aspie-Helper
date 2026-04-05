import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView,
} from 'react-native';
import * as Haptics from 'expo-haptics';

// ─── Technique Content ────────────────────────────────────────────────────────

const techniques = [
  {
    id: 'cbt',
    title: 'Cognitive Behavioural Therapy (CBT)',
    subtitle: 'Changing unhelpful thought patterns',
    icon: '🧩',
    color: '#ede9fe',
    border: '#8b5cf6',
    summary:
      'CBT is one of the most evidence-based therapies for ASD-related anxiety, depression, and anger management. It teaches you to identify and challenge unhelpful thoughts.',
    sections: [
      {
        heading: 'What is CBT?',
        body: `Cognitive Behavioural Therapy (CBT) is a structured, practical therapy that explores the connection between your thoughts, feelings, and behaviours. The central idea is that our thoughts about a situation — not the situation itself — drive how we feel and act.

For example:
• Situation: A friend doesn't reply to your message.
• Unhelpful thought: "They hate me. I always say the wrong thing."
• Feeling: Anxiety, shame.
• Behaviour: Avoid them next time.

CBT teaches you to notice these automatic thought patterns and test whether they are accurate.`,
      },
      {
        heading: 'CBT adapted for ASD',
        body: `Standard CBT has been adapted to be more effective for autistic people:

• More visual and concrete: Instead of abstract emotional exploration, adapted CBT uses worksheets, diagrams, and structured formats.
• Explicit rule teaching: Social rules and expected behaviours are explained directly rather than assumed.
• Emotion education: Building vocabulary for feelings before exploring them.
• Special interests integration: Therapy themes can be connected to a person's interests for better engagement.
• Longer timelines: Adapted CBT often runs longer to allow for processing.`,
      },
      {
        heading: 'Core CBT tools you can use now',
        body: `1. Thought Record
Write down: What happened? What did I think? How did I feel? What is the evidence FOR this thought? What is the evidence AGAINST? What is a more balanced thought?

2. Cognitive Distortions Checklist
• All-or-nothing thinking: "I always fail at this."
• Mind-reading: "I know they're judging me."
• Catastrophising: "If I make a mistake, it will be a disaster."
• Personalisation: "It's my fault they're in a bad mood."

3. Behavioural Experiments
Test your predictions. If you think "If I speak up, everyone will laugh at me" — note that prediction, then try it and record what actually happened.

4. Worry Time
Designate 15 minutes per day as 'worry time'. If worries come outside that window, write them down and postpone them. This prevents worry from dominating the day.`,
      },
      {
        heading: 'Finding a CBT therapist',
        body: `Look for a therapist who:
• Has experience working with autistic adults or adolescents
• Uses adapted CBT protocols (not just standard adult CBT)
• Communicates directly and explains the rationale for each exercise
• Is willing to adjust their style to your communication preferences

Ask in the initial consultation: "Do you have experience adapting CBT for autistic people?" A good therapist will welcome this question.`,
      },
    ],
  },
  {
    id: 'dbt',
    title: 'Dialectical Behaviour Therapy (DBT)',
    subtitle: 'Emotion regulation and distress tolerance',
    icon: '⚖️',
    color: '#dcfce7',
    border: '#22c55e',
    summary:
      'DBT is a structured skills programme focused on four key areas: mindfulness, emotion regulation, distress tolerance, and interpersonal effectiveness.',
    sections: [
      {
        heading: 'What is DBT?',
        body: `DBT was developed by Dr Marsha Linehan originally for people with intense emotional experiences. It has since been adapted for ASD and is particularly useful for:
• Intense emotional reactions (meltdowns, shutdowns)
• Impulsive behaviour
• Relationship difficulties
• Self-harm or crisis behaviour
• Emotional dysregulation

DBT teaches specific, learnable skills organised into four modules.`,
      },
      {
        heading: 'Module 1: Mindfulness',
        body: `The foundation of all DBT skills. Mindfulness means observing your thoughts and feelings without judgment, in the present moment.

Key skills:
• Observe: Notice your experience without reacting. "I notice I am feeling overwhelmed."
• Describe: Put words to what you observe. "My heart is racing. My thoughts are moving very fast."
• Participate: Fully engage in current activity without self-consciousness.
• Non-judgmentally: Describe facts, not evaluations. Not "I'm being stupid" but "I made an error."
• One-mindfully: Do one thing at a time, with full attention.`,
      },
      {
        heading: 'Module 2: Distress Tolerance',
        body: `Skills for managing crisis moments without making things worse.

TIPP skills (for rapid calm):
• Temperature: Splash cold water on your face to activate the dive response.
• Intense exercise: 20 minutes of aerobic exercise burns off stress hormones.
• Paced breathing: Breathe out longer than you breathe in (e.g. inhale 4 sec, exhale 6 sec).
• Progressive muscle relaxation: Tense and release muscle groups systematically.

ACCEPTS (distraction skills):
Activities, Contributing, Comparisons, Emotions (opposite), Pushing away, Thoughts (distraction), Sensations.

Self-soothe: Identify one pleasant input for each sense — visual, auditory, touch, taste, smell, movement.`,
      },
      {
        heading: 'Module 3: Emotion Regulation',
        body: `Skills to understand and reduce emotional intensity.

Check the facts: Ask "Does my emotional response fit the actual facts, or am I reacting to an interpretation?"

Opposite action: If your emotion is urging you to do something (anger → confront, shame → withdraw) — deliberately do the opposite when the emotion is unjustified.

PLEASE skills (physical wellbeing):
• treat PhysicaL illness
• Eat balanced meals
• Avoid mood-altering substances
• Sleep regular hours
• Exercise regularly

Build Mastery: Do one thing each day that makes you feel competent.

Build Positive Experiences: Actively schedule pleasant events — positive emotions need to be built, they don't just happen.`,
      },
      {
        heading: 'Module 4: Interpersonal Effectiveness',
        body: `Scripts and strategies for navigating relationships.

DEAR MAN (asking for what you need):
• Describe the situation factually
• Express how you feel ("I feel...")
• Assert what you want or need clearly
• Reinforce — explain the benefit to them too
• Mindful — stay focused on your goal
• Appear confident even if nervous
• Negotiate — be willing to find a middle ground

GIVE (keeping relationships):
• Gentle — no attacks or criticism
• Interested — listen actively
• Validate — acknowledge their perspective
• Easy manner — use a light touch

FAST (self-respect):
• Fair to yourself and others
• no Apologies for having needs
• Stick to your values
• Truthful`,
      },
    ],
  },
  {
    id: 'social_stories',
    title: 'Social Stories',
    subtitle: 'Learning social situations through narrative',
    icon: '📖',
    color: '#fef3c7',
    border: '#f59e0b',
    summary:
      'Social Stories are short, personalised narratives that describe a social situation from multiple perspectives, helping autistic people understand expectations and context.',
    sections: [
      {
        heading: 'What are Social Stories?',
        body: `Social Stories were developed by Carol Gray in 1990. They are short, carefully written narratives that:
• Describe a specific social situation in clear, concrete terms
• Explain what typically happens and why
• Include the perspectives of others involved
• Suggest appropriate responses or behaviours
• Are written in first person and tailored to the individual

They work by making implicit social knowledge explicit — converting the invisible social script into readable text.`,
      },
      {
        heading: 'Who are they for?',
        body: `While originally developed for children, Social Stories are used across all ages. They are particularly helpful when:
• A new or confusing social situation is coming up (first day at work, medical appointment, party)
• A recurring situation causes consistent distress
• You want to understand why others behave a certain way
• You are preparing for a difficult conversation
• You want to practise a social interaction before it happens`,
      },
      {
        heading: 'How to write your own Social Story',
        body: `A good Social Story has these sentence types in roughly this ratio:
• Descriptive (what happens): Most sentences. Factual, objective.
• Perspective (why/how others feel): About 1 in 4 sentences.
• Directive (what I can do): Suggested actions, not commands.
• Affirmative (shared values): Validate the importance of the skill.

Example — Entering a Meeting Late:
"Sometimes I arrive at a meeting after it has started. When this happens, other people are already talking and listening. They have already arranged their attention. If I enter quietly and sit down quickly, people can continue without being too distracted. I can ask a colleague for notes later. Many people have arrived late to meetings and handled it well. I can too."

Keep sentences short. Use first person. Avoid negative phrasing ("do not") — use positive alternatives.`,
      },
      {
        heading: 'Practical examples',
        body: `Starting a conversation at work:
"When I arrive at work, colleagues sometimes say hello. This is a friendly ritual. They are usually happy with a simple 'Hello' or 'Morning' in return. They do not usually expect a long conversation in the corridor. A brief response and a smile help me seem friendly without requiring much energy."

When someone criticises my work:
"Sometimes my manager or colleague will comment that something I did could be done differently. This is called feedback. It usually means they want the work to improve, not that they dislike me as a person. I can say 'Thanks, I'll look at that' and then consider whether the feedback is useful. Not all feedback needs to be acted on immediately."`,
      },
    ],
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness for ASD',
    subtitle: 'Present-moment awareness and calm',
    icon: '🧘',
    color: '#e0f2fe',
    border: '#0ea5e9',
    summary:
      'Mindfulness practices adapted for autistic people can significantly reduce anxiety, improve sensory regulation, and build emotional resilience.',
    sections: [
      {
        heading: 'Mindfulness and ASD: what the research says',
        body: `Growing evidence supports mindfulness-based interventions for autistic people. Benefits include:
• Reduced anxiety and rumination
• Improved emotional regulation
• Better ability to notice internal body states (interoception)
• Reduced reactivity to sensory triggers
• Improved sleep quality

Importantly, mindfulness does not require changing who you are — it is about observing experience without judgment.`,
      },
      {
        heading: 'Adapting mindfulness for autistic brains',
        body: `Standard mindfulness is often too ambiguous. These adaptations work better:

• Anchor to a physical sensation: Focus on your hands, feet, or breath instead of vague "present moment awareness."
• Use movement: Walking meditation, body scan, or gentle yoga can be easier than still sitting.
• Shorter sessions: Start with 3–5 minutes, not 20.
• Structure each session: Have a consistent beginning, middle, and end.
• Headphones or nature sounds: Block distracting background noise.
• Avoid "clear your mind" instructions: Try "observe thoughts like passing clouds" instead.`,
      },
      {
        heading: 'Exercises you can try now',
        body: `5-4-3-2-1 Grounding:
Notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste. This brings attention to the present moment using concrete sensory input.

Box Breathing:
Breathe in for 4 counts. Hold for 4. Out for 4. Hold for 4. Repeat 4 times. This activates the parasympathetic nervous system and is scientifically proven to reduce acute stress.

Body Scan:
Starting from your feet, slowly move your attention through each part of your body. Notice sensations without trying to change them. This builds interoceptive awareness — understanding what your body is feeling.

Mindful Movement:
Walk slowly for 5 minutes, paying full attention to each step: the sensation of your foot meeting the ground, the shift of weight, the movement of your arms. No destination required.

Single-task Focus:
Choose one everyday activity (washing hands, making tea) and do it with complete attention. Notice every sensation. This is informal mindfulness and can be done anywhere.`,
      },
      {
        heading: 'Mindfulness apps suited to autistic users',
        body: `• Headspace: Structured, visual, consistent format. Good for beginners.
• Calm: Wide variety of lengths and types. Sleep stories are particularly useful.
• Insight Timer: Free, extensive library. Good for finding sensory-friendly or ASD-specific sessions.
• Smiling Mind: Designed for younger users but very accessible and clear.

Look for sessions labelled "grounding," "anxiety," or "stress" — these tend to be most practical.`,
      },
    ],
  },
  {
    id: 'sensory',
    title: 'Sensory Integration Therapy',
    subtitle: 'Understanding and managing sensory experiences',
    icon: '🎨',
    color: '#fce7f3',
    border: '#ec4899',
    summary:
      'Sensory Integration Therapy helps autistic people understand their sensory profile and develop strategies to manage sensory input effectively.',
    sections: [
      {
        heading: 'What is sensory integration?',
        body: `Our brains constantly process information from our senses: sight, sound, smell, taste, touch, proprioception (body position), and vestibular (balance/movement). For many autistic people, the brain processes this information differently — either registering too much (hypersensitivity) or too little (hyposensitivity) from one or more senses.

Sensory Integration Therapy — usually delivered by occupational therapists — aims to help the nervous system process sensory information more comfortably.`,
      },
      {
        heading: 'Hyper vs. Hyposensitivity',
        body: `Hypersensitivity (over-responsive):
• Sounds seem too loud, even ordinary ones
• Lights are too bright or hurt your eyes
• Strong smells cause nausea or headaches
• Tags or certain fabrics cause significant discomfort
• Unexpected touch is startling or painful
• Rooms feel too hot even when others are comfortable

Hyposensitivity (under-responsive):
• Seeking out intense sensory experiences
• Difficulty knowing where your body is in space
• High pain tolerance (not noticing injuries)
• Needing strong flavours or textures to feel satisfied
• Craving movement, spinning, or rocking
• Appearing clumsy or not noticing things in your environment

Many autistic people are a mix of both across different senses.`,
      },
      {
        heading: 'Building your sensory toolkit',
        body: `For hypersensitivity:
• Noise-cancelling headphones or ear defenders
• Tinted glasses or sunglasses for light sensitivity
• Seamless clothing and removing clothing labels
• Maintaining a predictable sensory environment at home
• Fragrance-free products
• Communicating needs: "I need a quiet room for 20 minutes"

For hyposensitivity / sensory seeking:
• Weighted blankets (provide deep pressure)
• Compression clothing
• Chewable jewellery or gum
• Fidget tools (textured, different shapes)
• Foot rollers or sensory cushions
• Regular scheduled movement breaks

General regulation strategies:
• Identify your personal sensory "warning signs" — what physical sensations precede overload?
• Build a sensory "safe space" at home with your preferred inputs
• Schedule sensory recovery time after demanding activities`,
      },
      {
        heading: 'Sensory overload and what to do',
        body: `Sensory overload happens when input exceeds the nervous system's ability to process it. Warning signs:
• Increasing irritability or distress
• Difficulty concentrating
• Physical symptoms (headache, nausea, ringing in ears)
• Strong urge to leave the environment
• Increased stimming

When overload is building:
1. Identify the primary sensory trigger (noise, light, crowding?)
2. Reduce that input immediately if possible (leave, put on headphones)
3. Move to a low-stimulation environment
4. Use your self-soothe toolkit
5. Do not try to continue normal activities — rest is the priority
6. Overload recovery can take hours to days — pace yourself

Prevention: monitor your sensory load throughout the day, not just when it peaks.`,
      },
    ],
  },
  {
    id: 'executive',
    title: 'Executive Function Strategies',
    subtitle: 'Planning, organising, and managing time',
    icon: '📋',
    color: '#fff7ed',
    border: '#f97316',
    summary:
      'Many autistic people have executive function differences. These practical strategies can help with organisation, task-initiation, and time management.',
    sections: [
      {
        heading: 'What is executive function?',
        body: `Executive function (EF) is a set of cognitive processes managed primarily by the prefrontal cortex. They include:

• Planning: Breaking tasks into steps and sequencing them
• Organisation: Keeping track of materials, ideas, and information
• Task initiation: Getting started on tasks — even ones you want to do
• Working memory: Holding information in mind while using it
• Cognitive flexibility: Shifting between tasks or adjusting when plans change
• Impulse control: Inhibiting immediate reactions
• Emotional regulation: Managing feelings to achieve goals
• Time management: Estimating time and managing deadlines

EF differences in ASD can make daily life significantly harder — not because of lack of intelligence or motivation.`,
      },
      {
        heading: 'Task initiation strategies',
        body: `Task initiation — getting started — is often the hardest step. Strategies:

• The 2-Minute Rule: If a task takes under 2 minutes, do it immediately. This prevents piles of small tasks.

• Body Doubling: Work in the physical or virtual presence of another person. Surprisingly effective for many autistic people — the social presence helps regulate attention.

• Temptation Bundling: Only allow yourself a special activity (podcast, favourite drink, playlist) while doing the difficult task.

• "First, then" framing: "First I will do 15 minutes of the report, then I get to check my phone." Concrete and reward-linked.

• Lowering the bar: "I'll just open the document" or "I'll just write one sentence." Starting is usually the hardest part. Once started, momentum carries you.

• External accountability: Tell someone else your start time/plan.`,
      },
      {
        heading: 'Organisation systems',
        body: `External systems compensate for internal EF difficulties:

For to-do lists:
• Capture everything in ONE system (don't use multiple apps, notebooks, and sticky notes)
• Write tasks as specific actions, not vague goals ("Email Dr Smith" not "admin")
• Break large projects into next physical actions

For time management:
• Time-blocking: Assign specific tasks to specific time slots — not just a to-do list
• Analogue clocks and visual timers (e.g. Time Timer) are often better than digital for perceiving time passing
• "Time buffers": Always schedule 30% more time than you think you need
• Set alarms not just for appointments but for transitions ("Leave in 20 minutes")

For physical spaces:
• Everything has a designated home. Return items to their home immediately after use.
• "Outbox" tray for things that need to leave the room
• Reduce visual clutter — visual chaos increases cognitive load`,
      },
      {
        heading: 'Managing transitions and flexibility',
        body: `Transitions — moving from one activity or context to another — are a significant EF challenge.

Strategies:
• Transition warnings: Give yourself advance notice ("In 10 minutes I'll stop and get ready")
• Rituals: A consistent transition ritual (making tea before starting work, changing shoes when you arrive home) helps the brain shift modes
• End tasks before transitions: Reach a natural stopping point rather than stopping mid-task
• Prepare for tomorrow tonight: Lay out clothes, pack bag, write tomorrow's first task. This reduces morning EF demands.
• Expect transition difficulty to be worse when tired, overwhelmed, or unwell.

On plans changing unexpectedly:
• Have a mental "plan B" for common situations
• Notice the physical reaction in your body when plans change — it's a neurological response, not a character flaw
• STOP → BREATHE → ASSESS: "What specifically has changed? What options do I have right now?"`,
      },
    ],
  },
  {
    id: 'emotion',
    title: 'Emotion Regulation',
    subtitle: 'Understanding and managing emotional intensity',
    icon: '💙',
    color: '#eff6ff',
    border: '#3b82f6',
    summary:
      'Emotion regulation skills help you understand your emotional experience, identify triggers, and respond rather than react. These are skills — they can be learned at any age.',
    sections: [
      {
        heading: 'Emotional regulation and ASD',
        body: `Autistic people often experience emotions with greater intensity than neurotypical people. This is sometimes called "emotional hyperreactivity." Contributing factors include:

• Interoception difficulties: Difficulty reading internal body signals until they become intense
• Alexithymia: Reduced ability to identify and describe one's own emotions (affects ~50% of autistic people)
• Anxiety: Chronic background anxiety amplifies all emotional responses
• Masking fatigue: Suppressing emotional expression during the day leads to greater intensity when released
• Sensory overload: Physical sensory stress intensifies emotional responses

Important: intense emotions are not a flaw. They are a real experience that deserves appropriate support.`,
      },
      {
        heading: 'The Emotional Intensity Scale',
        body: `A simple 1–10 scale for tracking emotional intensity:

1–3: Low intensity — mild discomfort, mild pleasure
4–6: Moderate — noticeable feelings affecting concentration
7–8: High — strong feelings affecting ability to communicate normally
9–10: Extreme — meltdown/shutdown territory; higher thinking is limited

The goal is to notice when you are at 5–6 and intervene BEFORE reaching 8+. At 8+, cognitive strategies are usually ineffective — you need physical regulation first.

Practice: Check in with your number several times per day, especially before and after demanding activities.`,
      },
      {
        heading: 'Before the storm: preventive strategies',
        body: `Preventive regulation is far more effective than crisis management.

• Regular sleep: Emotional regulation is dramatically worse on poor sleep
• Physical exercise: One of the most effective natural emotion regulators
• Adequate alone time: Social and sensory recovery time is not optional — it is maintenance
• Reduce ongoing stressors where possible: Unaddressed anxiety is a constant drain on regulatory capacity
• Know your triggers: Identify the specific situations, people, or sensory inputs that reliably increase your emotional load

Regulation bank account metaphor: Think of your regulatory capacity as a bank account. Each demand makes a withdrawal. Rest, pleasant activities, and predictability make deposits. Meltdowns happen when the account hits zero.`,
      },
      {
        heading: 'In-the-moment regulation strategies',
        body: `Physical first (at 7+):
• Cold water on wrists and face (activates parasympathetic nervous system)
• Box breathing (in 4, hold 4, out 4, hold 4)
• Intense brief exercise (jumping jacks, running on the spot)
• Weighted blanket or firm pressure (proprioceptive input)
• Leave the environment if possible
• Stim without judgment — it is regulating

Cognitive (at 4–6):
• Label it: "I am feeling [emotion]. It is at [number]."
• STOP: Stop → Take a breath → Observe what's happening → Proceed mindfully
• Reality check: "Is this an emergency? What is the worst realistic outcome?"
• Reframe urgency: "I feel like I need to respond immediately, but I have time."

After a meltdown/shutdown:
• Rest — recovery is required, not optional
• Be gentle with yourself — shaming yourself for a meltdown makes the next one more likely
• Identify what led to it: what was the build-up? What could be adjusted?`,
      },
    ],
  },
  {
    id: 'special_interests',
    title: 'Leveraging Special Interests',
    subtitle: 'Turning a strength into a superpower',
    icon: '⭐',
    color: '#fdf4ff',
    border: '#a855f7',
    summary:
      'Special interests are a core part of autistic identity and can be powerful tools for wellbeing, career, learning, and connection.',
    sections: [
      {
        heading: 'What are special interests?',
        body: `Special interests (also called "hyperfocuses" or "passionate interests") are intense, enduring interests in a specific topic, activity, or domain. They are a defining and often joyful feature of the autistic experience.

Research shows that special interests:
• Provide intense positive emotions — a natural mood regulator
• Create a reliable source of joy and meaning
• Support stress recovery (engaging with a special interest after a hard day)
• Can become the basis for expertise, career, and community
• Offer a framework for connecting with others who share the interest

The outdated view that special interests should be limited or discouraged is not supported by evidence — and contradicts what most autistic people report as vital to their wellbeing.`,
      },
      {
        heading: 'Special interests as a learning tool',
        body: `Special interests can be a vehicle for learning nearly anything:

Social skills through interest:
• Join clubs, online communities, or local groups around your interest
• Shared interest provides an automatic conversation topic and social lubricant
• The structure of interest-based interaction (talking about a shared topic) is often more accessible than unstructured socialising

Academic and professional connection:
• Many autistic people thrive academically and professionally when their work connects to their special interest
• Identifying career pathways that overlap with special interests can dramatically increase job satisfaction and performance
• Deep expertise developed through special interests is genuinely valued in many fields

Emotional regulation:
• Engaging with a special interest can bring a nervous system out of overload
• Interest-based activities can serve as scheduled "recovery" between demanding tasks`,
      },
      {
        heading: 'Managing the balance',
        body: `While special interests are a strength, there are situations where managing their expression helps:

In professional settings:
• Gauge the social context — not everyone wants to hear every detail about your interest
• Look for signs the other person is still engaged (eye contact, responsive body language, questions)
• A useful rule: share 2–3 minutes, then pause and ask "Are you interested in this?" — this gives others a graceful exit and shows social awareness

When an interest becomes avoidance:
• Sometimes hyperfocusing on an interest is used to avoid difficult tasks or emotions
• Check in with yourself: "Is this genuinely enjoyable right now, or am I using it to avoid something I need to face?"

Finding balance is about self-awareness, not restricting the interest itself.`,
      },
      {
        heading: 'Building community around interests',
        body: `Special interests are one of the most effective pathways to genuine social connection for autistic people.

Online:
• Reddit communities for almost every interest exist and often provide low-pressure social interaction
• Discord servers for interests are active and interest-focused — less small talk, more substance
• YouTube, forums, and wikis allow you to engage at your own pace

In person:
• Local clubs (board games, tabletop RPGs, astronomy, coding, craft) attract people who value the activity over socialising for its own sake
• Volunteering in areas connected to your interest combines contribution with community
• Classes and workshops provide structured interaction around shared content

Many autistic people find their deepest, most stable friendships through shared interests — this is not a lesser form of connection, it is a natural one.`,
      },
    ],
  },
];

// ─── Detail View ──────────────────────────────────────────────────────────────

function TechniqueDetail({ technique, onBack }) {
  const [openSection, setOpenSection] = useState(0);

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
      <TouchableOpacity onPress={onBack} style={styles.backLink}>
        <Text style={styles.backLinkText}>← Back to Therapy Techniques</Text>
      </TouchableOpacity>

      <View style={[styles.detailHeader, { backgroundColor: technique.color, borderLeftColor: technique.border }]}>
        <Text style={styles.detailIcon}>{technique.icon}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.detailTitle}>{technique.title}</Text>
          <Text style={styles.detailSubtitle}>{technique.subtitle}</Text>
        </View>
      </View>

      <Text style={styles.detailSummary}>{technique.summary}</Text>

      {technique.sections.map((section, i) => (
        <View key={i} style={styles.accordionItem}>
          <TouchableOpacity
            style={[styles.accordionHeader, openSection === i && { backgroundColor: technique.color }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setOpenSection(openSection === i ? -1 : i);
            }}
          >
            <Text style={[styles.accordionTitle, openSection === i && { color: '#1e1b4b' }]}>
              {section.heading}
            </Text>
            <Text style={styles.accordionChevron}>{openSection === i ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {openSection === i && (
            <View style={styles.accordionBody}>
              <Text style={styles.accordionText}>{section.body}</Text>
            </View>
          )}
        </View>
      ))}

      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerTitle}>Professional support</Text>
        <Text style={styles.disclaimerText}>
          The information here is educational and provides an introduction to each technique. For personalised therapy, please consult a licensed mental health professional who has experience working with autistic individuals.
        </Text>
      </View>
    </ScrollView>
  );
}

// ─── Therapy Hub ──────────────────────────────────────────────────────────────

export default function TherapyScreen() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <TechniqueDetail technique={selected} onBack={() => setSelected(null)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text style={styles.hubTitle}>Psychology & Therapy</Text>
        <Text style={styles.hubSubtitle}>
          Evidence-based therapeutic approaches adapted for Asperger's and ASD. Each section includes practical techniques you can use independently and guidance on finding professional support.
        </Text>

        <View style={styles.researchBanner}>
          <Text style={styles.researchBannerText}>
            All techniques described here are supported by research evidence and are regularly used by mental health professionals working with autistic people.
          </Text>
        </View>

        {techniques.map((t) => (
          <TouchableOpacity
            key={t.id}
            style={[styles.techniqueCard, { backgroundColor: t.color, borderLeftColor: t.border }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setSelected(t);
            }}
          >
            <Text style={styles.techniqueIcon}>{t.icon}</Text>
            <View style={styles.techniqueContent}>
              <Text style={styles.techniqueTitle}>{t.title}</Text>
              <Text style={styles.techniqueSubtitle}>{t.subtitle}</Text>
              <Text style={styles.techniqueSummary} numberOfLines={2}>{t.summary}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.footerBox}>
          <Text style={styles.footerTitle}>Finding the right support</Text>
          <Text style={styles.footerText}>
            When looking for a therapist, it is completely acceptable to ask: "Do you have experience working with autistic adults?" A good therapist will welcome this question and adapt their approach accordingly.{'\n\n'}
            Many autistic people also benefit from peer support groups — connecting with others who share similar experiences can be as valuable as professional therapy.
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
  hubSubtitle: { fontSize: 15, fontFamily: 'Quicksand_400Regular', color: '#555', lineHeight: 22, marginBottom: 16 },
  researchBanner: {
    backgroundColor: '#f0fdf4',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
  },
  researchBannerText: { fontFamily: 'Quicksand_500Medium', fontSize: 13, color: '#166534', lineHeight: 19 },

  techniqueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  techniqueIcon: { fontSize: 32, marginRight: 14, flexShrink: 0 },
  techniqueContent: { flex: 1 },
  techniqueTitle: { fontSize: 16, fontFamily: 'Quicksand_700Bold', color: '#1e1b4b', marginBottom: 2 },
  techniqueSubtitle: { fontSize: 12, fontFamily: 'Quicksand_600SemiBold', color: '#64748b', marginBottom: 4 },
  techniqueSummary: { fontSize: 13, fontFamily: 'Quicksand_400Regular', color: '#444', lineHeight: 18 },
  chevron: { fontSize: 22, color: '#9ca3af', marginLeft: 8 },

  footerBox: {
    backgroundColor: '#f8f8fc',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  footerTitle: { fontFamily: 'Quicksand_700Bold', fontSize: 15, color: '#1e1b4b', marginBottom: 8 },
  footerText: { fontFamily: 'Quicksand_400Regular', fontSize: 13, color: '#555', lineHeight: 20 },

  // Detail view
  backLink: { marginBottom: 16 },
  backLinkText: { color: '#6366f1', fontFamily: 'Quicksand_600SemiBold', fontSize: 15 },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
  },
  detailIcon: { fontSize: 36, marginRight: 14, flexShrink: 0 },
  detailTitle: { fontSize: 20, fontFamily: 'Quicksand_700Bold', color: '#1e1b4b', marginBottom: 4 },
  detailSubtitle: { fontSize: 13, fontFamily: 'Quicksand_500Medium', color: '#64748b' },
  detailSummary: { fontSize: 15, fontFamily: 'Quicksand_400Regular', color: '#333', lineHeight: 23, marginBottom: 20 },

  accordionItem: {
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#fff',
  },
  accordionTitle: { flex: 1, fontFamily: 'Quicksand_700Bold', fontSize: 14, color: '#1e1b4b', paddingRight: 8 },
  accordionChevron: { fontSize: 12, color: '#9ca3af' },
  accordionBody: { backgroundColor: '#fafafa', padding: 16, borderTopWidth: 1, borderTopColor: '#e5e7eb' },
  accordionText: { fontFamily: 'Quicksand_400Regular', fontSize: 14, color: '#333', lineHeight: 22 },

  disclaimerBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  disclaimerTitle: { fontFamily: 'Quicksand_700Bold', fontSize: 14, color: '#1e40af', marginBottom: 6 },
  disclaimerText: { fontFamily: 'Quicksand_400Regular', fontSize: 13, color: '#1d4ed8', lineHeight: 19 },
});
