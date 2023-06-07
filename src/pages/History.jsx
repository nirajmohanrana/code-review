import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useReducer, useState } from "react";
import db, { auth } from "../firebase";
import { Link } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import HistoryCard from "../components/HistoryCard";

const History = () => {
  const [user, setUser] = useState(null);
  const [reportsData, setReportData] = useState([]);

  useEffect(() => {
    const authChange = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      }
    });

    return authChange;
  }, [user]);

  useEffect(() => {
    const fetchReport = async () => {
      if (user) {
        const q = query(collection(db, user?.uid));

        const querySnapshot = await getDocs(q);

        const reportsDataTemp = [];

        querySnapshot.forEach((doc) => {
          reportsDataTemp.push(doc.data());
        });

        setReportData(reportsDataTemp);
      }
    };

    console.log(reportsData);
    fetchReport();
  }, [user]);

  return (
    <>
      {user ? (
        reportsData?.length > 0 ? (
          <div className="px-8 py-5">
            {reportsData.map((reports, i) => {
              return <HistoryCard key={i} reports={reports} i={i} />;
            })}
          </div>
        ) : (
          <Link to="/" className="text-primaryText">
            <span className="underline">Generate Report</span> to View History
          </Link>
        )
      ) : (
        <div className="w-full h-screen flex justify-center">
          <Link to="/sign-in" className="text-primaryText">
            <span className="underline">Sign In</span> to View History
          </Link>
        </div>
      )}
    </>
  );
};

export default History;
