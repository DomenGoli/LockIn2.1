export function getDateFormat(date: Date | number) {
        return new Intl.DateTimeFormat("sl-SI", {
            day: "numeric",
            month: "long",
            year: "numeric",
            weekday: "short",
        }).format(date);
    }

export function getShortDateFormat(date: Date | number | undefined) {
        return new Intl.DateTimeFormat("sl-SI", {
            day: "numeric",
            month: "numeric",
            year: "numeric"
        }).format(date);
    }