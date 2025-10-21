import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 7000); // hide after 2s
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null; // after 2s nothing

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-40">
      <ClipLoader
        color="#3B82F6"
        size={100}
        cssOverride={{ borderWidth: "16px" }}
      />
    </div>
  );
};

export default Loader;
