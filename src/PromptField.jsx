import React, { useEffect } from "react";
import { usePentagram } from "./PentagramContext.jsx";

const PromptField = ({
  personaPrompt,
  setPersonaPrompt,
  setContextPrompt,
  setTaskPrompt,
  setOutputPrompt,
  setConstraintPrompt,
  contextPrompt,
  taskPrompt,
  outputPrompt,
  constraintPrompt,
}) => {
  const { index, pentaPrompts } = usePentagram();

  // Load data from localStorage on component mount
  useEffect(() => {
    // Only load from localStorage if the current values are empty
    if (!personaPrompt) {
      const savedPersonaPrompt = localStorage.getItem("personaPrompt");
      if (savedPersonaPrompt) {
        setPersonaPrompt(savedPersonaPrompt);
      }
    }

    if (!contextPrompt) {
      const savedContextPrompt = localStorage.getItem("contextPrompt");
      if (savedContextPrompt) {
        setContextPrompt(savedContextPrompt);
      }
    }

    if (!taskPrompt) {
      const savedTaskPrompt = localStorage.getItem("taskPrompt");
      if (savedTaskPrompt) {
        setTaskPrompt(savedTaskPrompt);
      }
    }

    if (!outputPrompt) {
      const savedOutputPrompt = localStorage.getItem("outputPrompt");
      if (savedOutputPrompt) {
        setOutputPrompt(savedOutputPrompt);
      }
    }

    if (!constraintPrompt) {
      const savedConstraintPrompt = localStorage.getItem("constraintPrompt");
      if (savedConstraintPrompt) {
        setConstraintPrompt(savedConstraintPrompt);
      }
    }
  }, [
    personaPrompt,
    contextPrompt,
    taskPrompt,
    outputPrompt,
    constraintPrompt,
    setPersonaPrompt,
    setContextPrompt,
    setTaskPrompt,
    setOutputPrompt,
    setConstraintPrompt,
  ]);

  const handlePersonaChange = (e) => {
    setPersonaPrompt(e.target.value);
    localStorage.setItem("personaPrompt", e.target.value);
  };

  const handleContextChange = (e) => {
    setContextPrompt(e.target.value);
    localStorage.setItem("contextPrompt", e.target.value);
  };

  const handleTaskChange = (e) => {
    setTaskPrompt(e.target.value);
    localStorage.setItem("taskPrompt", e.target.value);
  };

  const handleOutputChange = (e) => {
    setOutputPrompt(e.target.value);
    localStorage.setItem("outputPrompt", e.target.value);
  };

  const handleConstraintChange = (e) => {
    setConstraintPrompt(e.target.value);
    localStorage.setItem("constraintPrompt", e.target.value);
  };

  return (
    <div className="prompt-field flex flex-row items-center justify-center  max-sm:justify-start max-sm:w-full">
      {pentaPrompts[index].name === "persona" ? (
        <textarea
          className="border-3 h-80 border-blue-300 rounded-lg text-blue-350 w-full"
          placeholder={pentaPrompts[index].placeholder}
          value={personaPrompt}
          required={true}
          onChange={handlePersonaChange}
        />
      ) : null}
      {pentaPrompts[index].name === "context" ? (
        <textarea
          className="border-3 h-80 border-blue-300 rounded-lg text-blue-350 w-full"
          placeholder={pentaPrompts[index].placeholder}
          value={contextPrompt}
          required={true}
          onChange={handleContextChange}
        />
      ) : null}
      {pentaPrompts[index].name === "task" ? (
        <textarea
          className="border-3 h-80 border-blue-300 rounded-lg text-blue-350 w-full"
          placeholder={pentaPrompts[index].placeholder}
          value={taskPrompt}
          required={true}
          onChange={handleTaskChange}
        />
      ) : null}
      {pentaPrompts[index].name === "output" ? (
        <textarea
          className="border-3 h-80 border-blue-300 rounded-lg text-blue-350 w-full"
          placeholder={pentaPrompts[index].placeholder}
          value={outputPrompt}
          required={true}
          onChange={handleOutputChange}
        />
      ) : null}
      {pentaPrompts[index].name === "constraint" ? (
        <textarea
          className="border-3 h-80 border-blue-300 rounded-lg text-blue-350 w-full"
          placeholder={pentaPrompts[index].placeholder}
          value={constraintPrompt}
          required={true}
          onChange={handleConstraintChange}
        />
      ) : null}
    </div>
  );
};
export default PromptField;
