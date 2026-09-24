import { useFocusEffect, useIsFocused } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AccessibilityInfo, AppState, InteractionManager } from "react-native";
import { useReducedMotion } from "react-native-reanimated";
import { IconTransition } from "../iconsRow/AnimatedIconsRow";
import { iconTransitionDurations } from "../iconsRow/iconTransitionDurations";
import { mainStore, MainValues, QrChange } from "../mainState/mainStore";

const heartValue = 50;
const percentagePointsPerSmiley = 100;

const readStoreValues = (): MainValues => {
  return {
    hearts: mainStore.hearts,
    percentage: mainStore.percentage,
    smileys: mainStore.smileys,
  };
};

const percentageAnimationDuration = (from: number, to: number) =>
  from === to ? 0 : 250 + (350 * Math.abs(to - from)) / 100;

const easeInOut = (progress: number) =>
  progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

export const scoreForValues = (values: MainValues) =>
  values.percentage
  + values.smileys * percentagePointsPerSmiley
  + values.hearts * heartValue;

export const useQrChangeAnimation = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const reduceMotion = useReducedMotion();
  const [displayedValues, setDisplayedValues] = useState(readStoreValues);
  const [iconTransition, setIconTransition] = useState<
    IconTransition | undefined
  >(undefined);
  const [isAnimating, setIsAnimating] = useState(false);
  const cancellationGenerationRef = useRef(0);
  const displayedValuesRef = useRef(displayedValues);
  const focusedRef = useRef(isFocused);
  const iconTransitionIdRef = useRef(0);
  const queueItemIdRef = useRef(0);
  const queueTailRef = useRef(Promise.resolve());

  const pendingChangeId = mainStore.pendingQrChange?.id;
  const persistedHearts = mainStore.hearts;
  const persistedPercentage = mainStore.percentage;
  const persistedSmileys = mainStore.smileys;

  const updateDisplayedValues = useCallback((updates: Partial<MainValues>) => {
    const nextValues = { ...displayedValuesRef.current, ...updates };
    displayedValuesRef.current = nextValues;
    setDisplayedValues(nextValues);
  }, []);

  const waitFor = useCallback(
    (duration: number, generation: number) =>
      new Promise<boolean>((resolve) => {
        setTimeout(() => {
          resolve(cancellationGenerationRef.current === generation);
        }, duration);
      }),
    [],
  );

  const animatePercentage = useCallback(
    (target: number, generation: number) =>
      new Promise<boolean>((resolve) => {
        const start = displayedValuesRef.current.percentage;
        const duration = reduceMotion
          ? 0
          : percentageAnimationDuration(start, target);

        if (duration === 0) {
          updateDisplayedValues({ percentage: target });
          resolve(cancellationGenerationRef.current === generation);
          return;
        }

        const startedAt = performance.now();

        const update = (now: number) => {
          if (cancellationGenerationRef.current !== generation) {
            resolve(false);
            return;
          }

          const progress = Math.min(1, (now - startedAt) / duration);
          const percentage = Math.round(
            start + (target - start) * easeInOut(progress),
          );
          updateDisplayedValues({ percentage: percentage });

          if (progress === 1) {
            resolve(true);
          } else {
            requestAnimationFrame(update);
          }
        };

        requestAnimationFrame(update);
      }),
    [reduceMotion, updateDisplayedValues],
  );

  const animateIcons = useCallback(
    async (
      type: IconTransition["type"],
      target: number,
      generation: number,
    ) => {
      const valueKey = type === "heart" ? "hearts" : "smileys";
      const current = displayedValuesRef.current[valueKey];

      if (current === target) {
        return true;
      }

      const direction = target > current ? "add" : "remove";
      const indices =
        direction === "add"
          ? Array.from(
              { length: target - current },
              (_, index) => current + index,
            )
          : Array.from(
              { length: current - target },
              (_, index) => target + index,
            );

      iconTransitionIdRef.current += 1;
      setIconTransition({
        direction: direction,
        id: iconTransitionIdRef.current,
        indices: indices,
        type: type,
      });
      updateDisplayedValues({ [valueKey]: target });

      const completed = await waitFor(
        reduceMotion
          ? iconTransitionDurations.reduceMotion
          : iconTransitionDurations[direction],
        generation,
      );

      if (completed) {
        setIconTransition(undefined);
      }

      return completed;
    },
    [reduceMotion, updateDisplayedValues, waitFor],
  );

  const announceChange = useCallback(
    (change: QrChange) => {
      const result = t("qrChangeResult", {
        hearts: change.newValues.hearts,
        percentage: change.newValues.percentage,
        smileys: change.newValues.smileys,
      });
      const changeDescription = (() => {
        switch (change.qrCode.type) {
          case "heart":
            return t(
              change.newValues.hearts > change.previousValues.hearts
                ? "qrChangeHeartAdded"
                : "qrChangeHeartRemoved",
            );

          case "percentage": {
            const previousPercentagePoints =
              change.previousValues.smileys * percentagePointsPerSmiley
              + change.previousValues.percentage;
            const newPercentagePoints =
              change.newValues.smileys * percentagePointsPerSmiley
              + change.newValues.percentage;
            const amount = Math.abs(
              newPercentagePoints - previousPercentagePoints,
            );

            return t(
              newPercentagePoints > previousPercentagePoints
                ? "qrChangePercentageAdded"
                : "qrChangePercentageRemoved",
              { amount: amount },
            );
          }

          case "smiley":
            return t(
              change.newValues.smileys > change.previousValues.smileys
                ? "qrChangeSmileyAdded"
                : "qrChangeSmileyRemoved",
            );
        }
      })();

      AccessibilityInfo.announceForAccessibility(
        `${changeDescription}. ${result}`,
      );
    },
    [t],
  );

  const animateChange = useCallback(
    async (change: QrChange, generation: number) => {
      updateDisplayedValues(change.previousValues);
      announceChange(change);

      switch (change.qrCode.type) {
        case "heart":
          await animateIcons("heart", change.newValues.hearts, generation);
          break;

        case "percentage": {
          const direction =
            scoreForValues(change.newValues)
            > scoreForValues(change.previousValues)
              ? "add"
              : "remove";
          let smileys = change.previousValues.smileys;

          if (direction === "add") {
            while (
              smileys < change.newValues.smileys
              && cancellationGenerationRef.current === generation
            ) {
              if (!(await animatePercentage(100, generation))) {
                return;
              }

              smileys += 1;
              if (!(await animateIcons("smiley", smileys, generation))) {
                return;
              }

              updateDisplayedValues({ percentage: 0 });
            }
          } else {
            while (
              smileys > change.newValues.smileys
              && cancellationGenerationRef.current === generation
            ) {
              if (!(await animatePercentage(0, generation))) {
                return;
              }

              smileys -= 1;
              if (!(await animateIcons("smiley", smileys, generation))) {
                return;
              }

              updateDisplayedValues({ percentage: 100 });
            }
          }

          await animatePercentage(change.newValues.percentage, generation);
          break;
        }

        case "smiley":
          await animateIcons("smiley", change.newValues.smileys, generation);
          break;
      }

      if (cancellationGenerationRef.current === generation) {
        updateDisplayedValues(change.newValues);
      }
    },
    [animateIcons, animatePercentage, announceChange, updateDisplayedValues],
  );

  const cancelAnimationAndSync = useCallback(() => {
    cancellationGenerationRef.current += 1;
    queueItemIdRef.current += 1;
    queueTailRef.current = Promise.resolve();
    setIconTransition(undefined);
    updateDisplayedValues(readStoreValues());
    setIsAnimating(false);
  }, [updateDisplayedValues]);

  const enqueueChange = useCallback(
    (change: QrChange) => {
      const generation = cancellationGenerationRef.current;
      queueItemIdRef.current += 1;
      const queueItemId = queueItemIdRef.current;
      setIsAnimating(true);

      queueTailRef.current = queueTailRef.current
        .then(async () => {
          if (
            cancellationGenerationRef.current === generation
            && focusedRef.current
          ) {
            await animateChange(change, generation);
          }
        })
        .then(() => {
          if (
            cancellationGenerationRef.current === generation
            && queueItemIdRef.current === queueItemId
          ) {
            updateDisplayedValues(change.newValues);
            setIconTransition(undefined);
            setIsAnimating(false);
          }
        });
    },
    [animateChange, updateDisplayedValues],
  );

  useFocusEffect(
    useCallback(() => {
      focusedRef.current = true;

      if (mainStore.pendingQrChange === undefined) {
        cancelAnimationAndSync();
      }

      return () => {
        focusedRef.current = false;
        cancelAnimationAndSync();
      };
    }, [cancelAnimationAndSync]),
  );

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state !== "active") {
        cancelAnimationAndSync();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [cancelAnimationAndSync]);

  useEffect(
    () => () => {
      cancellationGenerationRef.current += 1;
    },
    [],
  );

  useEffect(() => {
    if (!isFocused || pendingChangeId === undefined) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-deprecated -- Navigation transitions require interaction completion rather than generic idle time.
    const task = InteractionManager.runAfterInteractions(() => {
      if (!focusedRef.current) {
        return;
      }

      const change = mainStore.takePendingQrChange();

      if (change !== undefined) {
        enqueueChange(change);
      }
    });

    return () => {
      task.cancel();
    };
  }, [enqueueChange, isFocused, pendingChangeId]);

  useEffect(() => {
    // The persisted store is an external system that can hydrate or reset independently of this component.
    // eslint-disable-next-line react-you-might-not-need-an-effect/no-event-handler
    if (pendingChangeId === undefined && !isAnimating) {
      updateDisplayedValues({
        hearts: persistedHearts,
        percentage: persistedPercentage,
        smileys: persistedSmileys,
      });
    }
  }, [
    isAnimating,
    pendingChangeId,
    persistedHearts,
    persistedPercentage,
    persistedSmileys,
    updateDisplayedValues,
  ]);

  return {
    displayedValues: displayedValues,
    iconTransition: iconTransition,
  };
};
