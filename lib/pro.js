// Aspie Guide Pro: store products and the local entitlement.
//
// No account or server: the App Store / Google Play purchase history on the
// device is the source of truth. The last known state is cached so Pro keeps
// working offline.
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export const IOS = {
  monthly: 'com.johnseong.aspiehelper.pro.monthly',
  yearly: 'com.johnseong.aspiehelper.pro.yearly',
  lifetime: 'com.johnseong.aspiehelper.pro.lifetime',
};
export const PLAY_SUB = 'aspie_pro';
export const PLAY_LIFETIME = 'aspie_pro_lifetime';
export const ANDROID_PACKAGE = 'com.johnseong.aspiehelper';

export const PRIVACY_URL = 'https://wonmor.github.io/Aspie-Helper/';
export const TERMS_URL =
  Platform.OS === 'ios'
    ? 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'
    : 'https://play.google.com/about/play-terms/';

const CACHE_KEY = 'aspie_pro_v1';
const ALL_IDS = [...Object.values(IOS), PLAY_SUB, PLAY_LIFETIME];
const isOurs = (id) => !!id && ALL_IDS.includes(id);

function iap() {
  if (Platform.OS !== 'ios' && Platform.OS !== 'android') return null;
  try {
    return require('expo-iap');
  } catch (_) {
    return null;
  }
}

let connecting = null;
async function connect() {
  const m = iap();
  if (!m) return false;
  if (!connecting) {
    connecting = m.initConnection().catch(() => {
      connecting = null;
      return false;
    });
  }
  return connecting;
}

const isPending = (p) => p?.platform === 'android' && p?.purchaseStateAndroid === 2;

