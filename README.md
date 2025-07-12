Rick and Morty Character Browser 🧪

A modern, responsive character browser built with Next.js and the Rick and Morty API. This application allows users to explore characters from the show, with features like pagination, debounced search, and filtering by status or species. The global state is managed efficiently using Redux Toolkit.

## ✨ Features

Character Grid View: Displays characters with their image, name, status, species, and origin.

Responsive Design: A fluid layout that presents characters as cards on mobile and a grid on larger screens.

Pagination: Easily navigate through the character pages using "Next" and "Previous" buttons.

Debounced Search: Instantly search for characters by name with a debounced input to optimize API requests.

Filtering: Refine your search by character status (Alive, Dead, Unknown) and species (Human, Alien, Robot, etc.).

Redux State Management: Centralized state management for filters, character data, and pagination using Redux Toolkit.

🛠️ Tech Stack
Framework: Next.js (App Router)

Language: TypeScript

Styling: Tailwind CSS

State Management: Redux Toolkit & React-Redux

Data Fetching: Axios

API: Rick and Morty API

Debouncing: use-debounce

Icons: React Icons

Animations: Framer-motion

🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
You need to have Node.js (version 18.x or later) and npm installed on your machine.

Installation
Clone the repository:

Bash

git clone https://github.com/Nox008/rick-and-morty.git
Navigate to the project directory:

Bash

cd rick-and-morty-browser
Install the dependencies:

Bash

npm install
Run the development server:

Bash

npm run dev
The application will be available at http://localhost:3000. The homepage serves as a portal to the character browser located at /characters.

📦 Main Dependencies Used
next: The React framework for production.

react, react-dom: Libraries for building the user interface.

typescript: A typed superset of JavaScript.

@reduxjs/toolkit, react-redux: For global state management.

axios: For making HTTP requests to the Rick and Morty API.

tailwindcss: A utility-first CSS framework for styling.

use-debounce: For debouncing the search input.

react-icons: For SVG icons.

framer-motion: For animations.