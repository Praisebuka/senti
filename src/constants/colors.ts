export const colors = {
  bg:       "#07090F",
  surface:  "#0F1420",
  card:     "#141B2D",
  border:   "#1E2A42",
  green:    "#00C374",
  greenDim: "#00C37420",
  greenMid: "#00C37440",
  text:     "#F0F4FF",
  muted:    "#6B7A99",
  red:      "#FF4D6A",
  amber:    "#FFB020",
  blue:     "#4D9EFF",
  purple:   "#A259FF",
} as const;

export type ColorKey = keyof typeof colors;
