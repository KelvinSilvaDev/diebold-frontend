import React from "react";
import { ClientProvider } from "./ClientContext";
import { Provider } from 'react-redux';

import store from "../store";


function AppProvider({children}){
    return (
        <ClientProvider>
                {children}
            {/* <Provider store={store}>
            </Provider> */}
        </ClientProvider>
    )
}
export default AppProvider