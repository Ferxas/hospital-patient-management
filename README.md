# 🏥 Hospital Patient Management System

This project is designed to streamline the management of patient records, user authentication, and administrative tasks in a healthcare setting.

## 📦 Features

- **User Authentication**: Secure login and registration for users.
- **Patient Management**: 
  - Register new patients.
  - Update patient status (active/inactive).
  - Fetch all patients.
- **Patient Records**: 
  - Create and manage patient medical records.
  - View patient history and records.
- **Admin Panel**: 
  - Manage user roles and permissions.
  - Enable/disable users.
- **Responsive Design**: Built with a user-friendly interface for both desktop and mobile devices.

## 🚀 Installation Guide

To get started with the Hospital Patient Management System, follow these steps:

### Prerequisites

- Node.js (v14 or higher)
- MySQL (or compatible database)
- Git (not really)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Ferxas/hospital-patient-management.git
   cd hospital-patient-management
   ```

2. **Install Backend Dependencies**:
   Navigate to the backend directory and install the required packages:
   ```bash
   cd backend
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the `backend` directory based on the `.env.example` file:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your database credentials and other configurations.

4. **Set Up the Database**:
   - Create a new database in MySQL (e.g., `hospitalmanagement`) or just import what is in the db folder.
   

5. **Start the Backend Server**:
   ```bash
   npm start
   ```
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->


6. **Install Frontend Dependencies**:
   Navigate to the frontend directory and install the required packages:
   ```bash
   cd ../frontend
   npm install
   ```

7. **Start the Frontend Application**:
   ```bash
   npm run dev
   ```

8. **Access the Application**:
   Open your browser and go to `http://localhost:5173` to access the application.

## 📝 To-Do List

- [ ] Variable alarm system.
- [ ] Generate graphs.
- [ ] Enhance the UI/UX for better user experience.
- [ ] Write unit tests for critical components.
- [ ] Deploy the application to a cloud service (e.g., Heroku, AWS, Vercel).

<!-- ## 🎨 Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request. -->

---

Thanks for reading! 🌟