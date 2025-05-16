import axios from "axios";

const API_KEY = import.meta.env.VITE_SPORTS_LIVE_API_KEY;

const api = axios.create({
    baseURL: "https://api-football-v1.p.rapidapi.com/v3",
    headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
});

export const getLiveMatches = async () => {
    const res = await api.get("/fixtures?live=all");
    return res.data.response;
};

export const getMatchEvents = async (fixtureId: number) => {
    const res = await api.get(`/fixtures/events?fixture=${fixtureId}`);
    return res.data.response;
};
