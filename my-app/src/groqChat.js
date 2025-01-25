const Groq = require('groq-sdk');

const groq = new Groq({apiKey: "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", dangerouslyAllowBrowser: true});
async function groqGen() {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": "Return a JSON object with 2 parameters:\n- response: a string of up to 5 sentences, talking to the user in a friendly tone. Respond to their queries and detail a brief financial budgeting plan -- whether they should continue their current plan or if they should change anything based on their current goals.\n- budget_breakdown: a dictionary detailing an ideal budgeting plan based on category with the category as the key and the budget per month for that category as the value. The values should total up to less than or equal to the given monthly budget. The categories are as follows: food, travel, necessities, splurging."
      },
      {
        "role": "user",
        "content": "My budget is $1000/month, salary is $5000/month. I currently spend $3000/month. I track large expenses on paper. My goals are: to save more money, to invest more."
      }
    ],
    "model": "llama-3.3-70b-versatile",
    "temperature": 0.1,
    "max_completion_tokens": 1024,
    "top_p": 1,
    "stream": false,
    "response_format": {
      "type": "json_object"
    },
    "stop": null
  });

   console.log(chatCompletion.choices[0].message.content);
   var json_obj = JSON.parse(chatCompletion.choices[0].message.content);
   var avatar_response = json_obj.response;
   var budget_breakdown = json_obj.budget_breakdown;
   alert(budget_breakdown.food);
}

groqGen();