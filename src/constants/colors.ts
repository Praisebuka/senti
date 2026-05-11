export const colors = {
  // Squad Brand Colors
  primary:     "rgb(224, 24, 91)",    // Squad's signature pink/magenta
  primaryDark: "#d01856",              // Darker shade of primary
  primaryLight: "#ff4da6",             // Lighter shade of primary
  
  // Background & Surface
  bg:          "#0A0E27",              // Deep navy black
  surface:     "#141B3D",              // Slightly lighter navy
  card:        "#1a2250",              // Card background
  border:      "#2a3a6a",              // Border color
  
  // Text Colors
  text:        "#F0F4FF",              // Light text
  textSecondary: "#B0B8D4",            // Secondary text
  muted:       "#7a8aaa",              // Muted text
  
  // Semantic Colors
  success:     "#00C374",              // Green for success
  successDim:  "#00C37420",
  successMid:  "#00C37440",
  error:       "#FF4D6A",              // Red for errors
  warning:     "#FFB020",              // Amber for warnings
  info:        "#4D9EFF",              // Blue for info
  
  // Accents
  purple:      "#A259FF",              // Purple accent
  gradient:    "linear-gradient(135deg, rgb(224, 24, 91) 0%, #A259FF 100%)",
} as const;

export type ColorKey = keyof typeof colors;
