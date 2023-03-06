import { createSlice } from "@reduxjs/toolkit";
import storage from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";

const initialState = {
  filterYear: "2022",
  filtercategory: "all",
  userID: "",
  expences: [],
};
const ExpencesSlice = createSlice({
  name: "Expences",
  initialState,
  reducers: {
    addExpence(state, action) {
      state.expences = [...state.expences, ...action.payload];
    },
    updateExpence(state, action) {
      state.expences = [...action.payload];
    },
    filter(state, action) {
      state.filterYear = action.payload.year;
      state.filtercategory = action.payload.category;
    },
    addUserId(state, action) {
      state.userID = action.payload;
      localStorage.setItem("userId", state.userID);
    },
  },
});

export const AddExpence = (expence) => {
  return async (dispatch, getState) => {
    let userId = getState().expences.userID;
    const add_expence = async () => {
      const file = expence.bill;
      const storageRef = ref(storage, uuid());
      await uploadBytes(storageRef, file)
        .then((response) => {
          return getDownloadURL(ref(storage, response.metadata.fullPath)).then(
            (url) => {
              return url;
            }
          );
        })
        .then((url) => {
          expence["billURL"] = url;
        });

      const expenceRes = await fetch(
        `https://expencetracker-b3897-default-rtdb.firebaseio.com/users/${userId}.json`,
        {
          method: "post",
          body: JSON.stringify(expence),
          headers: {
            "Content-Type": "Application/Json",
          },
        }
      );

      if (expenceRes.ok) {
        return expenceRes.json();
      } else {
        throw new Error("not able to add new expence");
      }
    };

    if (userId) {
      try {
        const res = add_expence();
        res.then((data) => {
          expence["id"] = data["name"];
          dispatch(ExpencesAction.addExpence([expence]));
        });
      } catch (error) {
        alert(error);
      }
    }
  };
};

export const ExpencesAction = ExpencesSlice.actions;
export default ExpencesSlice.reducer;
