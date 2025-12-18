export default function (hours) {
  if (hours <= 24) {
    return `${hours}시간 전`;
  }

  if (hours > 24 && hours < 24 * 30) {
    const days = Math.round(hours / 24);
    return `${days}일 전`;
  }
  if (hours > 24 * 30) {
    const months = Math.round(hours / (24 * 30));
    return `${months}달 전`;
  }
}
