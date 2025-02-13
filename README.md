Here’s a comprehensive `README.md` for your open-source API project built with **NestJS** and **GraphQL**. It includes an overview of the project, setup instructions, API details, and information about the database schema.

---

# Adik API

Adik is an open-source API built with **NestJS** and **GraphQL** to support a platform for mental health and recovery. It provides functionalities for user management, messaging, resource sharing, journaling, and reporting. This API is designed to be modular, scalable, and easy to extend.

## Features

- **User Management**: Register, authenticate, and manage users with roles (user, mentor, counselor).
- **Messaging**: Send and receive messages between users.
- **Matching**: Match users based on recovery stages and preferences.
- **Resources**: Share and access recovery resources (articles, videos, podcasts).
- **Journaling**: Allow users to maintain journals with sentiment analysis.
- **Reporting**: Report users for inappropriate behavior and manage reports.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **GraphQL**: A query language for APIs that provides a flexible and efficient way to fetch data.
- **TypeORM**: An ORM for TypeScript and JavaScript that supports PostgreSQL, MySQL, and other databases.
- **PostgreSQL**: A powerful, open-source relational database system.
- **Supabase**: An open-source Firebase alternative for storage and authentication.

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (or any other supported database)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anguzuDaniel/Adik.git
   cd Adik
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   DATABASE_URL=postgres://username:password@localhost:5432/adik
   JWT_SECRET=your_jwt_secret
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_KEY=your-supabase-key
   ```

4. **Run database migrations:**
   ```bash
   npm run typeorm migration:run
   ```

5. **Start the development server:**
   ```bash
   npm run start:dev
   ```

6. **Access the GraphQL Playground:**
   Open your browser and navigate to `http://localhost:3000/graphql` to interact with the API.

---

## Database Schema

The database consists of the following tables:

### 1. **Users Table**
- `id` (Primary Key)
- `username`
- `email` (optional for anonymous users)
- `role` (user, mentor, counselor)
- `recovery_stage` (early, maintenance, etc.)
- `created_at`, `updated_at`

### 2. **Messages Table**
- `id` (Primary Key)
- `sender_id` (Foreign Key to Users)
- `receiver_id` (Foreign Key to Users)
- `content`
- `timestamp`

### 3. **Matches Table**
- `id` (Primary Key)
- `user_id` (Foreign Key to Users)
- `matched_user_id` (Foreign Key to Users)
- `status` (pending, accepted, rejected)

### 4. **Resources Table**
- `id` (Primary Key)
- `title`
- `type` (article, video, podcast)
- `url`

### 5. **Journals Table**
- `id` (Primary Key)
- `user_id` (Foreign Key to Users)
- `entry_content`
- `sentiment_score`
- `created_at`

### 6. **Reports Table**
- `id` (Primary Key)
- `reporter_id` (Foreign Key to Users)
- `reported_user_id` (Foreign Key to Users)
- `reason`
- `status` (pending, resolved)

---

## API Documentation

### GraphQL Queries and Mutations

#### Users
- **Query:**
  ```graphql
  query {
    users {
      id
      username
      email
      role
      recovery_stage
    }
  }
  ```

- **Mutation:**
  ```graphql
  mutation {
    createUser(input: { username: "john_doe", email: "john@example.com", role: "user", recovery_stage: "early" }) {
      id
      username
    }
  }
  ```

#### Messages
- **Query:**
  ```graphql
  query {
    messages(senderId: 1, receiverId: 2) {
      id
      content
      timestamp
    }
  }
  ```

- **Mutation:**
  ```graphql
  mutation {
    sendMessage(input: { senderId: 1, receiverId: 2, content: "Hello!" }) {
      id
      content
    }
  }
  ```

#### Matches
- **Query:**
  ```graphql
  query {
    matches(userId: 1) {
      id
      matched_user_id
      status
    }
  }
  ```

- **Mutation:**
  ```graphql
  mutation {
    createMatch(input: { userId: 1, matchedUserId: 2, status: "pending" }) {
      id
      status
    }
  }
  ```

#### Resources
- **Query:**
  ```graphql
  query {
    resources {
      id
      title
      type
      url
    }
  }
  ```

- **Mutation:**
  ```graphql
  mutation {
    createResource(input: { title: "Recovery Tips", type: "article", url: "https://example.com" }) {
      id
      title
    }
  }
  ```

#### Journals
- **Query:**
  ```graphql
  query {
    journals(userId: 1) {
      id
      entry_content
      sentiment_score
    }
  }
  ```

- **Mutation:**
  ```graphql
  mutation {
    createJournal(input: { userId: 1, entryContent: "Today was a good day.", sentimentScore: 0.8 }) {
      id
      entry_content
    }
  }
  ```

#### Reports
- **Query:**
  ```graphql
  query {
    reports {
      id
      reason
      status
    }
  }
  ```

- **Mutation:**
  ```graphql
  mutation {
    createReport(input: { reporterId: 1, reportedUserId: 2, reason: "Inappropriate behavior" }) {
      id
      reason
    }
  }
  ```

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **NestJS** for providing a robust framework.
- **GraphQL** for enabling flexible API queries.
- **TypeORM** for simplifying database interactions.
- **Supabase** for storage and authentication.

---

## Contact

For questions or feedback, feel free to reach out:

- **Daniel Anguzu**  
  GitHub: [anguzuDaniel](https://github.com/anguzuDaniel)  
  Email: [anguzud7@example.com](mailto:your-email@example.com)

---

Thank you for using **Adik API**! 🚀