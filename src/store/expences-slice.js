import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterYear: "2022",
  userID: "",
  expences: [],
};
const ExpencesSlice = createSlice({
  name: "Expences",
  initialState,
  reducers: {
    updateExpence(state, action) {
      // debugger
      state.expences = [...state.expences, ...action.payload];
    },
    filter(state, action) {
      state.filterYear = action.payload;
    },
    addUserId(state, action) {
      state.userID = action.payload;
      localStorage.setItem('userId', state.userID);
    }
  },
});

export const AddExpence = (expence) => {
  return async (dispatch, getState) => {
    let userId = getState().expences.userID;
    debugger
    const add_expence = async () => {
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
        return expenceRes.json()
      } else {
        throw new Error("not able to add new expence");
      }
    };

    if( userId ) {
      try {
        const res = add_expence();
        res.then(data=>{
          debugger
          expence['id'] = data['name'];
          dispatch(ExpencesAction.updateExpence([expence]));
        })
        debugger
      } catch (error) {
        alert(error);
      }
    }
  };
};

export const ExpencesAction = ExpencesSlice.actions;
export default ExpencesSlice.reducer;
