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
  errorDim:    "#FF4D6A20",
  errorMid:    "#FF4D6A40",
  warning:     "#FFB020",              // Amber for warnings
  warningDim:  "#FFB02020",
  warningMid:  "#FFB02040",
  info:        "#4D9EFF",              // Blue for info
  infoDim:     "#4D9EFF20",
  infoMid:     "#4D9EFF40",
  
  // Accents
  purple:      "#A259FF",              // Purple accent
  purpleDim:   "#A259FF20",
  purpleMid:   "#A259FF40",
  
  // Legacy aliases (for backward compatibility)
  green:       "#00C374",
  greenDim:    "#00C37420",
  greenMid:    "#00C37440",
  red:         "#FF4D6A",
  amber:       "#FFB020",
  
  gradient:    "linear-gradient(135deg, rgb(224, 24, 91) 0%, #A259FF 100%)",
} as const;

export type ColorKey = keyof typeof colors;
