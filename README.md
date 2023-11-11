# Ravens
A  modern and feature-rich real-time chat application designed to provide seamless communication experiences. Built with Node.js, Typescript, Next.js, Socket.io, and MongoDB, Ravens offers a scalable and responsive solution for instant messaging.

![image](https://github.com/Codestronomer/Ravens/assets/56360107/c48a4749-ce70-4fa4-a2b1-c4db21861e7d)

## Features
- Real-time Communication: Engage in real-time conversations with other users, making communication fast and efficient.
- User Authentication: Secure your chat with user authentication to ensure only authorized users can access the application.
- User Presence: Know when other users are online with the user presence feature, enhancing the chat experience.
- Responsive Design: Ravens is designed to work seamlessly across various devices, providing a consistent experience on desktops, tablets, and smartphones.
- Persistent Storage: Store and retrieve chat messages with MongoDB, ensuring that conversations persist across sessions.

## Technologies Used
- Node.js: Powering the server-side application and handling real-time communication through Socket.io.
- React.js: Building a dynamic and interactive user interface for an engaging chat experience.
- Next.js: Enhancing the React application with server-side rendering, routing, and other features.
- TypeScript: Adding static typing to the project for improved code quality and development experience.
- Socket.io: Facilitating real-time, bidirectional, and event-based communication between the server and clients.
- MongoDB: Storing and retrieving chat messages, providing a scalable and efficient database solution.

## Getting Started
To run Ravens locally, follow these steps:

- Clone the repository: git clone https://github.com/codestronomer/ravens.git
- Install dependencies:

### For the client side
```
cd ravens
cd client
npm install
```
- Start the application
```
npm run dev
```
Open your browser and go to http://localhost:3000 to access Ravens.

### For the API server
```
cd ravens
cd server
npm install
```
- Configure MongoDB:
  - Create a MongoDB database.
  - Update the MongoDB connection string in the server configuration.

- Start the API server
```
npm run dev
```
Open your browser and go to http://localhost:5000 to access Ravens'API.

### For the socket server.
```
cd ravens
cd socket
npm install
```
- Start the Socket server
```
npm run dev
```

## Contributing
Contributions are welcome! If you have ideas for improvements, new features, or find any issues, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License, making it open and accessible for anyone to use, modify, and distribute.

Start chatting in real time with Ravens! 🚀





