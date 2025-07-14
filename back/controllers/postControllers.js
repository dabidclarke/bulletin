const mysql = require('mysql2/promise');

// Set up MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const addPost = async (req, res) => {
  const { content, author_id, is_reply } = req.body;

  if (!content || !author_id) {
    return res.status(400).json({ error: 'Missing content or author_id' });
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO bbs_posts (content, author_id, is_reply, replies)
       VALUES (?, ?, ?, JSON_ARRAY())`,
      [content, author_id, is_reply ? 1 : 0]
    );

    const insertedId = result.insertId;

    const [rows] = await pool.execute(
      `SELECT id, content, author_id, date, is_reply, replies FROM bbs_posts WHERE id = ?`,
      [insertedId]
    );

    res.status(201).json({ post: rows[0] });
  } catch (err) {
    console.error('Database error:', err);   // <--- log full error here
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
};

module.exports = { addPost };