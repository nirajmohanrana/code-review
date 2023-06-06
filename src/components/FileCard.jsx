import React from "react";
import {
  DiJava,
  DiJsBadge,
  DiPython,
  DiHtml5,
  DiCss3,
  DiPhp,
} from "react-icons/di";
import { SiTypescript, SiCplusplus, SiC } from "react-icons/si";
import { BsFillDiamondFill } from "react-icons/bs";

const FileCard = ({ file, index }) => {
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
        return <SiCplusplus className="text-xl" color="#025797" />;
      case "js":
        return <DiJsBadge className="text-xl" color="#E4B423" />;
      case "ts":
        return <SiTypescript className="text-xl" color="#2F72BC" />;
      case "c":
        return <SiC className="text-xl" color="#025797" />;
      default:
        return <BsFillDiamondFill className="text-base" color="#ff0000" />;
    }
  };

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
      <p>{index + 1 + "."}</p>
      {getFileIcon(fileExtension)}
      <p>{file.path}</p>
    </li>
  );
};

export default FileCard;
