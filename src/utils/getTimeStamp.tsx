export default function getTimeStamp(): string {
  const time = new Date();
  return time.toLocaleTimeString();
}
