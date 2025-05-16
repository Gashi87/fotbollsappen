export interface LiveMatch {
    fixture: {
        id: number;
        date: string;
        status: { long: string };
    };
    teams: {
        home: { name: string; logo: string };
        away: { name: string; logo: string };
    };
    goals: {
        home: number;
        away: number;
    };
}
