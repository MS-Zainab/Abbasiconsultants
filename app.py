from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

openai.api_key = "YOUR_OPENAI_API_KEY"  # Replace with your real key

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message")

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # or "gpt-4" if you have access
            messages=[
                {"role": "system", "content": "You are an assistant for a travel agency. Answer questions about Hajj, Umrah, world tours, tickets, holidays, and visa updates."},
                {"role": "user", "content": user_message},
            ],
        )
        answer = response["choices"][0]["message"]["content"]
        return jsonify({"reply": answer})
    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}"})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
