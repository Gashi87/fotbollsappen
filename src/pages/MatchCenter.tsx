import { Match } from "../types/Match";
import { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import { getMatchesByDate } from "../services/footballService";
import { useTranslation } from "react-i18next";

const MatchCenter = () => {
    const { t } = useTranslation();
    const [scheduledMatches, setScheduledMatches] = useState<Match[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
    const [selectedCompetition, setSelectedCompetition] = useState<string>("Alla");

    useEffect(() => {
        getMatchesByDate(selectedDate)
            .then(data => {
                setScheduledMatches(data);
            })
            .catch(error => {
                console.error("Fel vid hämtning av matcher:", error);
            });
    }, [selectedDate]);

    // Lista unika turneringar
    const uniqueCompetitions = Array.from(
        new Set(scheduledMatches.map((match) => match.competition.name))
    );

    // Filtrera efter vald turnering
    const filteredMatches =
        selectedCompetition === "Alla"
            ? scheduledMatches
            : scheduledMatches.filter((match) => match.competition.name === selectedCompetition);

    return (
        <div className="space-y-10 p-4 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-center">{t("matches.title")}</h1>

            {/* Filter: Datum */}
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

            {/* Filter: Turnering */}
            {uniqueCompetitions.length > 1 && (
                <div className="flex justify-center">
                    <select
                        value={selectedCompetition}
                        onChange={(e) => setSelectedCompetition(e.target.value)}
                        className="border px-3 py-2 rounded"
                    >
                        <option value="Alla">{t("matches.allCompetitions")}</option>
                        {uniqueCompetitions.map((comp) => (
                            <option key={comp} value={comp}>
                                {comp}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Matchlista */}
            <div>
                <h2 className="text-2xl font-semibold mt-6 mb-4">{t("matches.scheduled")}</h2>
                {filteredMatches.length === 0 ? (
                    <p className="text-center text-gray-500">{t("matches.noMatches")}</p>
                ) : (
                    <ul className="space-y-4">
                        {filteredMatches.map((match) => (
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
        </div>
    );
};

export default MatchCenter;
