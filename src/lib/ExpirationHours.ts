
type ExpirationHoursProps = {
    time: string;
    value: number | null;
}[]

export const expirationHours:ExpirationHoursProps = [
    { time: "1 godzina", value: 1 },
    { time: "2 godziny", value: 2 },
    { time: "5 godzin", value: 5 },
    { time: "12 godzin", value: 12 },
    { time: "24 godziny", value: 24 },
    { time: "72 godziny", value: 72 },
    { time: "168 godzin", value: 168 },
    { time: "Nigdy", value: null },
]