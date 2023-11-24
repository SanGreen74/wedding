export const formatYears = (years: number): string => {
    return formatNumber(years, "год", "года", "лет");
};

export const formatMonths = (months: number): string => {
    return formatNumber(months, "месяц", "месяца", "месяцев");
};

export const formatDays = (days: number): string => {
    return formatNumber(days, "день", "дня", "дней");
};

export const formatHours = (hours: number): string => {
    return formatNumber(hours, "час", "часа", "часов");
};

export const formatMinutes = (minutes: number): string => {
    return formatNumber(minutes, "минута", "минуты", "минут");
};
export const formatSeconds = (seconds: number): string => {
    return formatNumber(seconds, "секунда", "секунды", "секунд");
};

const formatNumber = (number: number, one: string, two: string, five: string): string => {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return five;
    }

    if (lastDigit === 1) {
        return one;
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return two;
    }

    return five;
}
