# Notes App

A simple notes application where users can create, view, and manage their personal notes after logging in.
This project focuses on implementing authentication and handling user-specific data securely.

## Features

* User signup and login system
* Authentication-based access
* Create and store notes
* View all notes after login
* Delete notes anytime
* Each user sees only their own notes

## Tech Stack

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js, Express
* Database: MongoDB
* Authentication: JWT / Session (depending on your implementation)

## Project Overview

The main idea behind this project was to understand how authentication works in a real application and how data can be managed per user.

Once a user logs in, they are redirected to their dashboard where:

* Notes are fetched from the database
* Only their notes are displayed
* They can add new notes or delete existing ones

The app ensures that one user cannot access another user's notes.

## Installation & Setup

1. Clone the repository

   ```bash
   git clone https://github.com/alokbhagat971-bit/Notes-App.git
   ```

2. Go to the project folder

   ```bash
   cd Notes-App
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Run the server

   ```bash
   npm start
   ```

5. Open in browser

   ```
   http://localhost:3000
   ```

## Folder Structure (Basic Idea)

```
├── models
├── routes
├── controllers
├── public
├── views
└── server.js
```

## What I Learned

* How authentication systems work
* Handling user sessions / tokens
* Connecting backend with database
* Structuring a basic backend project
* Managing user-specific data securely

## Future Improvements

* Edit/update notes
* Add timestamps
* Search functionality
* Better UI
* Deployment

---

This project was built while learning backend development and trying to understand how real-world applications handle user data.

Feel free to fork or explore.
