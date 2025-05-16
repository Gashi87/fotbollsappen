export interface Match {
    id: number;
    utcDate: string;
    status: string;
    competition: {
        name: string;
    };
    homeTeam: {
        name: string;
    };
    awayTeam: {
        name: string;
    };
    score: {
        fullTime: {
            home: number | null;
            away: number | null;
        };
    };
}