export const usePro = create((set, get) => ({
  isPro: false,
  ready: false,
  offers: [], // [{ plan, sku, price, type, offerToken? }]
  loadingOffers: false,
  busy: false,
  message: null,
  paywallVisible: false,
  paywallReason: null,

  showPaywall: (reason) => set({ paywallVisible: true, paywallReason: reason || null, message: null }),
  hidePaywall: () => set({ paywallVisible: false, message: null }),

  setPro: async (value) => {
    set({ isPro: value });
    try {
      await AsyncStorage.setItem(CACHE_KEY, value ? '1' : '0');
    } catch (_) {}
  },

  /** Called once at launch. */
  init: async () => {
    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (cached === '1') set({ isPro: true });
    } catch (_) {}
    set({ ready: true });
    const m = iap();
    if (!m || !(await connect())) return;
    m.purchaseUpdatedListener(async (p) => {
      if (!isOurs(p.productId) || isPending(p)) return;
      try {
        await m.finishTransaction({ purchase: p, isConsumable: false });
      } catch (_) {}
      await get().setPro(true);
      set({ busy: false, paywallVisible: false, message: null });
    });
    m.purchaseErrorListener((e) => {
      const cancelled = e?.code === 'E_USER_CANCELLED';
      set({ busy: false, message: cancelled ? null : e?.message || 'The purchase did not go through.' });
    });
    await get().refresh();
  },

  /** Re-read what the store says this person owns. */
  refresh: async () => {
    const m = iap();
    if (!m || !(await connect())) return false;
    try {
      const list = await m.getAvailablePurchases({ onlyIncludeActiveItemsIOS: true });
      const ours = list.filter((p) => isOurs(p.productId) && !isPending(p));
      for (const p of ours) {
        if (p.platform === 'android' && p.isAcknowledgedAndroid === false) {
          try {
            await m.finishTransaction({ purchase: p, isConsumable: false });
          } catch (_) {}
        }
      }
      await get().setPro(ours.length > 0);
      return ours.length > 0;
    } catch (_) {
      return get().isPro;
    }
  },

  loadOffers: async () => {
    // Screenshot builds only (EAS profile "screenshots"): show the store's US
    // prices without a signed-in store account. Never set in release builds.
    if (process.env.EXPO_PUBLIC_DEMO_OFFERS === '1') {
      const ios = Platform.OS === 'ios';
      set({
        offers: [
          { plan: 'yearly', sku: ios ? IOS.yearly : PLAY_SUB, price: '$14.99', type: 'subs' },
          { plan: 'monthly', sku: ios ? IOS.monthly : PLAY_SUB, price: '$2.99', type: 'subs' },
          { plan: 'lifetime', sku: ios ? IOS.lifetime : PLAY_LIFETIME, price: '$29.99', type: 'inapp' },
        ],
        loadingOffers: false,
      });
      return;
    }
    const m = iap();
    if (!m) return;
    set({ loadingOffers: true });
    try {
      if (!(await connect())) throw new Error('store');
      const offers = [];
      if (Platform.OS === 'ios') {
        const subs = await m.fetchProducts({ skus: [IOS.monthly, IOS.yearly], type: 'subs' });
        const one = await m.fetchProducts({ skus: [IOS.lifetime], type: 'inapp' });
        for (const plan of ['yearly', 'monthly']) {
          const p = subs.find((x) => x.id === IOS[plan]);
          if (p) offers.push({ plan, sku: p.id, price: p.displayPrice, type: 'subs' });
        }
        const l = one.find((x) => x.id === IOS.lifetime);
        if (l) offers.push({ plan: 'lifetime', sku: l.id, price: l.displayPrice, type: 'inapp' });
      } else {
        const subs = await m.fetchProducts({ skus: [PLAY_SUB], type: 'subs' });
        const sub = subs.find((x) => x.id === PLAY_SUB);
        const details = sub?.subscriptionOfferDetailsAndroid ?? [];
        for (const plan of ['yearly', 'monthly']) {
          const base =
            details.find((d) => d.basePlanId === plan && !d.offerId) ??
            details.find((d) => d.basePlanId === plan);
          if (!base) continue;
          const phases = base.pricingPhases?.pricingPhaseList ?? [];
          const price = phases[phases.length - 1]?.formattedPrice ?? sub.displayPrice;
          offers.push({ plan, sku: PLAY_SUB, price, type: 'subs', offerToken: base.offerToken });
        }
        try {
          const one = await m.fetchProducts({ skus: [PLAY_LIFETIME], type: 'inapp' });
          const l = one.find((x) => x.id === PLAY_LIFETIME);
          if (l) offers.push({ plan: 'lifetime', sku: l.id, price: l.displayPrice, type: 'inapp' });
        } catch (_) {}
      }
      set({ offers, loadingOffers: false });
    } catch (_) {
      set({ offers: [], loadingOffers: false });
    }
  },

  buy: async (offer) => {
    const m = iap();
    if (!m || !(await connect())) {
      set({ message: "Purchases aren't available on this device right now." });
      return;
    }
    set({ busy: true, message: null });
    try {
      if (offer.type === 'subs') {
        await m.requestPurchase({
          type: 'subs',
          request: {
            ios: { sku: offer.sku },
            android: {
              skus: [offer.sku],
              subscriptionOffers: offer.offerToken ? [{ sku: offer.sku, offerToken: offer.offerToken }] : [],
            },
          },
        });
      } else {
        await m.requestPurchase({
          type: 'inapp',
          request: { ios: { sku: offer.sku }, android: { skus: [offer.sku] } },
        });
      }
      // The result arrives through the purchase listener.
    } catch (e) {
      const cancelled = e?.code === 'E_USER_CANCELLED';
      set({ busy: false, message: cancelled ? null : e?.message || 'The purchase did not go through.' });
    }
  },

  restore: async () => {
    const m = iap();
    if (!m || !(await connect())) {
      set({ message: "Purchases aren't available on this device right now." });
      return false;
    }
    set({ busy: true, message: null });
    try {
      const list = await m.restorePurchases({ onlyIncludeActiveItemsIOS: true });
      const has = list.some((p) => isOurs(p.productId) && !isPending(p));
      await get().setPro(has);
      set({
        busy: false,
        message: has ? 'Aspie Guide Pro is active. Thank you!' : 'No active Pro purchase was found for this account.',
        paywallVisible: has ? false : get().paywallVisible,
      });
      return has;
    } catch (e) {
      set({ busy: false, message: 'Could not reach the store. Please try again.' });
      return false;
    }
  },

  manage: async () => {
    const m = iap();
    if (!m) return;
    try {
      await m.deepLinkToSubscriptions({ skuAndroid: PLAY_SUB, packageNameAndroid: ANDROID_PACKAGE });
    } catch (_) {}
  },
}));

export const PLAN_LABEL = { yearly: 'Yearly', monthly: 'Monthly', lifetime: 'Lifetime' };
export const PLAN_TERM = {
  yearly: 'per year, renews automatically',
  monthly: 'per month, renews automatically',
  lifetime: 'one-time purchase, no subscription',
};
