export const getTranslations = async (lang: string) => {
  const normalizedLang = lang.toLowerCase();
  let menu;
  try {
    menu = await import(`../../config/menu.${normalizedLang}.json`);
  } catch (error) {
    menu = await import(`../../config/menu.en.json`);
  }

  return { ...menu.default,  };
};
