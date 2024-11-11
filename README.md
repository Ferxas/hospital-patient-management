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

## 📦 Deployment on Vercel

To deploy this application on Vercel, follow these steps:

### Backend Deployment

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Configure Environment Variables**:
   Make sure you have the following environment variables ready:
   - `DB_HOST`: Your database host
   - `DB_USER`: Database username
   - `DB_PASSWORD`: Database password
   - `DB_NAME`: Database name
   - `JWT_SECRET`: Secret key for JWT
   - `EMAIL_USER`: Email for notifications
   - `EMAIL_PASS`: Email password

3. **Deploy Backend**:
   ```bash
   cd backend
   vercel login
   vercel env add DB_HOST
   vercel env add DB_USER
   vercel env add DB_PASSWORD
   vercel env add DB_NAME
   vercel env add JWT_SECRET
   vercel env add EMAIL_USER
   vercel env add EMAIL_PASS
   vercel --prod
   ```

### Frontend Deployment

1. **Configure API URL**:
   After deploying the backend, update the frontend environment variable:
   ```bash
   cd frontend
   ```

2. **Create or update `.env` file**:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```

3. **Deploy Frontend**:
   ```bash
   vercel login
   vercel env add VITE_API_URL
   vercel --prod
   ```

### Required Configuration Files

For proper deployment, the following configuration files are included in the project:

1. **Backend Configuration**: 
   - Location: `backend/vercel.json`
   - Purpose: Configures the Node.js server deployment and environment variables

2. **Frontend Configuration**: 
   - Location: `frontend/vercel.json`
   - Purpose: Sets up the Vite application deployment and routing

3. **Deployment Scripts**: 
   - Backend Script: `backend/scripts/vercelDeploy.sh`
   - Frontend Script: `frontend/scripts/vercelDeploy.sh`
   - Purpose: Automate the deployment process for both applications

These files are already configured and ready to use. Just follow the deployment steps above to use them.

Note: Make sure all changes are committed before deploying.

## 📝 To-Do List

- [x] Variable alarm system.
- [x] Generate graphs.
- [x] Enhance the UI/UX for better user experience.
- [ ] Write unit tests for critical components.
- [x] Deploy the application to a cloud service (e.g., Heroku, AWS, Vercel).

---

Thanks for reading! 🌟