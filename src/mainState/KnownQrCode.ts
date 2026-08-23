export type KnownQrCode = HeartQrCode | PercentageQrCode | SmileyQrCode;

interface HeartQrCode {
  amount: -1 | 1;
  type: "heart";
}

interface PercentageQrCode {
  amount: number;
  type: "percentage";
}

interface SmileyQrCode {
  amount: -1 | 1;
  type: "smiley";
}
