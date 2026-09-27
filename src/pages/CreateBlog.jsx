import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Image,
  Save,
  Send,
  Tag,
} from "lucide-react";

const API_URL = "https://codomax-blog-api.onrender.com";

function CreateBlog() {
  const [form, setForm] = useState({
    title: "",
    category: "Web Development",
    image: "",
    tags: "",
    content: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });

    setMessage("");
    setError("");
  };

  const handlePublish = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!form.title || !form.content) {
      setError("Please enter a blog title and content.");
      return;
    }

    const token = localStorage.getItem("devblog_token");

    if (!token) {
      setError("You must be logged in to publish a blog.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          category: form.category,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to publish blog.");
      }

      setMessage("Your article has been published successfully.");

      // Clear article fields after successful publishing
      setForm({
        title: "",
        category: "Web Development",
        image: "",
        tags: "",
        content: "",
      });
    } catch (error) {
      setError(
        error.message ||
          "Unable to connect to the backend. Make sure the server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDraft = (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!form.title || !form.content) {
      setError("Please enter a blog title and content.");
      return;
    }

    setMessage("Your article has been saved as a draft.");
  };

  return (
    <div className="create-blog-page">
      <header className="dashboard-topbar">
        <div className="container dashboard-nav">
          <Link to="/" className="logo">
            <span className="logo-icon">
              <BookOpen size={21} />
            </span>

            <span>
              Dev<span>Blog</span>
            </span>
          </Link>

          <Link to="/dashboard" className="dashboard-home">
            Dashboard
          </Link>
        </div>
      </header>

      <main className="container create-blog-content">
        <Link to="/dashboard" className="back-link">
          <ArrowLeft size={17} />
          Back to dashboard
        </Link>

        <div className="create-heading">
          <div>
            <span className="eyebrow">Content Studio</span>

            <h1>Create a Blog</h1>

            <p>
              Share your knowledge, ideas, and experiences with the
              developer community.
            </p>
          </div>
        </div>

        <form className="blog-form" onSubmit={handlePublish}>
          {(message || error) && (
            <div className={error ? "form-error" : "form-success"}>
              {error || message}
            </div>
          )}

          <div className="blog-form-main">
            <section className="form-card">
              <div className="form-card-heading">
                <h2>Article Details</h2>

                <p>Start with the basics of your article.</p>
              </div>

              <div className="form-group">
                <label htmlFor="title">Blog title</label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter an engaging title..."
                  value={form.title}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category</label>

                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option>Web Development</option>
                    <option>Artificial Intelligence</option>
                    <option>Programming</option>
                    <option>Cybersecurity</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="tags">Tags</label>

                  <div className="input-wrapper">
                    <Tag size={18} />

                    <input
                      id="tags"
                      name="tags"
                      type="text"
                      placeholder="react, javascript, web"
                      value={form.tags}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="image">Featured image URL</label>

                <div className="input-wrapper">
                  <Image size={18} />

                  <input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={form.image}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>
            </section>

            <section className="form-card">
              <div className="form-card-heading">
                <h2>Article Content</h2>

                <p>Write the content of your blog post.</p>
              </div>

              <div className="form-group">
                <label htmlFor="content">Content</label>

                <textarea
                  id="content"
                  name="content"
                  rows="16"
                  placeholder="Start writing your article..."
                  value={form.content}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </section>
          </div>

          <div className="blog-form-actions">
            <Link to="/dashboard" className="btn btn-outline">
              Cancel
            </Link>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleDraft}
              disabled={loading}
            >
              <Save size={17} />

              Save Draft
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              <Send size={17} />

              {loading ? "Publishing..." : "Publish Article"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CreateBlog;