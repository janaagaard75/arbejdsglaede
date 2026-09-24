import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { KnownQrCode } from "./KnownQrCode";
import { calculateNewValues } from "./calculateNewValues";

const initialHearts = 0;
const initialPercentage = 20;
const initialSmileys = 0;

const heartValue = 50;
const smileyValue = 100;

export interface MainValues {
  hearts: number;
  percentage: number;
  smileys: number;
}

export interface QrChange {
  id: number;
  newValues: MainValues;
  previousValues: MainValues;
  qrCode: KnownQrCode;
}

class MainStore {
  public hearts = initialHearts;
  public pendingQrChange: QrChange | undefined = undefined;
  public percentage = initialPercentage;
  public smileys = initialSmileys;
  private qrChangeId = 0;

  public constructor() {
    makeAutoObservable(this);
    void makePersistable(this, {
      // The name changed along with the properties, because what used to be stored as `hearts` is what is now called `smileys`, and reusing the old name would silently read the old smiley count back as hearts.
      name: "MainStoreWithSmileys",
      properties: ["hearts", "percentage", "smileys"],
      storage: AsyncStorage,
    });
  }

  public get score(): number {
    return (
      this.percentage + this.smileys * smileyValue + this.hearts * heartValue
    );
  }

  public applyQrCode(qrCode: KnownQrCode) {
    const previousValues = this.values;
    const calculatedValues = calculateNewValues(previousValues, qrCode);
    const newValues = {
      hearts: calculatedValues.newHearts,
      percentage: calculatedValues.newPercentage,
      smileys: calculatedValues.newSmileys,
    };

    this.hearts = newValues.hearts;
    this.percentage = newValues.percentage;
    this.smileys = newValues.smileys;

    if (
      previousValues.hearts === newValues.hearts
      && previousValues.percentage === newValues.percentage
      && previousValues.smileys === newValues.smileys
    ) {
      this.pendingQrChange = undefined;
      return;
    }

    this.qrChangeId += 1;
    this.pendingQrChange = {
      id: this.qrChangeId,
      newValues: newValues,
      previousValues: previousValues,
      qrCode: qrCode,
    };
  }

  public reset() {
    this.hearts = initialHearts;
    this.pendingQrChange = undefined;
    this.percentage = initialPercentage;
    this.smileys = initialSmileys;
  }

  public takePendingQrChange(): QrChange | undefined {
    const qrChange = this.pendingQrChange;
    this.pendingQrChange = undefined;
    return qrChange;
  }

  private get values(): MainValues {
    return {
      hearts: this.hearts,
      percentage: this.percentage,
      smileys: this.smileys,
    };
  }
}

export const mainStore = new MainStore();
