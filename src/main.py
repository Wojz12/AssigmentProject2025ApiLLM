from utils import init_form, generate_chat, load_form, extract_current_form
from ui import create_ui
from dotenv import load_dotenv


def main():
    # Initialize form and chat model
    init_form()
    chat = generate_chat()

    # Function to handle sending messages to the chat
    def on_send_message(user_input):
        response = chat.send_message(user_input)
        ui.display_assistant_response(response.text)
        extract_current_form(chat)

    # Function to handle showing the current form
    def on_show_form():
        form_data = load_form()
        return form_data

    # Create the UI and start the Tkinter event loop
    root, ui = create_ui(on_send_message, on_show_form)
    root.mainloop()

if __name__ == "__main__":
    main()
