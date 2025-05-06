import tkinter as tk

class HelpdeskUI:
    def __init__(self, master, on_send_message, on_show_form):
        self.master = master
        self.on_send_message = on_send_message
        self.on_show_form = on_show_form

        # Modern window styling
        self.master.title("Helpdesk Assistant")
        self.master.geometry("500x600")
        self.master.config(bg='#f0f0f0')  # light gray background

        # Chat history (enlarged and word-wrapped)
        self.chat_history = tk.Text(
            self.master,
            height=25,
            width=60,
            state=tk.DISABLED,
            wrap=tk.WORD,
            bg='white',
            fg='#333333',
            bd=2,
            relief=tk.SOLID,
            font=(None, 12)
        )
        self.chat_history.pack(pady=10, padx=10)

        # Prefill assistant greeting
        self.chat_history.config(state=tk.NORMAL)
        self.chat_history.insert(
            tk.END,
            "Assistant: Hello I am a helpful assistant helping the user fill out a helpdesk contact form step-by-step. What is your name?\n"
        )
        self.chat_history.config(state=tk.DISABLED)

        # User input field
        self.user_input = tk.Entry(
            self.master,
            width=50,
            bg='white',
            fg='#333333',
            bd=2,
            relief=tk.SOLID,
            font=(None, 12)
        )
        self.user_input.pack(pady=5, padx=10)
        self.user_input.bind("<Return>", self.send_message_event)

        # Send button
        self.send_button = tk.Button(
            self.master,
            text="Send",
            command=self.send_message,
            bg='#007acc',
            fg='white',
            activebackground='#005f99',
            relief=tk.FLAT,
            font=(None, 10, 'bold'),
            padx=10,
            pady=5
        )
        self.send_button.pack(pady=5)

        # Show form button
        self.show_form_button = tk.Button(
            self.master,
            text="Show Form",
            command=self.show_form,
            bg='#007acc',
            fg='white',
            activebackground='#005f99',
            relief=tk.FLAT,
            font=(None, 10, 'bold'),
            padx=10,
            pady=5
        )
        self.show_form_button.pack(pady=5)

    def send_message_event(self, event):
        self.send_message()

    def send_message(self):
        user_input = self.user_input.get().strip()
        if user_input:
            self.chat_history.config(state=tk.NORMAL)
            self.chat_history.insert(tk.END, f"You: {user_input}\n")
            self.chat_history.config(state=tk.DISABLED)
            self.user_input.delete(0, tk.END)
            self.on_send_message(user_input)

    def show_form(self):
        form_data = self.on_show_form()
        self.chat_history.config(state=tk.NORMAL)
        self.chat_history.insert(tk.END, f"Form Data: {form_data}\n")
        self.chat_history.config(state=tk.DISABLED)

    def display_assistant_response(self, response_text):
        self.chat_history.config(state=tk.NORMAL)
        self.chat_history.insert(tk.END, f"Assistant: {response_text}\n")
        self.chat_history.config(state=tk.DISABLED)

def create_ui(on_send_message, on_show_form):
    root = tk.Tk()
    ui = HelpdeskUI(root, on_send_message, on_show_form)
    return root, ui