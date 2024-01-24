import { createContext } from "react";

type AllLocales = {
  en: MyLocale;
  es: MyLocale;
};
export type MyLocale = {
  locale: string;
  title: string;
  day: string;
  month: string;
  year: string;
  abreviations: {
    day: string;
    month: string;
    year: string;
  };
  errors: {
    day: string;
    month: string;
    year: string;
    checkDay: {
      start: string;
      middle: string;
      end: string;
    };
  };
  plurals: {
    day: string;
    month: string;
    year: string;
  };
  digitError: string;
};
const defaultLocale: MyLocale = {
  locale: "en",
  title: "Age App Calculator",
  day: "day",
  month: "month",
  year: "year",
  abreviations: {
    day: "DD",
    month: "MM",
    year: "YYYY",
  },
  errors: {
    day: "Must be a valid day",
    month: "Must be a valid month",
    year: "Must be in the past",
    checkDay: {
      start: "The last day of",
      middle: "is the",
      end: "th",
    },
  },
  plurals: {
    day: "days",
    month: "months",
    year: "years",
  },
  digitError: "Only digits allowed!",
};
const esLocale: MyLocale = {
  locale: "es",
  title: "Calculadora de Edad",
  day: "dia",
  month: "mes",
  year: "año",
  abreviations: {
    day: "DD",
    month: "MM",
    year: "AAAA",
  },
  errors: {
    day: "Tiene que ser un dia valido",
    month: "Tiene que ser un mes valido",
    year: "Tiene que estar en el pasado",
    checkDay: {
      start: "El ultimo dia de",
      middle: "es el",
      end: "",
    },
  },
  plurals: {
    day: "dias",
    month: "meses",
    year: "años",
  },
  digitError: "Solo se permiten digitos",
};
const allLocales: AllLocales = {
  en: defaultLocale,
  es: esLocale,
};
export const LangContext = createContext(allLocales);
