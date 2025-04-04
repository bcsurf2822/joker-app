import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "react-toastify";

export const useFetchAPi = () => {
  const [responseText, setResponseText] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (inputs) => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error(
          "API key is missing. Please check your environment variables."
        );
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
Act as the following persona: ${inputs[0]}

Given this context: ${inputs[1]}

Complete this task: ${inputs[2]}

Use this output format: ${inputs[3]}

With these constraints: ${inputs[4]}
      `;

      // Simple prompt without complex configuration
      const response = await model.generateContent(prompt);

      // Extract text from the response structure
      if (
        response &&
        response.response &&
        response.response.candidates &&
        response.response.candidates[0] &&
        response.response.candidates[0].content &&
        response.response.candidates[0].content.parts &&
        response.response.candidates[0].content.parts[0] &&
        response.response.candidates[0].content.parts[0].text
      ) {
        setResponseText(response.response.candidates[0].content.parts[0].text);
      } else {
        setResponseText("No response text found in the expected format");
      }
    } catch (error) {
      setError(error.message);

      toast.error(`Error: ${error.message}`);
      setResponseText(null);
    } finally {
      setLoading(false);
    }
  };

  return { responseText, loading, error, fetchData };
};
