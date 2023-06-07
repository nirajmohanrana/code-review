import React, { useState } from "react";
import HistoryFileCard from "../components/HistoryFileCard";
import HistoryReportCard from "./HistoryReportCard";

const HistoryCard = ({ reports, i }) => {
  const [showReport, setShowReport] = useState(false);

  console.log(reports);
  return (
    <div className="border border-accent3 bg-primaryText h-fit flex w-full rounded-xl px-4 py-2 gap-2 my-5">
      <p className="text-sm font-bold text-accent3">{i + 1 + "."}</p>
      <div className="flex flex-col items-start grow gap-2">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {reports?.files?.map((file, i) => {
            return <HistoryFileCard key={i} file={file} i={i} />;
          })}
        </div>
        <button
          className="border border-accent3 rounded-lg text-sm font-bold px-2 py-1 text-primary bg-accent3/60"
          onClick={() => {
            setShowReport(true);
          }}
        >
          Show Report
        </button>
      </div>
      <p className="text-xs font-mono">
        {reports?.time?.toDate().toString().split("GMT")[0]}
      </p>

      {showReport ? (
        <HistoryReportCard
          files={reports?.files}
          setShowReport={setShowReport}
          reports={reports?.reports}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default HistoryCard;
