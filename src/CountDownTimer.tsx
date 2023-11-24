import React, {useState, useEffect, useCallback} from 'react';
import {formatDays, formatHours, formatMinutes, formatMonths, formatSeconds, formatYears} from "./datesHelpers";

interface CountdownTimerProps {
    targetDate: string; // Формат: 'YYYY-MM-DD'
    dateName: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, dateName }) => {
    const calculateTimeRemaining = useCallback(() => {
        const targetTime = new Date(targetDate).getTime();
        const currentTime = new Date().getTime();

        const timeDifference = currentTime - targetTime;

        const seconds = Math.floor((timeDifference / 1000) % 60);
        const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30.44); // assuming an average month length
        const years = Math.floor(months / 12);

        setRemainingTime({
            years,
            months: months % 12,
            days: days % 30,
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
