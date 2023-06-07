import React, { useRef } from "react";
import FileCard from "./FileCard";

import { IoMdCloseCircle } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa";

import { CopyBlock, dracula } from "react-code-blocks";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ReportCard = ({ files, reports, setShowReport }) => {
  const reportCardRef = useRef(null);

  const generatePDF = () => {
    const reportCardElement = reportCardRef.current;

    if (reportCardElement) {
      html2canvas(reportCardElement).then((canvas) => {
        const imageData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();

        pdf.addImage(imageData, "PNG", 0, 0, width, height);

        pdf.save("report.pdf");
      });
    }
  };

  return (
    <>
      <div className="fixed h-3/4 w-3/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-accent3 bg-primaryText overflow-y-scroll">
        <div className="w-full flex justify-end px-2 py-1 gap-3">
          <FaFilePdf
            className="text-2xl text-red-500 hover:scale-110 cursor-pointer mr-2"
            onClick={() => generatePDF()}
          />
          <IoMdCloseCircle
            className="text-2xl text-accent3 rounded-full hover:scale-110 cursor-pointer"
            onClick={() => {
              setShowReport(false);
            }}
          />
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 px-3 pb-2 border-b border-accent3">
          {files.map((file, i) => {
            return <FileCard key={file.name} file={file} index={i} />;
          })}
        </div>

        <div className="px-4" ref={reportCardRef}>
          {reports.map((report, i) => {
            return (
              <div className="rounded-lg overflow-hidden p-2" key={i}>
                <p className="text-xs ml-1 py-1 font-bold mb-1 border-b border-primary">
                  {report?.language + ":"}
                </p>
                <CopyBlock
                  language={report?.language}
                  text={
                    report?.run.output !== ""
                      ? report?.run.output
                      : report?.run.stderr
                  }
                  showLineNumbers={true}
                  theme={dracula}
                  wrapLines={true}
                  codeBlock
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ReportCard;
