import React from "react";
import { ClientProvider } from "./ClientContext";

function AppProvider({children}){
    return (
        <ClientProvider>
            {children}
        </ClientProvider>
    )
}
export default AppProvider