# Internship_Task_OpenExperienceGmbH
<h2>To do app</h2>

---
![obraz](https://github.com/user-attachments/assets/dad6f791-a19f-4913-8068-212e6fc5d5ab)
## Features

### 📋 Task management
- Add, edit, delete, and search.
- Each Task has associated fields like:
  - Task name
  - Description
  - Status 

### 🛠️ API Endpoints
- RESTful API for seamless integration with the React frontend.

### 🗄️ Database Integration
- Uses MySQL as the primary database.
- The application interacts with the database efficiently using JPA (Java Persistence API) for optimized data modeling and management.

### 🌐 Modern Tech Stack
- **Backend**: Powered by Spring Boot with Hibernate ORM for database interaction.
- **Database**: MySQL
- **Frontend**: Built using React and MUI components.
---

## Installation

### Prerequisites
- **Java** 17+
- **Maven**
- **MySQL** 8+
- **Node.js** and **npm** (for React frontend)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Grodelek/Internship_Task_OpenExperienceGmbH.git
   cd Internship_Task_OpenExperienceGmbH

2.Configure the database: Update the application.properties file in the src/main/resources directory:
   ```bash

spring.datasource.url=jdbc:mysql://localhost:3306/{DATABASE_NAME}
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.jpa.hibernate.ddl-auto=update
```
  
3. Build and run the backend:
```
mvn clean install
mvn spring-boot:run
```
The backend will run at http://localhost:8080.

4. Frontend running
```
npm install
npm start
  ```
Access the frontend at http://localhost:3000.
