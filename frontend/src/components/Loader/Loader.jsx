import React from "react";
import { ClipLoader } from "react-spinners";

const Loader=()=>{
    return (<>

    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)]">
      <ClipLoader color="#3B82F6" size={100} />
      <h1 className="font-black">Loading</h1>
    </div>
    
    </>
    );
};
export default Loader;