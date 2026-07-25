# Async URL Checker

A high-performance, full-stack application for asynchronously verifying a list of URLs. Built with modern tools for a seamless "DevTools" experience.

## Features

*   **Asynchronous Processing:** Non-blocking background verification of URL lists.
*   **Concurrency Control:** Configurable limit (5) on concurrent HEAD requests per job.
*   **Simulated Network Latency:** Artificial 0-10s delay to simulate real-world conditions.
*   **Job Management:** Create, list, monitor, and cancel verification jobs in real-time.
*   **Modern Dashboard:** Immersive, full-screen UI with real-time polling and responsive design.

## Tech Stack

### Backend
*   **Framework:** NestJS
*   **Language:** TypeScript
*   **Storage:** In-memory `Map` (No database required)

### Frontend
*   **Framework:** React (Vite)
*   **State Management:** Redux Toolkit
*   **Language:** TypeScript
*   **Styling:** Modern Vanilla CSS (Dark Theme)

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v24+ recommended)
*   [npm](https://www.npmjs.com/)

### Installation & Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/qochinyan/URL_Checker.git
    cd url_checker
    ```

2.  **Start the Backend:**
    ```bash
    cd backend
    npm install
    npm run start:dev
    ```

3.  **Start the Frontend:**
    ```bash
    # In a new terminal
    cd frontend
    npm install
    npm run dev
    ```

4.  **Access the Application:**
    The frontend will be available at `http://localhost:5173`.

## Architecture Overview

- **Backend:** Exposes REST API endpoints (`/api/jobs`) and manages an internal job queue with controlled concurrency and simulated delays.
- **Frontend:** Provides a centralized dashboard. Uses Redux Toolkit to maintain global state and performs periodic polling to synchronize job statuses from the backend.
- **Styling:** Features a custom dark theme with variable-based design system, utilizing 'Inter' for typography and 'JetBrains Mono' for technical data representation.
