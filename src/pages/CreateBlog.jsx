import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Image,
  Save,
  Send,
  Tag,
} from "lucide-react";

function CreateBlog() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "Web Development",
    image: "",
    tags: "",
    content: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });

    setMessage("");
  };

  const handleSubmit = (event, type) => {
    event.preventDefault();

    if (!form.title || !form.content) {
      setMessage("Please enter a blog title and content.");
      return;
    }

    if (type === "draft") {
      setMessage("Your article has been saved as a draft.");
    } else {
      setMessage("Your article has been published successfully.");
    }
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

        <form
          className="blog-form"
          onSubmit={(event) => handleSubmit(event, "publish")}
        >
          {message && (
            <div className="form-success">
              {message}
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
              onClick={(event) => handleSubmit(event, "draft")}
            >
              <Save size={17} />
              Save Draft
            </button>

            <button type="submit" className="btn btn-primary">
              <Send size={17} />
              Publish Article
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CreateBlog;