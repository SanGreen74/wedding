import React, {useState, useEffect, useCallback} from 'react';
import {formatDays, formatHours, formatMinutes, formatMonths, formatSeconds, formatYears} from "./datesHelpers";

interface CountdownTimerProps {
    targetDate: string; // Формат: 'YYYY-MM-DD'
    dateName: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, dateName }) => {
    const calculateTimeRemaining = useCallback(() => {
        const startDate = new Date(targetDate);
        const endDate = new Date();

        const millisecondsDifference = endDate.getTime() - startDate.getTime();

        const secondsDifference = Math.floor(millisecondsDifference / 1000);
        const minutesDifference = Math.floor(secondsDifference / 60);
        const hoursDifference = Math.floor(minutesDifference / 60);

        const startYear = startDate.getFullYear();
        const endYear = endDate.getFullYear();
        const startMonth = startDate.getMonth();
        const endMonth = endDate.getMonth();
        const startDay = startDate.getDate();
        const endDay = endDate.getDate();

        const years = endYear - startYear;
        const months = (endMonth - startMonth + (years * 12)) % 12;
        const days = endDay - startDay;

        const hours = hoursDifference % 24;
        const minutes = minutesDifference % 60;
        const seconds = secondsDifference % 60;

        setRemainingTime({
            years,
            months,
            days,
            hours,
            minutes,
            seconds,
        });
    }, [targetDate]);

    const [remainingTime, setRemainingTime] = useState({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const intervalId = setInterval(calculateTimeRemaining, 1000);

        // Завершаем интервал при размонтировании компонента
        return () => clearInterval(intervalId);
    }, [calculateTimeRemaining]);

    return (
        <>
            <p style={{marginBottom: '-10px'}}>С момента <b>{dateName}</b> прошло:</p>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <p style={{marginRight: '10px'}}>{remainingTime.years} {formatYears(remainingTime.years)}</p>
                <p style={{marginRight: '10px'}}>{remainingTime.months} {formatMonths(remainingTime.months)}</p>
                <p style={{marginRight: '10px'}}>{remainingTime.days} {formatDays(remainingTime.days)}</p>
                <p style={{marginRight: '10px'}}>{remainingTime.hours} {formatHours(remainingTime.hours)}</p>
                <p style={{marginRight: '10px'}}>{remainingTime.minutes} {formatMinutes(remainingTime.minutes)}</p>
                <p>{remainingTime.seconds} {formatSeconds(remainingTime.seconds)}</p>
            </div>
        </>
    );
};

export default CountdownTimer;
