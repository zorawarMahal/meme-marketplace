import React, { useState } from "react";
import axios from 'axios';

const MemeComponents = ({ onNewMeme }) => {
  const [form, setForm] = useState({
    title: "",
    image_url: "",
    tags: "",
    owner_id: "cyberpunk420",
  });
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    tags: '',
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const submitMeme = async(e) => {
    e.preventDefault();

    const payload = {
      ...form,
      image_url: form.image_url || "https://picsum.photos/300",
      tags: form.tags.split(",").map(tag => tag.trim()),
      caption: 'Awaiting AI caption...',
      vibes: 'Booting vibe engine...',
    };

    try {
      const res = await axios.post("http://localhost:3001/memes", payload);
      console.log(res.data);
      onNewMeme(res.data);
      setForm({
        title: "",
        image_url: "",
        tags: "",
        owner_id: "cyberpunk420",
      })
    } catch (error) {
      console.log('Failed to create meme', error);
    }
  }

  return (
    <div className="MemeForm-div">
      <form
        onSubmit={submitMeme}
        className="bg-black p-4 rounded-lg shadow-xl text-neon"
      >
        <h2 className="text-xl font-bold mb-2 text-pink-500">📸 Create Meme</h2>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={form.title}
          className="input"
        />
        <input
          name="image_url"
          placeholder="Image URL (optional)"
          onChange={handleChange}
          value={form.image_url}
          className="input mt-2"
        />
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          onChange={handleChange}
          value={form.tags}
          className="input mt-2"
        />
        <button
          type="submit"
          className="mt-4 bg-pink-600 px-3 py-1 rounded hover:glitch"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default MemeComponents;
