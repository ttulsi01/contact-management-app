# Contact Management App

This is a simple Contact Management application built with React, TypeScript, and .NET 8 Web API. The application allows users to create, edit, view, and delete contacts. It uses a .NET 8 Web API backend to store and manage contact data.

## Features 

- **View Contacts**: View a list of all contacts with details such as First Name, Last Name, City, State, and Phone Number.
- **Add/Edit Contacts**: Add new contacts or edit existing ones.
- **Delete Contacts**: Remove contacts from the list.
- **Form Validation**: Ensure all required fields are filled out correctly before submitting.


## Technologies Used

- **Frontend**: React, TypeScript, Axios
- **Backend**: .NET 8 Web API
- **Styling**: CSS

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (for the frontend)
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) (for the backend)
- [Git](https://git-scm.com/) (for version control)

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/contact-management-app.git
cd contact-management-app
```


### 2. Setting up the Backend

Navigate to the **server** directory and restore the necessary packages:

```bash
cd server
dotnet restore
```

To run the backend API, use:

```bash
dotnet run
```

This will start the API server on `http://localhost:5281`.

### 3. Setting up the Frontend

Navigate to the **client** directory:

```bash
cd ../client
```

Install the necessary npm packages:

```bash
npm install
```

To start the React development server, use:

```bash
npm start
```

The React app should open in your default web browser at `http://localhost:3000`.

### 4. Running the Application

- Ensure that the backend server is running on `http://localhost:5281`.
- Ensure that the frontend server is running on `http://localhost:3000`.
- You should now be able to access the Contact Management App at `http://localhost:3000`.

### 5. Building for Production

To build the React frontend for production, use:

```bash
npm run build
```

This will create a build directory with the production build of your app. You can deploy this build directory to any static site hosting service.

## API Endpoints

- **GET** `/api/contacts` - Retrieve all contacts.
- **GET** `/api/contacts/{id}` - Retrieve a specific contact by ID.
- **POST** `/api/contacts` - Add a new contact.
- **PUT** `/api/contacts/{id}` - Update an existing contact by ID.
- **DELETE** `/api/contacts/{id}` - Delete a contact by ID.
- **GET** `/api/contacts/dropdown-options` - Retrieve dropdown options for states and contact frequencies.

## Contact

For any questions or feedback, please contact [tulsitailor01@gmail.com](mailto:tulsitailor01@gmail.com).