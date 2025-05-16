import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Player } from "../types/Player";
import { useTranslation } from "react-i18next";

const PlayerDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { player, teamName } = location.state as { player: Player; teamName: string };

    const [playerImage, setPlayerImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (player.name) {
            const cacheKey = `player_image_${player.id}`;
            const cachedImage = localStorage.getItem(cacheKey);

            if (cachedImage) {
                setPlayerImage(cachedImage);
                setLoading(false);
            } else {
                const API_KEY = import.meta.env.VITE_SPORTSDB_API_KEY;
                axios
                    .get(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/searchplayers.php?p=${encodeURIComponent(player.name)}`)
                    .then((res) => {
                        const playerData = res.data.player?.[0];
                        if (playerData && playerData.strThumb) {
                            setPlayerImage(playerData.strThumb);
                            localStorage.setItem(cacheKey, playerData.strThumb);
                        }
                    })
                    .catch(console.error)
                    .finally(() => setLoading(false));
            }
        }
    }, [player.name, player.id]);

    if (!player) {
        return <div className="text-center text-red-500">{t("player.notFound")}</div>;
    }


    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
                <p className="text-sm text-gray-500">{t("common.loading")}</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto p-6 space-y-8"
        >
            {/* Tillbaka */}
            <div>
                <button
                    onClick={() => navigate(-1)}
                    className="text-blue-600 hover:underline text-sm"
                >
                    ← {t("player.backToTeam", { team: teamName || t("player.team") })}
                </button>
            </div>

            {/* Avatar eller Bild */}
            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-4 text-center sm:text-left">
                {playerImage ? (
                    <img
                        src={playerImage}
                        alt={player.name}
                        className="w-16 h-16 max-w-none max-h-none rounded-full object-cover shadow-md"
                    />
                ) : (
                    <div className="w-16 h-16 max-w-none max-h-none rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
                        {getInitials(player.name)}
                    </div>
                )}
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-800">{player.name}</h1>
            </div>


            {/* Info */}
            <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 space-y-4 border border-gray-200 text-sm sm:text-base">
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-600">{t("player.position")}:</span>
                    <span className="text-gray-800">{player.position || t("player.unknown")}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-600">{t("player.nationality")}:</span>
                    <span className="text-gray-800">{player.nationality}</span>
                </div>
                {player.dateOfBirth && (
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">{t("player.dateOfBirth")}:</span>
                        <span className="text-gray-800">
        {new Date(player.dateOfBirth).toLocaleDateString("sv-SE")}
      </span>
                    </div>
                )}
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-600">{t("player.role")}:</span>
                    <span className="text-gray-800">{player.role}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default PlayerDetails;
