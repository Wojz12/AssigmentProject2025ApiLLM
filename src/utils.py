import os
import json
import re
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

FORM_PATH = "form_data.json"

#Mój prompt dla LLM do wykonania zadania

instruction = """
You are a helpful assistant helping the user fill out a helpdesk contact form step-by-step.
The form includes:
- firstname (max 20 characters)
- lastname (max 20 characters)
- email (valid email format)
- reason (max 100 characters)
- urgency (integer from 1 to 10)

Instructions:
- Do NOT show or return any JSON to the user.
- Respond naturally and conversationally.
- Ask only for missing or unclear fields.
- Internally track the form progress.
- When user types "show form", return the current form as a JSON object.

Initial form:
{
  "firstname": null,
  "lastname": null,
  "email": null,
  "reason": null,
  "urgency": null
}
"""

def init_form():
    form = {
        "firstname": None,
        "lastname": None,
        "email": None,
        "reason": None,
        "urgency": None
    }
    with open(FORM_PATH, "w") as f:
        json.dump(form, f, indent=2)

def load_form():
    with open(FORM_PATH, "r") as f:
        return json.load(f)

def save_form(data):
    with open(FORM_PATH, "w") as f:
        json.dump(data, f, indent=2)

def configure_genai():
    genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))

def generate_chat():
    configure_genai()
    model = genai.GenerativeModel(
        model_name="models/gemini-1.5-flash-latest",
        system_instruction=system_instruction,
    )
    return model.start_chat(history=[])

def update_form_from_response(response_text):
    try:
        json_match = re.search(r'{.*}', response_text, re.DOTALL)
        if not json_match:
            print("⚠️ Could not find JSON in model response.")
            return

        extracted_json = json.loads(json_match.group(0))
        form_data = load_form()

        for key in form_data:
            if key in extracted_json and extracted_json[key] is not None:
                form_data[key] = extracted_json[key]

        save_form(form_data)

    except Exception as e:
        print(f"❌ Could not update form: {e}")

def extract_current_form(chat):
    """
    Internally asks the model for the current form as JSON (without user seeing it),
    so we can update the file.
    """
    try:
        internal_response = chat.send_message("show form")
        json_match = re.search(r'{.*}', internal_response.text, re.DOTALL)
        if not json_match:
            print("⚠️ Could not extract form JSON.")
            return

        extracted_json = json.loads(json_match.group(0))
        save_form(extracted_json)

    except Exception as e:
        print(f"❌ Failed to extract form: {e}")
