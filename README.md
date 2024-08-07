
# Money Tracker System

Money Tracker is a full-fledged web application built using the MERN stack (MongoDB, ExpressJS, ReactJS, and NodeJS). This application allows users to manage their expenses effectively by adding, editing, deleting, and viewing their expenses. It provides an intuitive and user-friendly interface for expense tracking and management.

## Features

- User Authentication (Sign Up, Sign In)
- Add, Edit, Delete Expenses
- View Expense History
- Filter Expenses by Date
- Responsive Design

## Technologies Used

- **MongoDB**: NoSQL database for storing expense data
- **ExpressJS**: Backend framework for building the API
- **ReactJS**: Frontend library for building the user interface
- **NodeJS**: JavaScript runtime for the backend server

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following software installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository to your local machine

```bash
git clone https://github.com/OjasTulswani/Money-Tracker-MERN-.git
```

2. Navigate to the project directory

### Backend Setup

3. The backend directory Install the necessary dependencies

```bash
npm install
```

5. Set up your MongoDB database and configure the environment variables

Create a `.env` file and add the following:

```env
MONGO_URI=your_mongodb_connection_string
```

6. Start the backend server

```bash
npm start
```


### Frontend Setup

7. Navigate to the frontend directory

```bash
cd client
```

8. Install the necessary dependencies

```bash
npm install
```

9. Start the frontend development server

```bash
npm start
```

The application should now be running on [http://localhost:3000](http://localhost:3000).

## Project Structure

```
expense-management-system/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── ...
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── ...
├── README.md
└── package.json
```

## Usage

1. **User Authentication**: Sign up for a new account or sign in to an existing account.
2. **Add Expense**: Navigate to the "Add Expense" page to add a new expense.
3. **View Expenses**: View your expense history on the dashboard.
4. **Edit Expense**: Edit any existing expense from the expense history.
5. **Delete Expense**: Delete any expense from the expense history.
6. **Filter Expenses**: Filter expenses by date to view specific expenses.
