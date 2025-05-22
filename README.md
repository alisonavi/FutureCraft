# FutureCraft

FutureCraft is a gamified web application for career exploration that guides users through an interactive preference test, visualizes personalized career paths, and supports user registration and feedback. Built with **React**, **Vite**, and **Framer Motion**, FutureCraft delivers a smooth, engaging single-page experience.

---

## Table of Contents

* [About The Project](#about-the-project)
* [Demo](#demo)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Available Scripts](#available-scripts)
* [Project Structure](#project-structure)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

---

## About The Project

FutureCraft helps users discover career paths by answering a set of engaging questions about their preferences and skills. As users progress, the app dynamically updates recommendations, making the experience both informative and fun.

## Demo

A live demo is available at: `https://goofycraft.netlify.app`

---

## Features

* **Preference Test**: Interactive sliders and animations for rating interests (e.g., math, coding, design).
* **Real-time Feedback**: Dynamic preview of top career clusters as users answer each question.
* **Explore Paths**: Browse detailed career trajectories and skill maps.
* **User Registration**: Sign up/login to save progress and revisit results.
* **Contact Form**: Send feedback or questions directly from the app.

---

## Tech Stack

* **Framework**: React 19.x
* **Bundler**: Vite
* **Animations**: Framer Motion
* **Routing**: React Router DOM
* **HTTP Client**: Axios or Fetch API
* **Styling**: Plain CSS modules (no external CSS framework)

---

## Getting Started

### Prerequisites

* Node.js v16 or higher
* npm v8 or higher (or Yarn v1+)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/alisonavi/FutureCraft.git
   cd FutureCraft
   ```
2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

### Available Scripts

In the project directory, you can run:

* **`npm run dev`**
  Starts the development server with HMR at `http://localhost:5173`.

* **`npm run build`**
  Bundles the app for production to the `dist` folder.

* **`npm run preview`**
  Serves the production build locally for testing.

---

## Project Structure

```
FutureCraft/
├── public/             # Static assets
├── src/                # Application source code
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route-based page components
│   ├── hooks/          # Custom React hooks
│   ├── styles/         # CSS modules or global styles
│   ├── App.jsx         # Root component & routing
│   └── main.jsx        # Entry point
├── index.html          # HTML template
├── package.json        # Scripts & dependencies
├── vite.config.js      # Vite configuration
└── README.md           # Project documentation
```

---

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to your branch: `git push origin feature/YourFeature`
5. Open a Pull Request

Please follow the code style and include meaningful commit messages.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## Contact

**FutureCraft Team** – [contact@futurecraft.com](mailto:contact@futurecraft.com)

Project Link: [https://github.com/alisonavi/FutureCraft](https://github.com/alisonavi/FutureCraft)
