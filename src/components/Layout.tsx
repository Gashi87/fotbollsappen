import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <header className="bg-white shadow sticky top-0 z-50">
                <div className="w-full px-4 py-4 flex items-center justify-between">
                {/* Vänster: logga + knapp */}
                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            className="text-2xl font-extrabold text-green-600 hover:text-green-700 transition"
                        >
                            ⚽ Fotbollsappen
                        </Link>

                        <Link
                            to="/matchcenter"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition shadow"
                        >
                            {t("home.viewMatches")}
                        </Link>
                    </div>

                    {/* Höger: språkväxlare */}
                    <LanguageSwitcher />
                </div>
            </header>

            <main className="w-full px-4 py-8">{children}</main>
        </div>
    );
};

export default Layout;
