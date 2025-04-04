import React from "react";
import ReactMarkdown from "react-markdown";

const ResponseDisplay = ({ responseText })=>{
   
return (
    <section className="p-5 bg-white shadow-md rounded-lg leading-7 my-4 border border-gray-300">
        <h2 className="flex justify-center text-xl pb-5 font-bold text-blue-600 border-b border-gray-200 mb-4">Response</h2>
        <div className="text-gray-800 overflow-auto max-h-[500px]">
            <ReactMarkdown className="font-inconsolata lg:text-base/9 md:text-[22px]/8 sm:text-base/7 prose max-w-none" children={responseText} /> 
        </div>
    </section>
  );
};
    
export default ResponseDisplay;
