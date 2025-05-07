# Helpdesk Chatbot Assistant (Summer Internship Assignment 2025)

## Overview

This is a simple console-based application that leverages generative AI (Google Gemini API) to assist users in filling out a helpdesk form. The assistant conducts a natural-language conversation with the user, gathers the required information, and stores it in a JSON file. The entire project is containerized using Docker for ease of deployment.

## Features

* Console chat interface
* Interactive helpdesk form filling
* Uses Google Gemini API (free tier)
* Form fields validated and stored in `form_data.json`
* Dockerized for easy setup and testing

### Form Fields

* `Firstname`: string (max 20 characters)
* `Lastname`: string (max 20 characters)
* `Email`: string (valid email format)
* `Reason of contact`: string (max 100 characters)
* `Urgency`: integer (1–10)

## How to Use

At any point in the conversation:

* Type `show form` to preview the current form
* Type `exit` to end the chat

---

## How to Clone and Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/Wojz12/AssigmentProject2025ApiLLM.git
cd AssigmentProject2025ApiLLM
```

### 2. Set up environment variables

Create a `.env` file in the root directory with the following content:

```
GEMINI_API_KEY=your_google_gemini_api_key_here
```

You can get your free Gemini API key here: [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)

### 3. Build and run the Docker container

Make sure Docker is installed and running on your system.

```bash
docker build -t helpdesk-chatbot .
docker run --rm -it --env-file .env helpdesk-chatbot
```

> 🐳 The application runs in interactive mode inside the container.

### 4. How it works

* The app starts a console-based conversation with the assistant.
* The assistant gathers required form inputs one by one.
* You can type `show form` anytime to check progress.
* Once done, the form is saved to `form_data.json`.

---

## Project Structure

```bash
.
├── Dockerfile
├── .env (not committed)
├── requirements.txt
├── form_data.json (output)
└── src
    ├── main.py           # Entry point
    ├── ui.py             # Console UI logic
    ├── utils.py          # Helper functions (init, update, load, start_chat)
```

## Requirements

* Python 3.11+
* Google Gemini API key (free tier)
* Docker

---

## License

This project is for recruitment evaluation purposes only.
