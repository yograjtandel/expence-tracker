import { configureStore } from "@reduxjs/toolkit";

import ExpencesSlice from "./expences-slice";


const Store = configureStore({
    reducer:{expences: ExpencesSlice}
});

export default Store;