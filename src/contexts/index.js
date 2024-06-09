import { createContext } from "react";

export const ProfileContextAndUserPurchases = createContext({
    loadProfile: false,
    setLoadProfile:() =>{},
    userPurchaseDetails:[],
    setUserPurchaseDetails: () =>{}
});
