import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { BiLoaderCircle } from "react-icons/bi";
import { FcDeleteDatabase } from "react-icons/fc";

import FileCard from "./FileCard";
import axios from "axios";
import ReportCard from "./ReportCard";
import { onAuthStateChanged } from "firebase/auth";
import db, { auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function DropBox() {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone();

  const [files, setFiles] = useState([]);
  const [Array, setArray] = useState([]);
  const [isReqsFormed, setISReqsFormed] = useState(false);
  const [reports, setReports] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const [user, setUser] = useState(null);

  const getLanguageVersion = async (fileExtn) => {
    const response = await axios.get("https://emkc.org/api/v2/piston/runtimes");
    const languages = response.data;

    let tempArgs = [];

    languages?.forEach((language, i) => {
      language?.aliases.forEach((alias) => {
        if (alias === fileExtn) {
          tempArgs.push({
            language: languages[i].language,
            version: languages[i].version,
          });
        }
      });
    });

    return tempArgs;
  };

  const handleGenerateReport = async (files) => {
    setISReqsFormed(true);

    const promises = files.map(async (file) => {
      const fileExtn = file.name.split(".").pop();
      const reader = new FileReader();
      const result = await getLanguageVersion(fileExtn);

      return new Promise((resolve) => {
        reader.onload = () => {
          const post = {
            language: result[0]?.language.toString(),
            version: result[0]?.version.toString(),
            files: [
              {
                name: file.name.toString(),
                content: reader.result.toString(),
              },
            ],
            stdin: "",
            args: ["1", "2", "3"],
            compile_timeout: 10000,
            run_timeout: 3000,
            compile_memory_limit: -1,
            run_memory_limit: -1,
          };

          resolve(post);
        };

        reader.readAsText(file);
      });
    });

    const posts = await Promise.all(promises);

    setArray((prevContents) => [...prevContents, ...posts]);
  };

  const executePiston = async (postData, maxRetries = 3, delay = 5000) => {
    try {
      const response = await axios.post(
        `https://emkc.org/api/v2/piston/execute`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 429 && maxRetries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return executePiston(postData, maxRetries - 1, delay * 2);
      }
      throw error;
    }
  };

  useEffect(() => {
    console.log(Array);
    if (isReqsFormed && Array.length > 0) {
      const responses = [];

      const executeRequests = async () => {
        for (let i = 0; i < Array.length; i++) {
          try {
            const data = await executePiston(Array[i]);
            console.log(data);
            responses.push(data);
          } catch (error) {
            console.error(error);
          }
        }

        console.log("responses:\n", responses);
        setReports(responses);
      };

      executeRequests();
    }
  }, [Array]);

  useEffect(() => {
    if (user && reports.length > 0) {
      const filesNames = [];

      files.forEach((file) => {
        filesNames.push(file.name);
      });

      addDoc(collection(db, user.uid), {
        files: filesNames,
        reports: JSON.stringify(reports),
        time: serverTimestamp(),
      }).then(() => {
        console.log("saved");
      });
    }
  }, [user, reports]);

  useEffect(() => {
    setFiles(acceptedFiles);
  }, [acceptedFiles, files]);

  useEffect(() => {
    const authChange = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      }
    });

    return authChange;
  }, [user]);

  return (
    <section>
      <div
        {...getRootProps({
          className: `p-6 border-2 border-dashed rounded-lg h-28 flex justify-center items-center my-6 ${
            isDragActive ? "border-accent" : "border-primaryText"
          }`,
        })}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-4">
          <p
            className={`text-center text-xl font-medium ${
              isDragActive ? "text-accent2" : "text-primaryText"
            }`}
          >
            Drag 'n' drop some files here, or click to select files
          </p>

          <MdOutlineDriveFolderUpload
            className={`text-center text-3xl ${
              isDragActive ? "text-accent2" : "text-primaryText"
            }`}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <button
          className={`px-6 py-2 text-purple-100 rounded bg-gradient-to-r from-primary via-hover to-link border border-accent hover:from-link hover:to-primary font-semibold text-lg duration-300 transition-all ${
            files.length > 0 ? "cursor-pointer" : "grayscale cursor-not-allowed"
          }`}
          disabled={files.length > 0 ? false : true}
          onClick={() => {
            handleGenerateReport(files);
          }}
        >
          {isReqsFormed && reports.length === 0 ? (
            <BiLoaderCircle className="animate-spin" />
          ) : (
            "🚀 Generate Report"
          )}
        </button>

        {reports.length > 0 ? (
          <button
            className="underline text-primaryText animate-pulse"
            onClick={() => {
              setShowReport(true);
            }}
          >
            Show Report
          </button>
        ) : (
          <></>
        )}
      </div>
      <aside>
        <h4 className="text-xl text-primaryText font-medium border-b">
          Files:
        </h4>
        <div className="min-h-min my-4 border border-primaryText rounded-md p-4 bg-primaryText/40 backdrop:blur-md">
          {files.length > 0 ? (
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {files.map((file, i) => {
                return <FileCard key={file.name} file={file} index={i} />;
              })}
            </div>
          ) : (
            <p className="text-xl text-primaryText font-semibold">
              Drag/Add Files into Dropzone
            </p>
          )}
        </div>
      </aside>

      {showReport ? (
        <ReportCard
          files={files}
          setShowReport={setShowReport}
          reports={reports}
        />
      ) : (
        <></>
      )}
    </section>
  );
}

export default DropBox;
