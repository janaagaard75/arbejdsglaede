import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { QrCode } from "./QrCode";
import { calculateNewValues } from "./calculateNewValues";

const initialFlames = 0;
const initialHearts = 0;
const initialPercentage = 20;

const flameValue = 50;
const heartValue = 125;

class MainStore {
  flames = initialFlames;
  hearts = initialHearts;
  percentage = initialPercentage;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "MainStore",
      properties: ["flames", "hearts", "percentage"],
      storage: AsyncStorage,
    });
  }

  get score(): number {
    return (
      this.percentage + this.hearts * heartValue + this.flames * flameValue
    );
  }

  applyQrCode(qrCode: QrCode) {
    const newValues = calculateNewValues(
      {
        flames: this.flames,
        hearts: this.hearts,
        percentage: this.percentage,
      },
      qrCode,
    );

    this.flames = newValues.newFlames;
    this.hearts = newValues.newHearts;
    this.percentage = newValues.newPercentage;
  }

  reset() {
    this.flames = initialFlames;
    this.hearts = initialHearts;
    this.percentage = initialPercentage;
  }
}

export const mainStore = new MainStore();
