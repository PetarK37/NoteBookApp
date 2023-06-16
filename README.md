# NoteBookApp
Mini note taking project as a part of a job interview assigemant.

## Features
The Notebook App offers the following CRUD (Create, Read, Update, Delete) operations for managing notes:

1. **Create Note**: Users can create new notes by providing a title and content
2. **Read Note**: Users can view all their notes.
3. **Update Note**: Users can edit the title and content  of an existing note.
4. **Delete Note**: Users can delete a note.

## Requirements
Before running the Notebook App, make sure you have the following dependencies installed:
- Node.js with NVM (Node Version Manager)
- Java 17
- Maven
- MySQL
If you're going to run it using Docker compose, then the only thing you need is:
- Docker-compose

## Running the Project

### Using Docker Compose
1. Clone the repository: `git clone https://github.com/your-username/notebook-app.git`
2. Navigate to the project directory: `cd notebook-app`
3. Run the project using Docker Compose: `docker-compose up --build`
4. Access the Notebook App in your browser at `http://localhost:3000`.

### Running Manually
1. Clone the repository: `git clone https://github.com/your-username/notebook-app.git`
2. Navigate to the project directory: `cd notebook-app`
3. Update the connection string in the `application.properties` file in `\Back\src\main\java\resources` folder with your MySQL database configuration.
4. Run the database initialization script:
   - Ensure that you have MySQL installed and running.
   - Execute the init.sql script to initialize the database schema(or paste it manually in workbench).
5. Start the back-end server:
   - Build the Spring Boot application: `mvn clean install`
   - Run the application: `mvn spring-boot:run`
6. Start the front-end:
   - Install the dependencies: `npm install`
   - Start the React development server: `npm start`
7. Access the Notebook App in your browser at `http://localhost:3000`.

> **Note**: If you choose to run the application manually, ensure that both the back-end server and the front-end development server are running simultaneously. Additionally, make sure you have set up NVM and switched to the appropriate Node.js version required for the project.

