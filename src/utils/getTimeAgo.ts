const HOURS_PER_DAY = 24;
const HOURS_PER_MONTH = HOURS_PER_DAY * 30;

export default function getTimeAgo(hours: number): string {
  if (hours <= HOURS_PER_DAY) {
    return `${Math.floor(hours)}시간 전`;
  }

  if (hours <= HOURS_PER_MONTH) {
    const days = Math.round(hours / HOURS_PER_DAY);
    return `${days}일 전`;
  }

  const months = Math.round(hours / HOURS_PER_MONTH);
  return `${months}달 전`;
}
