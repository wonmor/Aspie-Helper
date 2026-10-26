// AI coaching engine.
//
// 1. Apple Foundation Models (iOS 26+ with Apple Intelligence): runs fully on
//    the device, free to use, nothing leaves the phone.
// 2. Fallback: the person's own OpenAI key (the same one the AI Chat
//    Assistant uses), when they have saved one.
// 3. Otherwise no AI engine: callers show the scripted alternative.
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let native;
function coachModule() {
  if (native !== undefined) return native;
  native = null;
  if (Platform.OS === 'ios') {
    try {
      const { requireOptionalNativeModule } = require('expo-modules-core');
      native = requireOptionalNativeModule('AspieCoach');
    } catch (_) {
      native = null;
    }
  }
  return native;
}

/** "available" | "deviceNotEligible" | "appleIntelligenceNotEnabled" |
 *  "modelNotReady" | "unavailable" | "unsupportedOS" */
export function onDeviceAvailability() {
  const m = coachModule();
  if (!m) return 'unsupportedOS';
  try {
    return m.availability();
  } catch (_) {
    return 'unavailable';
  }
}

export function onDeviceStatusText(status) {
  switch (status) {
    case 'available':
      return 'Private on-device AI (Apple Intelligence). Nothing you type leaves this phone.';
    case 'appleIntelligenceNotEnabled':
      return 'Turn on Apple Intelligence in Settings to use the private on-device coach.';
    case 'modelNotReady':
      return 'Apple Intelligence is still downloading. Try again in a little while.';
    case 'deviceNotEligible':
      return 'This device does not support Apple Intelligence.';
    default:
      return Platform.OS === 'ios'
        ? 'The on-device coach needs iOS 26 or later with Apple Intelligence.'
        : 'The on-device coach is available on iPhone with Apple Intelligence.';
  }
}

/** Which engine will answer: "device" | "openai" | null */
export async function pickEngine() {
  if (onDeviceAvailability() === 'available') return 'device';
  try {
    const key = await AsyncStorage.getItem('openai_api_key');
    if (key) return 'openai';
  } catch (_) {}
  return null;
}

const SAFETY = `If the person mentions wanting to hurt themselves or someone else, being in danger, or being in crisis: do not role-play. Say kindly and plainly that their safety matters, that they can open "Get Help Now" in this app, and that they should call their local emergency number (for example 911, 999, 112 or 000) or a crisis line (988 in the US and Canada) right now.`;

export const COACH_STYLE = `Write in plain, literal, kind language. No sarcasm, idioms or hidden meanings unless you explain them. Use short sentences. Never shame the person; autistic ways of communicating are differences, not mistakes. Do not diagnose or give medical advice. ${SAFETY}`;

function compactTranscript(turns, maxChars = 2400) {
  const lines = [];
  let used = 0;
  for (let i = turns.length - 1; i >= 0; i--) {
    const t = turns[i];
    const line = `${t.role === 'user' ? 'Me' : 'Them'}: ${t.content}`;
    if (used + line.length > maxChars) break;
    lines.unshift(line);
    used += line.length;
  }
  return lines.join('\n');
}

/**
 * Generate one reply.
 * @param {string} instructions system instructions
 * @param {string} prompt the user-side prompt
 * @returns {Promise<{text?: string, error?: string, engine?: string}>}
 */
export async function generate(instructions, prompt) {
  const engine = await pickEngine();
  if (engine === 'device') {
    try {
      const r = await coachModule().respond(instructions, prompt);
      return { ...r, engine };
    } catch (_) {
      return { error: 'failed', engine };
    }
  }
  if (engine === 'openai') {
    try {
      const key = await AsyncStorage.getItem('openai_api_key');
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: instructions },
            { role: 'user', content: prompt },
          ],
          max_tokens: 600,
          temperature: 0.6,
        }),
      });
      if (!res.ok) return { error: res.status === 401 ? 'badKey' : 'failed', engine };
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content;
      return text ? { text, engine } : { error: 'failed', engine };
    } catch (_) {
      return { error: 'offline', engine };
    }
  }
  return { error: 'noEngine' };
}

export function errorText(code) {
  switch (code) {
    case 'guardrail':
      return 'The on-device model could not answer that. Try wording it a different way. If you are in crisis, open Get Help Now.';
    case 'tooLong':
      return 'This conversation got too long for the on-device model. Start a new one to keep going.';
    case 'badKey':
      return 'Your OpenAI key was rejected. Check it in the AI Chat Assistant settings.';
    case 'offline':
      return 'Could not reach the AI service. Check your internet connection.';
    case 'noEngine':
      return 'No AI engine is available on this device.';
    default:
      return 'Something went wrong. Please try again.';
  }
}

/** The other person's next line in a role-play, plus a short coaching note. */
export function rolePlayTurn(scenario, turns) {
  const instructions = `You are helping an autistic adult rehearse a real-life situation.
Situation: ${scenario.situation}
You play: ${scenario.otherRole || 'the other person'}. Stay in that role and keep your lines short (one to three sentences), realistic and calm.
After your line, add a new line that starts with "Coach:" and give one short, specific, encouraging tip about what the person just said (what worked, or one thing to try).
${COACH_STYLE}`;
  const prompt = turns.length
    ? `Conversation so far:\n${compactTranscript(turns)}\n\nReply as ${scenario.otherRole || 'the other person'}, then the Coach line.`
    : `Start the scene with your first line as ${scenario.otherRole || 'the other person'}. Do not add a Coach line yet.`;
  return generate(instructions, prompt);
}

/** Check a message before sending it: how it may come across, and a clearer version. */
export function messageCheck(message, context) {
  const instructions = `You help an autistic adult check a message before they send or say it.
Reply in exactly three short sections with these headings:
How it may come across:
Clearer version:
Why:
Keep the person's meaning and voice. Do not add flattery or extra apologies. If the message is already fine, say so and keep it.
${COACH_STYLE}`;
  const prompt = `${context ? `Who it is for / situation: ${context}\n` : ''}Message:\n${message}`;
  return generate(instructions, prompt);
}

// Words that suggest someone may be in crisis. Used only to surface free help
// (never to block anything).
const CRISIS = /\b(suicid\w*|kill myself|end my life|want to die|hurt myself|self[- ]harm\w*|cutting myself|overdose|not safe|in danger|abuse[ds]?)\b/i;
export function looksLikeCrisis(text) {
  return CRISIS.test(text || '');
}

/** Free AI Chat Assistant turn on the on-device model. */
export async function chatOnDevice(system, messages) {
  const m = coachModule();
  if (!m || onDeviceAvailability() !== 'available') return { error: 'unavailable' };
  const history = messages.slice(0, -1);
  const last = messages[messages.length - 1]?.content || '';
  const transcript = compactTranscript(history, 2000)
    .replace(/^Me:/gm, 'User:')
    .replace(/^Them:/gm, 'Assistant:');
  const prompt = `${transcript ? `Conversation so far:\n${transcript}\n\n` : ''}User: ${last}\n\nReply as the assistant.`;
  try {
    return await m.respond(`${system}\n\n${SAFETY}`, prompt);
  } catch (_) {
    return { error: 'failed' };
  }
}
