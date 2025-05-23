import React, { createContext, useContext, useState } from "react";

const PentagramContext = createContext();

export const PentagramProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  const [inputs, setInputs] = useState(["", "", "", "", ""]);

  const updateInput = (value) => {
    setInputs((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const resetField = (fieldIndex) => {
    setInputs((prev) => {
      const updated = [...prev];
      updated[fieldIndex] = "";
      return updated;
    });
  };

  const resetAllFields = () => {
    setInputs(["", "", "", "", ""]);
  };

  const pentaPrompts = [
    {
      name: "persona",
      tooltip:
        "Can you tell me a little bit about yourself?",
      placeholder:
          "You are a Product Owner, Scrum Master, UI/UX Designer, Web Developer, or" +
        "Data Scientist who is at the beginning of your career and is looking to apply" +
        "what you've learned to build practical experience to help you get noticed in" +
        "the job market.",
    },
    {
      name: "context",
      tooltip:
        "What type of background information can you provide? ",
      placeholder:
          "The information provided should assume that I am a Frontend Web Developer" +
        "who understands the technical aspects of what is needed to build websites." +
        "But, I have not worked in team projects with individuals in different roles.",
    },
    {
      name: "task",
      tooltip:
        "What would you like me to do?",
      placeholder:
          "Provide a list of websites for organizations that provide programs and" +
        "services which will help me transform what I've learned into experience that" +
        "other job applicants will not have.",
    },
    {
      name: "output",
      tooltip:
        "Is there a tone or format in how you would like me to respond?",
      placeholder:
          "The tone should be informal and the list of websites should include a link" +
        "to the site, it's name, and cost information.",
    },
    {
      name: "constraint",
      tooltip:
        "What boundries or limits would you like me to honor?",
      placeholder:
          "Avoid generating lots of text only a summary of the websites are needed. Also," +
        "responses should be tailored to readers with a high school level of education." +
        "Avoid overly technical responses.",
    },
  ];

  return (
    <PentagramContext.Provider
      value={{
        index,
        setIndex,
        inputs,
        updateInput,
        pentaPrompts,
        resetField,
        resetAllFields,
      }}
    >
      {children}
    </PentagramContext.Provider>
  );
};

export const usePentagram = () => {
  return useContext(PentagramContext);
};
``