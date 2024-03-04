# QuikPay

QuikPay is a simple web application that allows users to simulate financial transactions without real money. It features a single-page interface where users can send money to listed recipients, view transaction history, and see their remaining balance. The application is built with Django and React, leveraging Django Channels for real-time updates.

## Core Features:

- **Live Updates**: Leveraging WebSockets with Django Channels, QuikPay updates users' balance and transaction history in real time, reflecting changes immediately across all active sessions.
- **Concurrency Handling**: Designed to manage multiple transactions simultaneously, ensuring accurate balance updates even when multiple users are interacting with the system concurrently. 
- **Responsive UI**: Implements a modern, dark-themed interface using Chakra UI, optimized for both desktop and mobile devices. 
- **Simplified UX**: Offers an intuitive user experience, allowing for effortless sending of money and viewing of transactional data without the need for user authentication.
## Project Structure

The project is divided into two main parts:

- `backend/`: A Django project handling the API and WebSocket connections for real-time updates.
- `frontend/my-vite-app/`: A React application created with Vite, providing the user interface.

### Backend

The backend is developed with Django and Django Channels. It provides RESTful APIs for managing transactions and WebSockets for real-time updates. 

- **Models**: Includes `Transaction` for recording transactions.
- **Views**: Handles API requests for creating transactions and fetching transaction history and balance.
- **URLs**: Routes API and WebSocket endpoints.

### Frontend

The frontend is a React application utilizing Chakra UI for styling and `react-icons` for graphical elements. It communicates with the backend via RESTful APIs and WebSockets to display real-time data.

- **WalletCard**: Displays the user's current balance.
- **WalletInfo**: Shows recent transactions and allows users to initiate new transactions.

## Setup

### Backend

1. Navigate to the `backend/` directory.
2. Install dependencies: `pip install -r requirements.txt`.
3. Run migrations: `python manage.py migrate`.
4. Start the Django development server: `python manage.py runserver`.

### Frontend

1. Navigate to the `frontend/my-vite-app/` directory.
2. Install dependencies: `npm install`.
3. Start the Vite development server: `npm run dev`.

## Features

- Real-time updates of transactions and balance using WebSockets.
- Responsive design with a dark theme interface.
- List of recipients to send money to.

## Upcoming Goals

- Make sure that live updates are properly shown and handle concurrent transactions.
- Enhance the transaction creation process with more details.
- Improve the frontend design and user experience.
- Deploy the application to a live server.

## Contributing

Contributions to QuikPay are welcome. Please feel free to report any issues or suggest features via the issue tracker.
