import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineDriveFolderUpload } from "react-icons/md";

import FileCard from "./FileCard";

function DropBox() {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone();

  const [Array, setArray] = useState([]);
  const [isReqsFormed, setISReqsFormed] = useState(false);

  const files = acceptedFiles;

  const getLanguageVersion = async (fileExtn) => {
    const response = await fetch("https://emkc.org/api/v2/piston/runtimes");
    const languages = await response.json();

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
    setISReqsFormed(true);
  };

  useEffect(() => {
    console.log(Array);
    if (isReqsFormed && Array.length > 0) {
      const responses = [];

      // acceptedFiles.forEach((i) => {
      //   console.log(Array[i]);

      setTimeout(() => {
        fetch("https://emkc.org/api/v2/piston/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: Array[0],
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);

            responses.push(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, 5000);
      // });

      console.log(responses);
    }
  }, [Array]);

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
      <div className="w-full text-center">
        <button
          className="px-6 py-2 text-purple-100 rounded bg-gradient-to-r from-primary via-hover to-link border border-accent hover:from-link hover:to-primary font-semibold text-lg"
          onClick={() => {
            handleGenerateReport(files);
          }}
        >
          🚀 Generate Report
        </button>
      </div>
      <aside>
        <h4 className="text-xl text-primaryText font-medium border-b">
          Files:
        </h4>
        <div className="min-h-min my-4 border border-primaryText rounded-md p-4 bg-primaryText/40 backdrop:blur-md">
          {acceptedFiles.length > 0 ? (
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {acceptedFiles.map((file, i) => {
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
    </section>
  );
}

export default DropBox;
