# Charles.dev - Personal Blog

Welcome to the repository for **Charles.dev**, a personal blog platform built with a modern, powerful tech stack. This project showcases a journey through graphic design, 3D, networking, and web development, with a seamless content management experience powered by AI and Firebase.

![Charles.dev Homepage](https://storage.googleapis.com/aip-dev-source-images/public/be337a7b-a459-4d69-a1b6-7ebc2390637b)

## ✨ Features

*   **Modern Frontend**: Built with **Next.js** and the **App Router** for a fast, server-first experience.
*   **Beautiful UI**: Styled with **Tailwind CSS** and **ShadCN UI** components for a polished, responsive design.
*   **Secure Admin Panel**: A protected admin area with passwordless, email-link authentication via **Firebase Auth**.
*   **AI-Powered Content Creation**:
    *   **AI Tag Suggestions**: An integrated AI agent suggests relevant tags for blog posts based on their content, improving discoverability.
    *   The content creation form is built to easily integrate more AI features in the future.
*   **Dynamic Content**: All blog posts, comments, and likes are stored and managed in **Firestore**, providing a real-time database backend.
*   **File Storage**: Blog cover images are uploaded and stored securely in **Firebase Storage**.
*   **Interactive Experience**: Users can like posts and leave comments, with all data updated in real-time.

## 🚀 Getting Started

To get this project running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Firebase:**
    *   Create a new project in the [Firebase Console](https://console.firebase.google.com/).
    *   Create a Web App within your project to get your Firebase config keys.
    *   Enable **Firestore Database**, **Storage**, and **Firebase Authentication** (with the Email/Password and Email Link providers enabled).
    *   Add `localhost` to the authorized domains in the Authentication settings for local testing.

4.  **Configure Environment Variables:**
    *   Create a `.env.local` file in the root of the project.
    *   Add your Firebase configuration keys to this file:
        ```
        NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
        FIREBASE_API_KEY="YOUR_API_KEY"
        
        NEXT_PUBLIC_SITE_URL="http://localhost:9002"
        ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application should now be running on [http://localhost:9002](http://localhost:9002).

## 🛠️ Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/), [ShadCN UI](https://ui.shadcn.com/)
*   **Backend & Database**: [Firebase](https://firebase.google.com/) (Firestore, Storage, Authentication)
*   **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit)
*   **Deployment**: Ready for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
