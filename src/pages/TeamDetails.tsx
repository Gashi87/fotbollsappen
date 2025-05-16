import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTeamDetails, getTeamMatches } from "../services/footballService";
import { useTranslation } from "react-i18next";


const TeamDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [team, setTeam] = useState<any>(null);
    const [matches, setMatches] = useState<any[]>([]);
    const { t } = useTranslation();


    useEffect(() => {
        if (!id) return;

        getTeamDetails(id)
            .then(setTeam)
            .catch(console.error);

        getTeamMatches(id)
            .then(setMatches)
            .catch(console.error);
    }, [id]);

    if (!team) return <div>{t("team.loading")}</div>;

    return (
        <div className="space-y-8">
            <Link to="/" className="text-blue-500 hover:underline">← {t("team.backToLeagues")}</Link>


            {/* Laginfo */}
            <div className="flex items-center gap-8">
                <img src={team.crest} alt={team.name} className="w-20 h-20 object-contain" />
                <h1 className="text-3xl font-bold">{team.name}</h1>
            </div>

            {/* Grundinfo */}
            <ul className="text-gray-700 space-y-2">
                <li><strong>{t("team.founded")}:</strong> {team.founded}</li>
                <li><strong>{t("team.venue")}:</strong> {team.venue}</li>
                <li><strong>{t("team.colors")}:</strong> {team.clubColors}</li>
                <li><strong>{t("team.website")}:</strong> <a href={team.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{team.website}</a></li>
            </ul>

            {/* Trupp */}
            <div>
                <h2 className="text-2xl font-semibold mt-8 mb-4">{t("team.squad")}</h2>
                {team.squad.length > 0 ? (
                    <ul className="space-y-2">
                        {team.squad.map((player: any) => (
                            <li key={player.id} className="border-b pb-2">
                                <Link
                                    to={`/player/${player.id}`}
                                    state={{ player, teamName: team.name }}
                                    className="text-blue-600 hover:underline"
                                >
                                    {player.name} - {player.position} ({player.nationality})
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 italic">{t("team.noSquad")}</p>
                )}


            </div>

            {/* Matcher */}
            <div>
                <h2 className="text-2xl font-semibold mt-8 mb-4">{t("team.recentMatches")}</h2>
                {matches.length > 0 ? (
                    <ul className="space-y-2">
                        {matches.map((match) => (
                            <li key={match.id}>
                                {match.homeTeam.name} {match.score.fullTime.home} - {match.score.fullTime.away} {match.awayTeam.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 italic">{t("team.noMatches")}</p>
                )}
            </div>
        </div>
    );
};

export default TeamDetails;
