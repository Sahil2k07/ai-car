# Aether - AI Navigated car website

## Tech Stack

- Frontend: Next.js (App Router), TypeScript, Tailwind CSS, Radix UI
- Backend: Go (Golang) REST API
- AI Model: Gemini 2.5 Flash Lite

---

## Design Decisions

- I used a separate backend server for handling both car data and AI responses to keep the frontend clean and maintain proper separation of concerns.

- The AI logic is kept on the backend to avoid exposing API keys or endpoints on the frontend, preventing misuse and improving security.

- I chose Gemini 2.5 Flash Lite because it is free to use and provides a good balance between response quality and speed, which is important for real-time UI-driven interactions.

- The frontend is built using Next.js, TypeScript, and Tailwind CSS to ensure fast development, type safety, and a responsive UI.

- I did not integrate a database because the focus of the project is AI-driven UI behavior rather than data persistence.

- I intentionally kept a small number of car models since real-world luxury car brands usually have limited curated models, and this also keeps the UI clean and improves AI decision-making accuracy.

---

## Set up locally

### 1. Clone the repository:

```bash
git clone https://github.com/Sahil2k07/ai-car.git
```

### 2. Setup the Backend

1.  Navigate to Backend directory:

    ```bash
    cd backend
    ```

2.  Copy `dev.example.toml` to `dev.toml`:

    ```bash
    cp dev.example.toml dev.toml
    ```

3.  Replace the `api_key` with you actual api key:

    ```toml
    [server]
    server_port = ":8000"
    origins = ["http://localhost:3000", "https://medpg.shahil.co.in"]

    [gemini]
    api_key = "asdfasdfafasfasfasfdasff"
    ```

4.  Download all required packages:

    ```bash
    go mod download
    ```

5.  Build the project:

    ```bash
    go build -o app cmd/server/main.go
    ```

6.  Start the project:

    ```bash
    ./app
    ```

### 3. Setup the Frontend

1. Navigate to the frontend directory

   ```bash
   cd frontend
   ```

2. Install all the dependencies

   ```bash
   npm install
   ```

3. Build the project

   ```bash
   npm run build
   ```

4. Start the frontend

   ```bash
   npm start
   ```

> By Default Backend is accessed in `:8000` and frontend in `:3000`
