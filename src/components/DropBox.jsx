import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  DiJava,
  DiJsBadge,
  DiPython,
  DiHtml5,
  DiCss3,
  DiPhp,
} from "react-icons/di";
import { SiTypescript, SiCplusplus, SiC } from "react-icons/si";
import { BsFillDiamondFill, BsRocketTakeoffFill } from "react-icons/bs";

function DropBox(props) {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone();

  console.log(acceptedFiles);

  const getFileIcon = (extension) => {
    switch (extension) {
      case "py":
        return <DiPython className="text-xl" color="#F2C337" />;
      case "php":
        return <DiPhp className="text-xl" color="#474A8A" />;
      case "css":
        return <DiCss3 className="text-xl" color="#126AAB" />;
      case "java":
        return <DiJava className="text-xl" color="#E68A10" />;
      case "html":
        return <DiHtml5 className="text-xl" color="#D84924" />;
      case "cpp":
        return <SiCplusplus className="text-xl" color="#F2C337" />;
      case "js":
        return <DiJsBadge className="text-xl" color="#E4B423" />;
      case "ts":
        return <SiTypescript className="text-xl" color="#2F72BC" />;
      default:
        return <BsFillDiamondFill className="text-xl" color="#ff0000" />;
    }
  };

  const files = acceptedFiles.map((file, i) => {
    const fileExtension = file.name.split(".").pop(); // Extract the file extension

    const getFileBorderColor = (extension) => {
      switch (extension) {
        case "php":
          return "#474A8A";
        case "css":
          return "#126AAB";
        case "java":
          return "#E68A10";
        case "html":
          return "#D84924";
        case "py":
        case "cpp":
          return "#F2C337";
        case "js":
          return "#E4B423";
        case "ts":
          return "#2F72BC";
        default:
          return "#000000"; // Default border color for other file extensions
      }
    };

    return (
      <li
        key={file.path}
        className={`tracking-tighter text-sm font-bold border w-fit px-2 py-1 gap-2 flex items-center bg-primaryText rounded-lg`}
        style={{ borderColor: getFileBorderColor(fileExtension) }}
      >
        <p>{i + 1 + "."}</p>
        {getFileIcon(fileExtension)}
        <p>{file.path}</p>
      </li>
    );
  });

  const getLangRuntime = async (file) => {
    const response = await fetch("https://emkc.org/api/v2/piston/runtimes");
    const jsonData = await response.json();

    console.log(jsonData);
  };

  const handleGenerateReport = async () => {
    const executeArray = [];

    files.forEach((file, i) => {
      const langRuntime = getLangRuntime(file);

      // const args = {
      //   language: file.name.split(".").pop(),
      //   version: "15.10.0",
      //   files: [
      //     {
      //       name: "my_cool_code.js",
      //       content: "console.log(process.argv)",
      //     },
      //   ],
      //   stdin: "",
      //   args: ["1", "2", "3"],
      //   compile_timeout: 10000,
      //   run_timeout: 3000,
      //   compile_memory_limit: -1,
      //   run_memory_limit: -1,
      // };
    });
  };

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
        <p
          className={`text-center text-xl font-medium ${
            isDragActive ? "text-accent2" : "text-primaryText"
          }`}
        >
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
      <div className="w-full text-center">
        <button
          className="px-6 py-2 text-purple-100 rounded bg-gradient-to-r from-primary via-hover to-link border border-accent hover:from-link hover:to-primary font-semibold text-lg"
          onClick={() => {
            handleGenerateReport();
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
            <ul className="flex flex-wrap gap-x-5 gap-y-2">{files}</ul>
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
