import { createContext, useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
const LanguageContext = createContext();

export function useLanguage() {
    return useContext(LanguageContext);
}

export function LanguageProvider({ children }) {
    const {i18n} = useTranslation();
    const [language, setLanguage] = useState(i18n.language)
    const toggleLanguage = () => {
        setLanguage(prev => (prev === 'en' ? 'ar' : 'ar'))
    }
    useEffect(() => {
        setLanguage(i18n.language);
        console.log("Language changed!");
        console.log(i18n.language);
        const direction = language === 'en' ? 'ltr' : 'rtl';
        document.documentElement.dir = direction;
    }, [language,toggleLanguage])
    
    return (
        <LanguageContext.Provider value={{ language,toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}