import { createContext } from "react";

export const BabyProductContext = createContext({
    babyProducts: [],
    setBabyProducts: () => {},
});
