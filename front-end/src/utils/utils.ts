const removeUnderScoreFromString = (string: string) => {
  return string.replace("_", " ");
};

const getColorForRating = (score: string) => {
  switch (score.toLowerCase()) {
    case "high":
      return "text-green-800";
    case "medium":
      return "text-orange-500";
    case "low":
      return "text-red-600";
    default:
      return "";
  }
};

export { removeUnderScoreFromString, getColorForRating };
