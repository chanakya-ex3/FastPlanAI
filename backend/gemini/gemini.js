const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const format = require('../datasets/responsetemplate.json');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const genAIModel = async ({ message, tune, format }) => {
  let count = 0;
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt =
  "Today's date is 2022-01-01. "  
  +
    message +
    ' \n' +
    'This is the tune: ' +
    tune +
    ' \n' +
    'Format: ' +
    JSON.stringify(format);
  const result = await model.generateContent(prompt);
  const contentText = result.response.text();

  // Stripping the Markdown code block formatting
  const jsonStartIndex = contentText.indexOf('{');
  const jsonEndIndex = contentText.lastIndexOf('}') + 1;

  // Extract the pure JSON string
  const jsonString = contentText.substring(jsonStartIndex, jsonEndIndex);

  // Parse it to ensure it's valid JSON
  let jsonResponse;
  try {
    console.log(contentText);
    jsonResponse = JSON.parse(jsonString);
    return jsonResponse;
  } catch (error) {
    count += 1;
    console.log(`Failed Attempt ${count}`);
    if (count > 3) {
      return { message: 'Failed to generate response' };
    }
    return genAIModel({ message, tune, format });
  }
};

module.exports = genAIModel;
