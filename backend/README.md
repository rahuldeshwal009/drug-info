# BACKEND — Node.js + Express + MongoDB Atlas

### File: `backend/README.md`

```markdown
# 💊 Drug Information API — Backend (Node.js + Express + MongoDB)

Backend service providing APIs for the Drug Information frontend.  
It serves drug data from MongoDB Atlas and supports filtering by company name.

---

## Features

- REST APIs for drug data and table configuration
- MongoDB Atlas integration via Mongoose
- Company-based filtering
- Express routing and middleware
- Easy deployment to Render or Railway

---

## Tech Stack

| Tool | Purpose |
|------|----------|
| Node.js + Express | Web server & routing |
| MongoDB + Mongoose | Database & ODM |
| dotenv | Environment variables |
| nodemon | Local development watcher |

## Environment Variables

To run this project, create a `.env` file in the root directory and add the following:

MONGO_URI=mongodb+srv://mailboxrahul1_db_user:dvdzrS2HdlCAgYez@drugcluster.zwcutcy.mongodb.net/
PORT=4000