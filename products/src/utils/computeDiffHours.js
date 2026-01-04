const computeDiffHours = (updatedAt) => {
  if (!updatedAt) return 0;
  const updatedDate = new Date(updatedAt);
  if (!updatedDate) return 0;
  return (new Date() - updatedDate) / (1000 * 60 * 60);
};

export default computeDiffHours;
