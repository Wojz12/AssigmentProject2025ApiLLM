# utils.py
import os
import json
import re
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment
load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")

# Path to form data
FORM_PATH = "form_data.json"

# System prompt for LLM
SYSTEM_INSTRUCTION = """
You are a helpful assistant helping the user fill out a helpdesk contact form step-by-step.
The form includes:
- firstname (max 20 characters)
- lastname (max 20 characters)
- email (valid email format)
- reason (max 100 characters)
- urgency (integer from 1 to 10)

Instructions:
- Respond conversationally.
- Ask only for missing or unclear fields.
- Internally track the form progress.
- When user types "show form", return the current form as JSON.
"""

def init_form():
    """
    Initialize the JSON file with empty form.
    """
    form = {"firstname": None, "lastname": None, "email": None, "reason": None, "urgency": None}
    with open(FORM_PATH, "w") as f:
        json.dump(form, f, indent=2)


def load_form():
    """
    Load current form data from JSON.
    """
    with open(FORM_PATH, "r") as f:
        return json.load(f)


def save_form(data):
    """
    Save form data to JSON.
    """
    with open(FORM_PATH, "w") as f:
        json.dump(data, f, indent=2)


def configure_genai():
    """
    Configure the Gemini API key.
    """
    genai.configure(api_key=API_KEY)


def start_chat():
    """
    Start a chat session with the LLM.
    """
    configure_genai()
    model = genai.GenerativeModel(
        model_name="models/gemini-1.5-flash-latest",
        system_instruction=SYSTEM_INSTRUCTION,
    )
    return model.start_chat(history=[])


def extract_form_from_response(text):
    """
    Extract JSON snippet from model response text.
    """
    match = re.search(r'\{.*\}', text, re.DOTALL)
    if not match:
        return None
    try:
        return json.loads(match.group(0))
    except json.JSONDecodeError:
        return None


def update_form(chat):
    """
    Ask the model internally to dump the current form and save it.
    """
    resp = chat.send_message("show form")
    new_data = extract_form_from_response(resp.text)
    if new_data:
        save_form(new_data)

