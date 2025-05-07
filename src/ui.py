# ui.py
import json

def console_ui():
    """
    Run a console-based chat UI to interact with the user and LLM.
    """
    from utils import init_form, start_chat, update_form, load_form

    init_form()
    chat = start_chat()
    print("Assistant: Hello! I’ll help you fill out the helpdesk form. Type 'show form' at any time, 'exit' to quit.")

    while True:
        user_input = input("You: ").strip()
        if not user_input:
            continue
        if user_input.lower() in ("exit", "quit"):
            print("Assistant: Goodbye!")
            break
        if user_input.lower() == "show form":
            current = load_form()
            print("Current form data:", json.dumps(current, indent=2))
            continue

        # Send message to LLM and display response
        response = chat.send_message(user_input)
        print("Assistant:", response.text)

        # Update internal form state
        update_form(chat)
