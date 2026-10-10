# Prodesk IT — Verification Portal

A responsive web application built with React that helps manage a verification workflow through a dashboard-style interface. The project uses WebSockets to support real-time communication and display live workflow updates without requiring manual page refreshes.

## 📌 Overview

The Verification Portal is designed to provide a simple and responsive interface for monitoring verification activities. It connects to a WebSocket server that handles real-time communication between the frontend and backend.

The frontend and WebSocket server run as separate processes during local development, making it easier to develop, test, and troubleshoot each part independently.

## ✨ Features

* **Responsive UI:** Works across different screen sizes and devices.
* **Real-Time Updates:** Uses WebSockets to receive live workflow updates.
* **React-Based Frontend:** Provides a component-based interface.
* **Separate Backend Service:** Runs the WebSocket server independently from the frontend.
* **Performance Optimization:** Includes production build and Lighthouse testing.
* **Code Quality Checks:** Supports ESLint for identifying potential code issues.

## 🛠️ Technologies Used

* **React** — Building the user interface.
* **Node.js** — Running the backend server.
* **WebSocket** — Enabling real-time communication.
* **esbuild** — Bundling the frontend code.
* **ESLint** — Maintaining code quality.
* **npm** — Managing dependencies and project scripts.

## 🚀 Getting Started

Follow these steps to run the project on your local machine.

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* npm (included with Node.js)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

Move into the project directory:

```bash
cd <project-folder>
```

Replace the repository URL and project folder with your actual details.

### 2. Install Dependencies

Run the following command from the project root:

```bash
npm install
```

This installs the packages required to run the application.

### 3. Start the Frontend

Open a terminal in the project directory and run:

```bash
npm run dev
```

Once the development server starts, open the local URL displayed in your terminal in a browser.

### 4. Start the WebSocket Server

Open a **second terminal** in the same project directory and run:

```bash
npm run server
```

The WebSocket server is expected to run at:

```text
ws://localhost:8080
```

Keep both terminals running while using the application so the frontend can communicate with the WebSocket backend.

## 🏗️ Build for Production

To create an optimized production build, run:

```bash
npm run build
```

The generated files are expected to be available in the `dist` directory, depending on the project configuration.

## 🔍 Code Quality

To check the code using ESLint, run:

```bash
npm run lint
```

This helps identify potential issues and maintain consistent coding practices.

## 📊 Lighthouse Audit Results

The project received the following Lighthouse scores in the testing environment:

| Category       | Score |
| -------------- | ----: |
| Performance    |    94 |
| Accessibility  |    95 |
| Best Practices |   100 |
| SEO            |    91 |

*Note: Lighthouse scores may vary depending on the browser, server configuration, network conditions, and whether the application is tested in development or production mode.*

### Performance

The application achieved a Performance score of 94. Initial optimization work focused on reviewing render-blocking resources and the size and delivery of JavaScript and CSS files.

Testing the production build is recommended for a more realistic performance assessment.

### Accessibility

The application scored 95 for Accessibility. This is a strong result, although additional accessibility checks can help identify areas for improvement.

### Best Practices

The application scored 100 for Best Practices in the tested environment.

### SEO

The application scored 91 for SEO. One unresolved issue was an invalid `robots.txt` response.

During testing, the `/robots.txt` URL appeared to return HTML instead of a plain-text robots file. This may be related to file placement, build configuration, or server routing.

To investigate and resolve this issue:

1. Create a plain-text file at `public/robots.txt`.
2. Add the appropriate crawler directives.
3. Rebuild the application and verify that `dist/robots.txt` exists.
4. Open `/robots.txt` on the same server used for the Lighthouse audit and confirm that it returns plain text.
5. If the application is deployed, deploy the updated file and verify the live URL.

Only add a sitemap directive if a sitemap actually exists, and make sure it points to the correct deployed domain.

**The SEO warning was not resolved during the reported audit.** The score of 91 reflects the test results at that time, rather than a guarantee that every SEO check passes.

## 🌐 Production Considerations

Before deploying the application, keep the following points in mind:

* Configure the frontend to connect to the deployed WebSocket backend.
* Use a secure WebSocket connection (`wss://`) in production.
* Ensure the backend is accessible from the deployed frontend.
* Verify that static files, including `robots.txt`, are served correctly.
* Run the production build and test the deployed application.
* Recheck Lighthouse scores after deployment.

If the project includes a production preview script, you can use:

```bash
npm run preview
```

The preview server may be available at `http://localhost:4173`, depending on your configuration.

## 📁 Project Structure

The exact structure may vary, but a typical setup looks like this:

```text
verification-portal/
├── public/
│   └── robots.txt
├── src/
│   └── main.jsx
├── dist/
├── package.json
├── package-lock.json
└── README.md
```

The `src` directory contains the frontend source code, `public` contains static assets, and `dist` contains the production build output.

## 👩‍💻 Development Notes

During local development, run the frontend and WebSocket server in separate terminals. This allows the interface and real-time communication service to operate independently.

The local WebSocket address is intended for development only. A deployed application should use the appropriate secure endpoint.

## 📌 Current Status

The project includes a responsive frontend, a separate WebSocket server, and scripts for development, production builds, and code quality checks.

The reported Lighthouse results show strong performance and best-practice scores, with an outstanding `robots.txt` issue noted in the SEO audit.

---

