import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={() => changeLanguage("sv")}
                className={`px-2 py-1 rounded text-sm ${
                    i18n.language === "sv" ? "bg-blue-800 text-white" : "bg-blue-100 text-blue-800"
                }`}
            >
                🇸🇪
            </button>
            <button
                onClick={() => changeLanguage("en")}
                className={`px-2 py-1 rounded text-sm ${
                    i18n.language === "en" ? "bg-blue-800 text-white" : "bg-blue-100 text-blue-800"
                }`}
            >
                EN
            </button>
        </div>
    );
};

export default LanguageSwitcher;
