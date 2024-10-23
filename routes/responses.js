// routes/users.js
import express from "express";
import OpenAI from "openai";

const router = express.Router();
const openai = new OpenAI({
  apiKey:
    "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",
  projectId: "proj_ABGUARK7Q4fLPUGSNGOYBOA5",
});
let finalResponse;

// Define the prompt

const prompt = `
        I want you to help me generate a detailed project idea with the following details:
        1. Title: Some catchy name suggestions for the project idea.
        2. Tech Stack: List all the technologies (frontend, backend, database, etc.), with each tech having a name and answer of why is this tech good for this project? briefly.
        3. Pros: List 4 benefits of using the suggested tech stack.
        4. Cons: List 4 downsides of the suggested tech stack.
        5. Monetization: Suggest 2 ways to monetize the project idea.
        6. Marketing: List 2 marketing strategies to promote the project.

        Keep the response very detailed and informative.
        Please strictly respond with a JSON object where each category is formatted as (don't start with ''' or """ just start with { and end with }): 
        {
          "title": ["Title 1", "Title 2"],
          "description": "Description of the project idea",
          "tech_stack": [
            { "name": "Tech 1", "description": "Description of Tech 1" },
            { "name": "Tech 2", "description": "Description of Tech 2" },
            { "name": "Tech 3", "description": "Description of Tech 3" },
            { "name": "Tech 4", "description": "Description of Tech 4" },
          ],
          "pros": [
            "Advantage 1",
            "Advantage 2",
            "Advantage 3",
            ...and more
          ],
          "cons": [
            "Disadvantage 1",
            "Disadvantage 2",
            ...and more
          ],
          "monetization": [
            "Way to make money 1",
            "Way to make money 2",
            ...and more
          ],
          "marketing": [
            "Marketing Strategy 1",
            "Marketing Strategy 2",
            ...and more
          ]
        }
      `;

const getResponse = async (message) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: prompt },
        {
          role: "user",
          content: message,
        },
      ],
    });

    // Ensure the response is valid JSON
    const responseText = response.choices[0].message;
    console.log(responseText);
    console.log(typeof responseText);

    return responseText; // Parse as JSON
  } catch (error) {
    console.error("Error in GPT response:", error);
    throw new Error("Failed to get response from OpenAI.");
  }
};

// Define routes for the users

router.post("/api/sendMessage", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message content is required." });
    }
    const response = await getResponse(message);
    res.status(200).json({ data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process the message." });
  }
});

router.get("/api/getResponse", (req, res) => {
  res.send(finalResponse.content);
});

// Export the router
export default router;
