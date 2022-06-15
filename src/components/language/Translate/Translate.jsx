import { createRoot } from "react-dom/client";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import en from "../locales/eng/translation.json";
import ru from "../locales/ru/translation.json";
import { useSelector } from "react-redux";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
    },
    fallbackLng: "en",
    detection: {
      order: ["cookie", "querystring", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "../../language/locales/{{lng}}/translation.json",
    },
    react: { useSuspense: false },

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

const LangRender = () => {
  const lang = useSelector((state) => state.switch.lang);
  console.log(lang);
  //   const { t } = useTranslation();
  //   return <div>{t("Welcome to React")}</div>;
};

export default LangRender;
