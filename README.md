# House Marketplace React Project

Welcome to the House Marketplace React project! This application allows users to browse and list houses for sale. It's built using React, Tailwind CSS, and Framer Motion, with data storage and retrieval powered by Firebase. Follow the instructions below to set up, build, and serve the project locally.

#### demo:

https://house-marketplace-eosin.vercel.app/

##### screenshots:

![Screen Shot 2022-03-09 at 23 59 17](https://user-images.githubusercontent.com/77447520/157543838-184091a3-42ab-4ca3-b556-6e17e17531dc.png)

![Screen Shot 2022-03-09 at 23 59 31](https://user-images.githubusercontent.com/77447520/157543881-70a6cb46-07a3-4e0f-9624-35860b205867.png)

![Screen Shot 2022-03-09 at 23 59 39](https://user-images.githubusercontent.com/77447520/157543976-e6b7ada7-bc45-47c8-80d6-c42929334b73.png)


## Features

- Browse and search for houses available in the marketplace.
- List your own houses for sale with detailed information.
- Smooth animations and transitions powered by Framer Motion.
- Utilizes Firebase for data storage and retrieval.

## Prerequisites

Before you begin, ensure you have the following software installed:

- Node.js: [https://nodejs.org/](https://nodejs.org/)

## Setup

1. Clone this repository to your local machine:
   ```sh
   git clone https://github.com/devdhaif/house-marketplace.git
   ```

2. Navigate to the project directory:
   ```sh
   cd house-marketplace
   ```

3. Install the project dependencies:
   ```sh
   npm install
   ```

4. Create a Firebase project:
   - Visit [https://console.firebase.google.com/](https://console.firebase.google.com/) and create a new project.
   - Follow the steps to set up Firebase for your project.

5. Configure Firebase for the project:
   - Copy the Firebase configuration from your Firebase project settings.
   - Create a `.env.local` file in the root directory and paste the configuration as follows:
     ```env
     REACT_APP_API_KEY=your-api-key
     REACT_APP_AUTH_DOMAIN=your-auth-domain
     REACT_APP_PROJECT_ID=your-project-id
     REACT_APP_STORAGE_BUCKET=your-storage-bucket
     REACT_APP_MESSAGING_SENDER_ID=your-messaging-sender-id
     REACT_APP_APP_ID=your-app-id
     ```

## Building and Serving Locally

To run the project locally, follow these steps:

1. Build the project:
   ```sh
   npm run build
   ```

2. Start the local development server:
   ```sh
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to see the House Marketplace app in action.

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for using the House Marketplace React project! If you encounter any issues or have questions, please feel free to reach out.

Happy coding! 🏠🚀