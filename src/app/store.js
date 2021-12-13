import { configureStore } from "@reduxjs/toolkit";

import { criptoApi } from "../services/criptoAPI";
import { criptoNoticiasApi } from "../services/criptoNoticiasAPI";


export default configureStore({
    reducer: {
        [criptoApi.reducerPath]: criptoApi.reducer,
        [criptoNoticiasApi.reducerPath]: criptoNoticiasApi.reducer,
    },
});
