const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();
geminiURL = process.env.GEMINI_API_URL;
geminiAPIKey = process.env.GEMINI_API_KEY;
const googleAI = new GoogleGenerativeAI(geminiAPIKey);
const model = googleAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const getGeminiResponse = async ({ prompt, tune, responseFormat }) => {
    tunedPrompt=  prompt + " " + tune+ " "+`I am expecting your output in this format ${responseFormat}`;
  try {
    const query = await model.generateContent(tunedPrompt);
    return query.response.candidates[0].content.parts[0].text;
  } catch (e) {
    return e
    // return -1;
  }
};

module.exports = getGeminiResponse;
