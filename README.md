
# FormBuilder Dynamic Builder Pro

FormBuilder is a professional-grade, schema-driven dynamic form building system. It features a robust layout engine, conditional rendering logic, and full local persistence, all built on a **Clean Architecture** foundation.

## Architectural Framework

This project is built using **Clean Architecture** to separate concerns and ensure long-term maintainability. This structure makes the app easier to test, scale, and refactor.

### 1. Domain Layer (`/domain`)
Contains the "Inner Circle" of the application.
- **Entities (`types.ts`)**: Pure TypeScript interfaces for Forms, Fields, and Submissions.
- **Domain Services (`logic.ts`)**: Pure functions for validation and conditional logic. This layer has zero dependencies on React or external libraries.

### 2. Infrastructure Layer (`/infrastructure`)
Handles technical details and external dependencies.
- **Persistence (`store.ts`)**: Implements state management using **Zustand** and handles automatic persistence to LocalStorage.

### 3. Presentation Layer (`/components`)
The UI layer built with **React 19**.
- **Feature Modules**: Components are organized by their functional domain (`builder/`, `renderer/`, `dashboard/`).
- **Atomic Components**: Specialized sub-components (e.g., `FieldCard`, `RenderField`) that follow the **Single Responsibility Principle**.

---

## Setup & Execution

This project utilizes a **Native ESM (No-Build)** architecture. This approach eliminates the need for complex build tools like Webpack or Vite for development, providing a "Zero-Config" experience.

### Commands to Run

To get the project running locally:

1. **Ensure Node.js is installed.**
2. **Open your terminal** in the project root directory.
3. **Make sure to install dependencies by running:**

    npm install

4. **Start a local server by running:**
   
    npm run dev

4. **Access the Application**:
   Open (http://localhost:3000) in your browser.

---

## 🛠 Tech Stack

- **Framework**: React 19 (Browser-Native ESM)
- **State Management**: Zustand (Persist Middleware)
- **Styling**: Tailwind CSS (CDN Integrated)
- **Routing**: React Router DOM 7
- **Icons**: Lucide React
- **Utilities**: UUID v11


