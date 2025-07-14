import React, { useState } from 'react';

function PostForm() {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, author_id: 1, is_reply: false }),
    });

    const text = await res.text(); // read raw text

    if (!res.ok) {
      // Try to parse JSON error, otherwise print raw text
      let errorMsg;
      try {
        const json = JSON.parse(text);
        errorMsg = json.error || JSON.stringify(json);
      } catch {
        errorMsg = text;
      }
      setMessage(`Error: ${errorMsg}`);
    } else {
      const data = JSON.parse(text);
      setMessage('Post submitted successfully!');
      setContent('');
      console.log('Inserted post:', data.post);
    }
  } catch (error) {
    setMessage(`Error: ${error.message}`);
  }
};

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          style={{ width: '100%', padding: '0.5rem' }}
        />
        <button type="submit" style={{ marginTop: '1rem' }}>
          Submit Post
        </button>
      </form>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}

export default PostForm;