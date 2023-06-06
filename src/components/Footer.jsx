import React, { useEffect, useState } from "react";

const Footer = () => {
  const [runtimes, setRuntimes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://emkc.org/api/v2/piston/runtimes");
        const jsonData = await response.json();

        setRuntimes(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center mb-10">
      <h3 className="mt-4 my-1 text-primaryText font-semibold">
        Popular Languages:
      </h3>

      <p className="text-primaryText font-light">
        Java | Python | C/C++ | JavaScript
      </p>

      <h3 className="mt-4 my-1 text-primaryText font-semibold">
        We Support All Types of Languages Like:
      </h3>
      <div className="w-full py-1 overflow-hidden">
        <marquee
          className="text-primaryText sm:text-xs font-thin"
          scrollamount="3"
        >
          {runtimes?.map((runtime, i) => {
            return ` .${runtime?.language} `;
          })}
        </marquee>
      </div>
    </div>
  );
};

export default Footer;
