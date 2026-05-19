# Intelligent Bristo
Intelligent Bistro is an AI-powered restaurant ordering application built with React Native (Expo), Redux, Node.js, and OpenAI APIs. The app provides a conversational food ordering experience where users can explore the menu, receive intelligent recommendations, manage their cart through natural language, and place orders with real-time preparation tracking.

The system combines a modern chat-based UI with structured backend actions to create a realistic restaurant workflow simulation, including cart management, kitchen preparation estimation, parallel chef scheduling, and live order progress updates.

# Installation

This project is divided into two separate applications:

- `client/` → React Native Expo frontend
- `server/` → Node.js Express backend

Both directories require their own dependencies to be installed.

## Install Backend Dependencies

Navigate to the `server` directory and install the required packages:

```bash
cd server
npm install
```

This will install dependencies such as:

- Express
- OpenAI SDK
- Nodemon
- Dotenv
- Cors


## Install Frontend Dependencies

Navigate to the `client` directory and install the required packages:

```bash
cd client
npm install
```

This will install dependencies such as:

- Expo
- React Native
- Redux Toolkit
- React Redux
- Axios
- Expo Router

# Environment Variables Setup

This project uses separate environment variables for the frontend and backend applications.


## Frontend Environment Variables

Create a `.env` file inside the `client/` directory.

#### Path

```txt
client/.env
```

#### Contents

```env
EXPO_PUBLIC_API_URL=your_machines_local_IP_address
```
This IP address is required if you want to test the application using an iOS device.

## Backend Environment Variables

Create a `.env` file inside the `server/` directory.

#### Path

```txt
server/.env
```

#### Contents

```env
PORT=3000
OPENAI_API_KEY=your_openai_api_key
```

---

## Important Notes

- Replace the API URL with your machine's local IP address.
- The frontend device/emulator and backend server must be connected to the same network.
- Never commit `.env` files to GitHub.
- Restart the frontend server after changing frontend environment variables:

```bash
npx expo start --clear
```

- Restart the backend server after changing backend environment variables.

# Running the Applications

### Start Backend Server

```bash
cd server
npm run dev
```

---

### Start Frontend App

```bash
cd client
npx expo start --clear
```

---

# Recommended Setup Order

1. Create `.env` files for both `client` and `server`
2. Install backend dependencies
3. Install frontend dependencies
4. Start backend server
5. Start Expo frontend app
