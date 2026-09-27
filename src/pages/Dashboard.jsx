import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  FileText,
  LayoutDashboard,
  PenLine,
  Plus,
  TrendingUp,
  LogOut,
} from "lucide-react";

const API_URL = "https://codomax-blog-api.onrender.com";

function Dashboard() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("devblog_user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("devblog_user");
      }
    }

    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/blogs`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load blogs.");
      }

      setBlogs(data.blogs || []);
    } catch (error) {
      setError(
        error.message ||
          "Unable to connect to the backend. Make sure the server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("devblog_token");
    localStorage.removeItem("devblog_user");

    navigate("/login");
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "—";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const totalPosts = blogs.length;
  const publishedPosts = blogs.length;
  const draftPosts = 0;
  const totalViews = 0;

  return (
    <div className="dashboard-page">
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

          <div className="dashboard-nav-right">
            <span className="dashboard-user">
              {user?.name || "DevBlog User"}
            </span>

            <Link to="/" className="dashboard-home">
              View site
            </Link>

            <button
              type="button"
              className="dashboard-home"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container dashboard-content">
        <div className="dashboard-heading">
          <div>
            <span className="eyebrow">Workspace</span>

            <h1>Dashboard</h1>

            <p>
              Welcome back
              {user?.name ? `, ${user.name}` : ""}! Manage your
              articles and track your publishing activity.
            </p>
          </div>

          <Link to="/create-blog" className="btn btn-primary">
            <Plus size={18} />
            Create Blog
          </Link>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FileText size={21} />
            </div>

            <div>
              <span>Total Posts</span>
              <strong>{totalPosts}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <BookOpen size={21} />
            </div>

            <div>
              <span>Published</span>
              <strong>{publishedPosts}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              <PenLine size={21} />
            </div>

            <div>
              <span>Drafts</span>
              <strong>{draftPosts}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">
              <TrendingUp size={21} />
            </div>

            <div>
              <span>Total Views</span>
              <strong>{totalViews.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        <section className="dashboard-section">
          <div className="dashboard-section-heading">
            <div>
              <h2>My Blog Posts</h2>
              <p>Manage your recent articles.</p>
            </div>

            <button
              type="button"
              className="dashboard-filter"
              onClick={fetchBlogs}
            >
              Refresh
            </button>
          </div>

          {loading && (
            <div className="form-success">
              Loading your blog posts...
            </div>
          )}

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="quick-actions">
              <div>
                <LayoutDashboard size={21} />

                <div>
                  <h3>No blog posts yet</h3>

                  <p>
                    Create your first article and it will appear here.
                  </p>
                </div>
              </div>

              <Link to="/create-blog" className="btn btn-primary">
                Create Blog
                <ArrowRight size={17} />
              </Link>
            </div>
          )}

          {!loading && !error && blogs.length > 0 && (
            <div className="posts-table-wrapper">
              <table className="posts-table">
                <thead>
                  <tr>
                    <th>Article</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Views</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog.id}>
                      <td>
                        <div className="table-title">
                          <div className="table-icon">
                            <FileText size={17} />
                          </div>

                          <span>{blog.title}</span>
                        </div>
                      </td>

                      <td>{blog.category}</td>

                      <td>
                        <span className="status-badge published">
                          Published
                        </span>
                      </td>

                      <td>
                        {blog.views
                          ? blog.views.toLocaleString()
                          : "0"}
                      </td>

                      <td>{formatDate(blog.createdAt)}</td>

                      <td>
                        <button
                          type="button"
                          className="table-action"
                          title="Blog details"
                          onClick={() =>
                            navigate(`/blog/${blog.id}`)
                          }
                        >
                          <ArrowRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="quick-actions">
          <div>
            <LayoutDashboard size={21} />

            <div>
              <h3>Ready to publish something new?</h3>

              <p>
                Create your next article and share your knowledge.
              </p>
            </div>
          </div>

          <Link to="/create-blog" className="btn btn-primary">
            Start Writing
            <ArrowRight size={17} />
          </Link>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;