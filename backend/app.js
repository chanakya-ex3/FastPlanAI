const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const auth = require("./Router/Authentication/auth");
const gemini = require("./GeminiAPI/getGeminiResponse");
const port = 3000;

app.get("/gemini", async (req, res) => {
  const vari = await gemini({
    prompt: "I want to build a ecommerce website as quickly as possible",
    tune: "Give Tech Stacks for above mentioned prompt. witin 20 words not description only tech stack",
    responseFormat: {
        "techStack":{
            frontend:["React","Angular","Vue"],
            backend:["Node","Django","Flask"],
            database:["MongoDB","PostgreSQL","MySQL"],
            deployment:["Heroku","AWS","GCP"]
        }
    } ,
  });
  console.log(vari)
  res.send(vari);
});
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", auth);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
