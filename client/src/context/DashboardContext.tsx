import { createContext, useContext } from "react";
import { UserInfo } from "../App";

export const DashboardContext = createContext<UserInfo | undefined>(undefined);

export function useUserContext() {
    const user = useContext(DashboardContext);
    if (user === undefined) {
        throw new Error("useUserContext must be use with a DashboardContext");
    }
    return user;
}
