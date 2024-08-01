# Boardcamp

This project is a Node.js API for managing a board game rental system using a relational database (SQL). It provides a comprehensive set of features for managing users, games, and rentals, including CRUD operations for users, games, and rentals.

## Features

- User CRUD Operations: Create and read user information.
- Game CRUD Operations: Manage board game entries including creating and reading.
- Rental CRUD Operations: Manage rental entries including creating, reading, updating, and deleting.

## Architecture
The project's file and folder structure follows a standard architecture with separate layers for controllers, routers, services, repositories, middlewares, and schemas (where necessary). This structure ensures a clean separation of concerns and makes the project easier to maintain and scale.

## Technologies
The following tools and frameworks were used in the construction of the project:<br>
<p>
    <img style='margin: 5px;' src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="40" alt="Node.js logo" />
    <img style='margin: 5px;' src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" height="40" alt="Express logo" />
    <img style='margin: 5px;' src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" height="40" alt="PostgreSQL logo" />
    <img style='margin: 5px;' src="https://img.shields.io/badge/Joi-336699?style=for-the-badge&logo=auth0&logoColor=white" height="40" alt="Joi logo" />
    <img style='margin: 5px;' src="https://img.shields.io/badge/Cors-FF6F91?style=for-the-badge&logo=cors&logoColor=white" height="40" alt="Cors logo" />
    <img style='margin: 5px;' src="https://img.shields.io/badge/HTTP_Status-5D5D5D?style=for-the-badge&logo=http-status&logoColor=white" height="40" alt="HTTP Status logo" />
    <img style='margin: 5px;' src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" height="40" alt="JavaScript logo" />
    <img style='margin: 5px;' src="https://img.shields.io/badge/express--async--errors-000000?style=for-the-badge&logo=express&logoColor=white" height="40" alt="express-async-errors logo" />
    <img style='margin: 5px;' src="https://img.shields.io/badge/Day.js-FF6F61?style=for-the-badge&logo=day.js&logoColor=white" height="40" alt="Day.js logo" />
</p>

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/truds99/boardcamp.git
cd boardcamp
```

### 2. Install Project Dependencies

```bash
npm install
```

### 3. Set up Environment Variables

```bash
DATABASE_URL=your_database_url
PORT=your_port_number
```

### 4. Start the server

```bash
npm start
```

## Usage
Use tools like Postman or cURL to interact with the API endpoints. Make sure your PostgreSQL instance is running and accessible.

## Contributions
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or new features.


