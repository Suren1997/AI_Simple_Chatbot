from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_AI_KEY")
)

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()

        user_message = data.get("message", "")

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=user_message
        )

        reply = response.text

        return jsonify({
            "reply": reply
        })

    except Exception as e:
        print("ERROR:", e)

        return jsonify({
            "reply": f"Error: {str(e)}"
        }), 500


if __name__ == "__main__":
    app.run(debug=True)