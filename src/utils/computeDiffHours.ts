const computeDiffHours = (updatedAt: string): number => {
  if (!updatedAt) return 0;
  const updatedDate = new Date(updatedAt);
  if (isNaN(updatedDate.getTime())) return 0;
  return (Date.now() - updatedDate.getTime()) / (1000 * 60 * 60);
};

export default computeDiffHours;
