# Daily Habit Tracker

The **Daily Habit Tracker** is a web application designed to help users build and maintain positive habits over time. It enables users to track their daily activities, set goals, and visualize their progress effectively.

## Features

### 1. Add New Habits

- Users can create new habits they want to develop, such as exercising, reading, meditating, or drinking water.
- Each habit entry can include details like the habit name, description, and completion status.

### 2. Track Habit Progress

- Users can mark their habits as completed each day and view their progress over time.

### 3. Habit Categories and Tags

- Users can categorize their habits (e.g., health, productivity, mindfulness) to organize and filter them effectively.

### 4. Visualize Progress

- The application includes visualizations, such as progress bars, to motivate users to achieve their goals.

## Main Page Features

- **Habit List**: A list of all habits with options to filter by category or tag. Displays the status of each habit.
- **Add Habit**: A button that opens a modal or navigates to a form page for adding a new habit.
- **Edit Habit**: An edit button next to each habit to modify its details.
- **Delete Habit**: A delete button next to each habit to remove it from the tracker.
- **Habit Filters**: Dropdowns or checkboxes to filter habits by category, frequency, or tag.
- **Search Field**: A search field to quickly find specific habits.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: MongoDB

## Installation Guide

### Prerequisites

- Node.js and npm installed on your machine.

### Step 1: Install Dependencies

#### 1. Navigate to the Client Folder

1. Open your terminal.
2. Navigate to the `client` directory:
   ```bash
   cd client
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

#### 2. Navigate to the Server Folder

1. From the `client` directory, navigate back to the root:
   ```bash
   cd ..
   ```
2. Now, navigate to the `server` directory:
   ```bash
   cd server
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. **Start the Backend Server:**

   - In the terminal, ensure you're in the `server` directory.
   - Run the following command:
     ```bash
     npm run server
     ```

2. **Start the Frontend Development Server:**

   - Open a new terminal window.
   - Navigate to the `client` directory again:
     ```bash
     cd client
     ```
   - Run the following command:
     ```bash
     npm start
     ```

3. Open your browser and navigate to `http://localhost:3000` to start using the Daily Habit Tracker.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
