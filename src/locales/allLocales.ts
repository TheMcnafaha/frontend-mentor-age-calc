import { createContext } from "react";

type AllLocales = {
  en: MyLocale;
  es: MyLocale;
};
export type MyLocale = {
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
  };
  plurals: {
    day: string;
    month: string;
    year: string;
  };
};
const defaultLocale: MyLocale = {
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
  },
  plurals: {
    day: "days",
    month: "months",
    year: "years",
  },
};
const esLocale: MyLocale = {
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
  },
  plurals: {
    day: "dias",
    month: "meses",
    year: "años",
  },
};
const allLocales: AllLocales = {
  en: defaultLocale,
  es: esLocale,
};
export const LangContext = createContext(allLocales);
