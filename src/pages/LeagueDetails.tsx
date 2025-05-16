import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getLeagueDetails} from "../services/footballService";
import {useTranslation} from "react-i18next";


interface TeamStanding {
    position: number;
    playedGames: number;
    won: number;
    draw: number;
    lost: number;
    points: number;
    team: {
        id: number;
        name: string;
        crest: string;
    };
}

const LeagueDetails = () => {
    const {id} = useParams();
    const [table, setTable] = useState<TeamStanding[]>([]);
    const [leagueName, setLeagueName] = useState("");
    const {t} = useTranslation();


    useEffect(() => {
        if (!id) return;

        getLeagueDetails(id)
            .then((data) => {
                console.log("Liga-detaljer:", data);
                setLeagueName(data.competition.name);
                setTable(data.standings[0]?.table || []);
            })
            .catch((err) => {
                console.error("Kunde inte hämta ligadetaljer:", err);
            });
    }, [id]);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-blue-800">{leagueName}</h2>
                <Link
                    to="/"
                    className="text-sm bg-blue-100 text-blue-800 px-4 py-2 rounded hover:bg-blue-200 transition"
                >
                    ← {t("league.backToLeagues")}
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-xl shadow-lg overflow-hidden bg-white">
                    <thead className="bg-blue-700 text-white sticky top-0 text-sm">
                    <tr>
                        <th className="p-4 text-center">#</th>
                        <th className="p-4 text-left">{t("league.team")}</th>
                        <th className="p-4 text-center">{t("league.played")}</th>
                        <th className="p-4 text-center">{t("league.won")}</th>
                        <th className="p-4 text-center">{t("league.draw")}</th>
                        <th className="p-4 text-center">{t("league.lost")}</th>
                        <th className="p-4 text-center">{t("league.points")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {table.map((team) => (
                        <tr
                            key={team.team.id}
                            className="even:bg-gray-100 hover:bg-blue-50 transition"
                        >
                            <td className="p-4 text-center font-semibold">{team.position}</td>

                            {/* 👇 Lag + logga */}
                            <td className="p-4 flex items-center gap-3">
                                <div
                                    className="w-9 h-9 bg-white rounded-full flex items-center justify-center border border-gray-300 shadow-md">
                                    <img
                                        src={team.team.crest}
                                        alt={team.team.name}
                                        className="w-6 h-6 object-contain"
                                        style={{filter: "drop-shadow(0 0 2px rgba(0,0,0,0.4))"}}
                                    />
                                </div>
                                <Link
                                    to={`/team/${team.team.id}`}
                                    className="text-sm text-gray-800 font-medium hover:underline"
                                >
                                    {team.team.name}
                                </Link>

                            </td>

                            <td className="p-4 text-center">{team.playedGames}</td>
                            <td className="p-4 text-center">{team.won}</td>
                            <td className="p-4 text-center">{team.draw}</td>
                            <td className="p-4 text-center">{team.lost}</td>
                            <td className="p-4 text-center font-bold text-green-700">{team.points}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeagueDetails;
