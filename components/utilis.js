export function convertToMintes(milliseconds) {
    const minutes = milliseconds / 60000;
    const minutesString = Math.floor(minutes).toString();
    const secondsString = ((minutes % 1) * 60).toFixed(0).toString().padStart(2, '0');
    return `${minutesString}:${secondsString}`;
}