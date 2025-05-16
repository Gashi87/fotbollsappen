import axios from "axios";
import { Match } from "../types/Match";

console.log("footballService loaded!");

const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;

const api = axios.create({
    baseURL: "/api/v4",
    headers: { "X-Auth-Token": API_KEY },
});

export interface League {
    id: number;
    name: string;
    area: {
        name: string;
    };
    emblem?: string;
}

export const getLeagues = async (): Promise<League[]> => {
    const res = await api.get("/competitions");
    return res.data.competitions;
};

export const getLeagueDetails = async (id: string) => {
    const res = await api.get(`/competitions/${id}/standings`);
    return res.data;
};

export const getTeamDetails = async (teamId: string | number) => {
    const res = await api.get(`/teams/${teamId}`);
    return res.data;
};

export const getTeamMatches = async (teamId: string | number) => {
    const res = await api.get(`/teams/${teamId}/matches?limit=5`);
    return res.data.matches;
};

export const getMatchesByDate = async (date: string): Promise<Match[]> => {
    const res = await api.get(`/matches?dateFrom=${date}&dateTo=${date}`);
    console.log("Svar från Football-Data:", res.data); // 🐞 viktigt!
    return res.data.matches;
};

