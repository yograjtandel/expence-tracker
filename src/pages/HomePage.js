import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Expence from "../components/Expences/Expence";
import NewExpense from "../components/Expences/NewExpense";
import { ExpencesAction } from "../store/expences-slice";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem('userId')){
      fetch(
        `https://expencetracker-b3897-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo="${localStorage.getItem('email')}"&print=pretty`
      ).then(res => {
        if(res.ok){
          res.json().then(data => {
            dispatch(ExpencesAction.addUserId(Object.keys(data)[0]));
          })
        }
        else {
          alert("something went wrong");
        }
      });
    }
    const FetchExpences = async () => {
      return await fetch(
        `https://expencetracker-b3897-default-rtdb.firebaseio.com/users/${localStorage.getItem('userId')}.json`
      );
    };
    FetchExpences().then((res) => {
      res.json().then((data) => {
        delete data.email;
        const Expences = [];
        for ( const item in data) {
          const expence = {}
          expence['id'] = item;
          for(const key in data[item]) {
              expence[key] = data[item][key]
          }
          Expences.push(expence);
        }
        dispatch(ExpencesAction.updateExpence(Expences));
        // updateExpence(Expences.expences)
      });
    });
  }, [dispatch]);

  const expense = function addExpence(newexpence) {
    // DUMMY_EXPENSES.push(newexpence)
    // updateExpence((previousExpence) => {
    //   return [newexpence, ...previousExpence];
    // });
  };

  return (
    <div>
      <NewExpense addExpence={expense} />
      <Expence/>
    </div>
  );
}

export default HomePage;
