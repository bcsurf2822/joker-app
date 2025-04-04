import React, { useState, useEffect } from "react";
import { Circle } from "lucide-react";
import { PentagramProvider, usePentagram } from "./PentagramContext.jsx";
import PromptField from "./PromptField.jsx";
import Tooltips from "./tooltips/Tooltips.jsx";
import ResetButtons from "./ResetButtons.jsx";
import { useFetchAPi } from "./useFetchAPi.jsx";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ResponseDisplay from "./ResponseDisplay.jsx";
import "../HandleLoading.css";
import { auth } from "../../utils/firebase/firebase.js";

import ExportSinglePrompt from "./ExportSinglePrompt.jsx";
import PromptHistory from "./PromptHistory.jsx";
import { toast } from "react-toastify";

const PentagramContent = ({ setPentagramShowing }) => {
  const { index, setIndex, pentaPrompts, inputs, updateInput } = usePentagram();
  const { responseText, loading, error, fetchData } = useFetchAPi();
  const [personaPrompt, setPersonaPrompt] = useState("");
  const [contextPrompt, setContextPrompt] = useState("");
  const [taskPrompt, setTaskPrompt] = useState("");
  const [outputPrompt, setOutputPrompt] = useState("");
  const [constraintPrompt, setConstraintPrompt] = useState("");

  // Initialize local state from context inputs
  useEffect(() => {
    setPersonaPrompt(inputs[0] || "");
    setContextPrompt(inputs[1] || "");
    setTaskPrompt(inputs[2] || "");
    setOutputPrompt(inputs[3] || "");
    setConstraintPrompt(inputs[4] || "");
  }, [inputs]);

  // Check Firebase auth status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {});

    return () => unsubscribe();
  }, []);

  // Custom onChange handlers to update both local state and context
  const handlePersonaChange = (value) => {
    // Check if value is an event object or a direct string
    const newValue =
      value?.target?.value !== undefined ? value.target.value : value;
    setPersonaPrompt(newValue);
    if (index === 0) {
      updateInput(newValue);
    }
  };

  const handleContextChange = (value) => {
    const newValue =
      value?.target?.value !== undefined ? value.target.value : value;
    setContextPrompt(newValue);
    if (index === 1) {
      updateInput(newValue);
    }
  };

  const handleTaskChange = (value) => {
    const newValue =
      value?.target?.value !== undefined ? value.target.value : value;
    setTaskPrompt(newValue);
    if (index === 2) {
      updateInput(newValue);
    }
  };

  const handleOutputChange = (value) => {
    const newValue =
      value?.target?.value !== undefined ? value.target.value : value;
    setOutputPrompt(newValue);
    if (index === 3) {
      updateInput(newValue);
    }
  };

  const handleConstraintChange = (value) => {
    const newValue =
      value?.target?.value !== undefined ? value.target.value : value;
    setConstraintPrompt(newValue);
    if (index === 4) {
      updateInput(newValue);
    }
  };

  const onChangeIndex = (num) => setIndex(num);
  const onPrevious = () => setIndex(index === 0 ? 0 : index - 1);
  const onNext = () => setIndex(index === 4 ? 4 : index + 1);

  const handleSubmit = async () => {
    const allPrompts = [
      personaPrompt,
      contextPrompt,
      taskPrompt,
      outputPrompt,
      constraintPrompt,
    ];

    if (allPrompts.some((prompt) => !prompt || prompt.trim() === "")) {
      toast.warn("Please fill out all fields before submitting.");
      return;
    }

    await fetchData(allPrompts);
  };

  return (
    <div className="flex flex-1 flex-col max-w-4xl mx-auto px-4 py-6">
      <button
        className="border border-black-500 p-2"
        onClick={() => {
          setPentagramShowing(false);
        }}
      >
        Back to Hero
      </button>
      <h1 className="text-2xl text-blue-400 font-bold text-center mb-8 max-sm:text-left">
        PENTAGRAM
      </h1>

      <div className="flex justify-center items-center gap-6 mb-8 max-sm:justify-start max-sm:gap-2 max-sm:mb-3">
        {/* //number 0: persona, 1: context, 2 : task, 3 : output, 4 : constrain */}
        {[0, 1, 2, 3, 4].map((num) => (
          <button key={num} onClick={() => onChangeIndex(num)} className="p-1">
            <Circle
              size={28}
              className={
                index === num
                  ? "fill-blue-400 stroke-1 stroke-blue-400"
                  : "stroke-1 stroke-gray-300"
              }
            />
          </button>
        ))}
      </div>

      <div className="w-full flex justify-between pb-2">
        <div className="flex gap-4">
          {pentaPrompts[index] && (
            <ResetButtons field={pentaPrompts[index].name} />
          )}
          <ResetButtons
            isResetAll={true}
            setPersonaPrompt={setPersonaPrompt}
            setContextPrompt={setContextPrompt}
            setTaskPrompt={setTaskPrompt}
            setOutputPrompt={setOutputPrompt}
            setConstraintPrompt={setConstraintPrompt}
          />
        </div>
        {pentaPrompts[index] && <Tooltips pentaPrompts={pentaPrompts[index]} />}
      </div>

      <div className="w-full rounded-md bg-white">
        <PromptField
          personaPrompt={personaPrompt}
          contextPrompt={contextPrompt}
          taskPrompt={taskPrompt}
          outputPrompt={outputPrompt}
          constraintPrompt={constraintPrompt}
          setPersonaPrompt={handlePersonaChange}
          setContextPrompt={handleContextChange}
          setTaskPrompt={handleTaskChange}
          setOutputPrompt={handleOutputChange}
          setConstraintPrompt={handleConstraintChange}
        />
      </div>

      <div className="flex justify-between items-center mb-8">
        <button
          onClick={onPrevious}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            index === 0
              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
              : "bg-blue-300 text-blue-500"
          }`}
          disabled={index === 0}
        >
          Back
        </button>

        <PromptHistory />

        <button
          onClick={index === 4 ? handleSubmit : onNext}
          className="px-6 py-2 rounded-md bg-blue-300 text-blue-500 mt-3"
        >
          {index === 4 ? "Submit" : "Next"}
        </button>
      </div>
      <ExportSinglePrompt inputs={inputs} responseText={responseText} />

      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <div>Loading...</div>
        </div>
      )}
      {error && (
        <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
          <p>
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}
      {responseText && <ResponseDisplay responseText={responseText} />}
    </div>
  );
};

const Pentagram = ({ setPentagramShowing }) => {
  return (
    <PentagramProvider>
      <PentagramContent setPentagramShowing={setPentagramShowing} />
    </PentagramProvider>
  );
};

export default Pentagram;

