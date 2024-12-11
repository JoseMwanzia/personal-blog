# Article Management System

This project is a Node.js and Express-based server that allows administrators to manage articles stored in JSON files. The server uses Pug as the templating engine to render views and provides functionalities such as viewing, creating, editing, and deleting articles. The frontend is served from the `/src/views` directory, while the articles are stored in the `/files` directory.

## Features

- **View Articles**: Users can view a list of articles on the homepage.
- **Read Article**: View the details of a single article.
- **Admin Dashboard**: A protected dashboard for administrators to manage articles.
- **Add Article**: Create and save new articles.
- **Edit Article**: Update specific article details.
- **Delete Article**: Remove articles permanently.

## Project Structure

```
.
├── /files                  # Directory for storing JSON article files
├── /server                 
   ├── server.js            # Main server file
   └── auth.js              # Authentication middleware
├── /src
│   └── /views              # Directory for Pug templates
│       ├── home.pug
│       ├── readArticle.pug
│       ├── adminDashboard.pug
│       ├── newArticle.pug
│       └── adminEditPage.pug
└── README.md               # Project documentation
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure the following directories exist:
   - `/files`: Directory for storing JSON files representing articles.
   - `/src/views`: Directory for Pug templates.

## Usage

### Starting the Server

Run the following command to start the server:
```bash
npm start
```
We will be utilizing nodemon for the server.

The application will run on `http://localhost:3000` by default.

### Routes

#### Public Routes
- **GET /home**
  - Displays a list of all articles.
- **GET /article/:articleId**
  - Displays the details of a specific article.

#### Admin Routes (Authentication Required)
- **GET /admin**
  - Displays the admin dashboard with a list of all articles.
- **GET /new**
  - Displays the form for creating a new article.
- **POST /new**
  - Saves a new article to the `/files` directory.
- **GET /edit/:articleId**
  - Displays the form for editing a specific article.
- **PUT /edit/:articleId**
  - Updates the specified article.
- **DELETE /delete/:articleId**
  - Deletes the specified article.

### Authentication Middleware
The `server/auth.js` file contains Basic HTTP Authentication middleware to protect admin routes. You can customize this middleware to implement your desired authentication logic.

### File Storage
Articles are stored as JSON files in the `/files` directory. Each file represents an article and contains the following structure:
```json
{
  "id": 1,
  "title": "Article Title",
  "publishing_date": "Dec 5, 2024",
  "content": "Article content here..."
}
```

## Templating
The application uses Pug templates located in the `/src/views` directory. You can customize these templates as needed:

- **home.pug**: Displays a list of articles on the homepage.
- **readArticle.pug**: Displays the details of a specific article.
- **adminDashboard.pug**: Displays the admin dashboard.
- **newArticle.pug**: Form for creating new articles.
- **adminEditPage.pug**: Form for editing an article.

## API Responses

- **Successful Responses**:
  - For `GET` and `POST` requests: Returns HTML content or confirmation messages.
  - For `PUT` and `DELETE` requests: Returns JSON objects with status and redirect information.

- **Error Handling**:
  - Logs errors to the console.
  - Sends a `500` status code with an error message if a failure occurs.

## Dependencies

- **Node.js**: JavaScript runtime.
- **Express**: Web framework for Node.js.
- **Pug**: Templating engine for rendering views.

## Development

### Adding New Features
1. Add the logic for the new feature in `/server/server.js`.
2. Create or update corresponding Pug templates in `/src/views`.
3. Test the feature thoroughly before deployment.

### Running Tests
Manual testing can be done by interacting with the frontend through a browser or using tools like Postman for API testing.

## Known Issues

- Articles with duplicate titles may overwrite existing files due to file naming logic.
- Error handling for malformed JSON files is minimal.

## Future Improvements

- Implement a database (e.g., MongoDB or PostgreSQL) to replace file-based storage.
- Add user authentication and authorization.
- Improve error handling and validation.

## Contributing

Feel free to fork the repository and submit pull requests for improvements or new features. Ensure all changes are tested locally before submitting.

---

For any issues or suggestions, please open an issue in the repository or contact the maintainer.
