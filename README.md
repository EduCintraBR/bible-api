### Repository Description

Bible API in NestJS for accessing the Holy Bible in Portuguese, offering two versions: Almeida Revista e Atualizada (ARA) and Nova Versão Transformadora (NVT). Provides endpoints to retrieve testaments, books, chapters, and verses, secured with JWT authentication.

---

# Bible API - NestJS

An API built with NestJS to provide access to the Holy Bible in Portuguese in two versions: **Almeida Revista e Atualizada (ARA)** and **Nova Versão Transformadora (NVT)**. This API allows you to retrieve testaments, books, chapters, and verses. It uses JWT authentication to secure the endpoints.

## Features

- Access the Bible in two Portuguese translations: ARA and NVT.
- Retrieve testaments, books, chapters, and verses.
- Secure API endpoints with JWT authentication.

## Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **Git** (to clone the repository)

## Getting Started

### Cloning the Repository

Clone the repository to your local machine using Git:

```bash
git clone https://github.com/EduCintraBR/bible-api
```

Alternatively, you can download the repository as a ZIP file and extract it.

### Navigating to the Project Directory

```bash
cd your-repo-name
```

### Installing Dependencies

Install the required dependencies using npm:

```bash
npm install
```

### Setting Up the Environment Variables

Create a `.env` file in the root directory of the project and add the following:

```env
JWT_SECRET=your_secure_jwt_secret_key
```

- Replace `your_secure_jwt_secret_key` with a strong secret key that will be used to sign and verify JWT tokens.
- **Note:** Ensure this key matches the one used in your JWT token generator.

### Running the Application

Start the application in development mode:

```bash
npm run start:dev
```

The API should now be running on `http://localhost:3000`.

## Usage

### Generating a JWT Token

You can use the provided **JwtTokenGenerator** script to generate a JWT token for testing.

#### Steps:

1. **Navigate to the `JwtTokenGenerator` directory:**

   ```bash
   cd JwtTokenGenerator
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file with the same `JWT_SECRET`:**

   ```env
   JWT_SECRET=your_secure_jwt_secret_key
   ```

   - Ensure this key matches the one in your main `.env` file.

4. **Run the token generator script:**

   ```bash
   node generateToken.js
   ```

   - You will be prompted to enter a username.
   - After entering it, the script will output a JWT token.

### Making Requests to the API

Include the JWT token in the `Authorization` header when making requests to the API endpoints.

**Example using `curl`:**

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:3000/bible/ARA/testaments
```

**Example using `HTTPie`:**

```bash
http GET http://localhost:3000/bible/ARA/testaments "Authorization:Bearer YOUR_JWT_TOKEN"
```

**Example using Postman:**

- Set the request method to **GET**.
- Enter the URL: `http://localhost:3000/bible/ARA/testaments`.
- Go to the **Headers** tab and add:

  | Key            | Value             |
  | -------------- | ----------------- |
  | Authorization  | Bearer YOUR_JWT_TOKEN |

### API Endpoints

- **Get Testaments:**

  ```
  GET /bible/:translation/testaments
  ```

- **Get Books:**

  ```
  GET /bible/:translation/books
  ```

- **Get a Specific Book:**

  ```
  GET /bible/:translation/books/:bookId
  ```

- **Get a Specific Verse:**

  ```
  GET /bible/:translation/verses/:bookId/:chapter/:verse
  ```

- **Parameters:**

  - `:translation` - Bible translation (`ARA` or `NVT`).
  - `:bookId` - ID of the book.
  - `:chapter` - Chapter number.
  - `:verse` - Verse number.

### Example Request

Retrieve Genesis 1:1 from the ARA translation:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:3000/bible/ARA/verses/1/1/1
```

## Technologies Used

- **NestJS** - A progressive Node.js framework for building efficient and scalable server-side applications.
- **JWT (JSON Web Token)** - For securing API endpoints.
- **Node.js** - JavaScript runtime environment.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to contact me at [educin15@hotmail.com].

---

**Enjoy reading and studying the Bible with this API!**
