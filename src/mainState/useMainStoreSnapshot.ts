import { computed, reaction } from "mobx";
import { useSyncExternalStore } from "react";
import { mainStore } from "./mainStore";

// keepAlive caches the snapshot outside reactions too, which useSyncExternalStore needs, because it compares snapshots by identity on every render.
const snapshot = computed(
  () => {
    return {
      hearts: mainStore.hearts,
      pendingQrChangeId: mainStore.pendingQrChange?.id,
      percentage: mainStore.percentage,
      smileys: mainStore.smileys,
    };
  },
  { keepAlive: true },
);

const subscribe = (onStoreChange: () => void) =>
  reaction(() => snapshot.get(), onStoreChange);

const getSnapshot = () => snapshot.get();

/** Reads the store through a subscription the React Compiler can see, since it treats a direct read of the MobX store as an immutable module global and memoizes it. */
export const useMainStoreSnapshot = () =>
  useSyncExternalStore(subscribe, getSnapshot);
