import { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import { getMatchesByDate } from "../services/footballService";
import { Match } from "../types/Match";
import { useTranslation } from "react-i18next";

const MatchDetails = () => {
    const { t } = useTranslation();
    const [matches, setMatches] = useState<Match[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));

    useEffect(() => {
        getMatchesByDate(selectedDate)
            .then(setMatches)
            .catch(console.error);
    }, [selectedDate]);

    return (
        <div className="space-y-8 p-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center">{t("matches.title")}</h1>

            {/* Filter */}
            <div className="flex gap-4 justify-center">
                <button
                    onClick={() => setSelectedDate(format(new Date(), "yyyy-MM-dd"))}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {t("matches.today")}
                </button>
                <button
                    onClick={() => setSelectedDate(format(addDays(new Date(), 1), "yyyy-MM-dd"))}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {t("matches.tomorrow")}
                </button>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border px-3 py-2 rounded"
                />
            </div>

            {/* Lista */}
            {matches.length === 0 ? (
                <p className="text-center text-gray-500">{t("matches.noMatches")}</p>
            ) : (
                <ul className="space-y-4">
                    {matches.map((match) => (
                        <li
                            key={match.id}
                            className="border rounded-lg p-4 bg-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between"
                        >
                            <div>
                                <p className="font-semibold">{match.competition.name}</p>
                                <p>
                                    {new Date(match.utcDate).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-lg">
                                    {match.homeTeam.name} vs {match.awayTeam.name}
                                </p>
                                <p className="text-gray-700">
                                    {match.score.fullTime.home ?? "-"} : {match.score.fullTime.away ?? "-"}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MatchDetails;
