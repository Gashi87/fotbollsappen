import { useEffect, useState } from "react";
import { getLeagues, League } from "../services/footballService";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
    const [leagues, setLeagues] = useState<League[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { t } = useTranslation();

    useEffect(() => {
        getLeagues()
            .then(setLeagues)
            .catch(console.error);
    }, []);

    const filteredLeagues = leagues.filter((league) =>
        league.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 max-w-6xl mx-auto">
            {/* Titel */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-green-700 mt-10">
                ⚽ {t("home.title")}
            </h1>

            {/* Sökfält */}
            <div className="flex justify-center">
                <input
                    type="text"
                    placeholder={t("home.searchPlaceholder")}
                    className="w-full sm:w-2/3 md:w-1/2 px-5 py-3 border border-gray-300 rounded-full bg-white text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Ligor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredLeagues.map((league) => (
                    <Link to={`/league/${league.id}`} key={league.id}>
                        <div className="bg-white hover:bg-green-50 p-6 rounded-xl shadow-md transition-all duration-200 flex flex-col items-center text-center border border-gray-100">
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                <img
                                    src={league.emblem || "https://via.placeholder.com/40x40?text=⚽"}
                                    alt={league.name}
                                    className="w-10 h-10 object-contain"
                                />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800">{league.name}</h2>
                            <p className="text-sm text-gray-500">{league.area.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
            {/* Ingen träff */}
            {filteredLeagues.length === 0 && (
                <p className="text-center text-gray-400 italic">{t("home.noResults")}</p>
            )}
        </div>
    );
};

export default Home;
