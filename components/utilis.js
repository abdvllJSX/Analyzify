// "use client";

export function convertToMintes(milliseconds) {
    const minutes = milliseconds / 60000;
    const minutesString = Math.floor(minutes).toString();
    const secondsString = ((minutes % 1) * 60).toFixed(0).toString().padStart(2, '0');
    return `${minutesString}:${secondsString}`;
}

export function extractYearFromDate(dateString) {
    const parts = dateString.split('-'); // Split the string into parts using the hyphen character
    return parts[0]; // Return the first part, which represents the year
}