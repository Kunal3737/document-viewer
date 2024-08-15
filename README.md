## Document Viewer React Project

## Frontend Only

This React project is a document viewer application that allows users to view, reorder, and save a list of documents. The documents are represented by cards with a title, type, and thumbnail image. Users can drag and drop the cards to reorder them and click on a card to view a larger version of the thumbnail image in an overlay.

The project leverages several key features:

- **Local storage:** The application uses local storage to persist the list of documents across sessions. This allows users to maintain their document order and state even if they refresh the page.
- **Automatic saving:** The application automatically saves the document list to local storage at regular intervals (default 5 seconds) if any changes are made. This ensures that user edits are not lost accidentally.
- **API mocking:** The application uses a mock API to simulate fetching and saving documents. This allows for faster development without requiring a real server setup.

### Running the Project

This project uses Create React App for development and build tooling. Here's how to get started:

1. **Clone the repository:** Clone this repository to your local machine.

2. **Install dependencies:** Open a terminal in the project directory and run the following command to install all the required dependencies:

   ```bash
   npm install
   ```

3. **Start the development server:** Run the following command to start the development server:

   ```bash
   npm start
   ```

   This will start the development server on `http://localhost:3000` by default. You can then access the application in your web browser.

4. **Building for production:** To build an optimized production build of the application, run the following command:

   ```bash
   npm run build
   ```

   This will create a production-ready build in the `build` folder. You can then deploy this folder to a web hosting service.

### Additional Notes

- This project uses React hooks for managing state and side effects.
- The `react-beautiful-dnd` library is used for drag and drop functionality.
- The `msw` library is used for mocking API requests in development mode.

This README provides a basic overview of the project. Feel free to explore the code further to understand the implementation details.
