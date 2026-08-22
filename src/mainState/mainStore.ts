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

class MainStore {
  public hearts = initialHearts;
  public percentage = initialPercentage;
  public smileys = initialSmileys;

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
    const newValues = calculateNewValues(
      {
        hearts: this.hearts,
        percentage: this.percentage,
        smileys: this.smileys,
      },
      qrCode,
    );

    this.hearts = newValues.newHearts;
    this.percentage = newValues.newPercentage;
    this.smileys = newValues.newSmileys;
  }

  public reset() {
    this.hearts = initialHearts;
    this.percentage = initialPercentage;
    this.smileys = initialSmileys;
  }
}

export const mainStore = new MainStore();
