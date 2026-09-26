import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  FileText,
  LayoutDashboard,
  PenLine,
  Plus,
  TrendingUp,
} from "lucide-react";

const posts = [
  {
    title: "Getting Started with React in 2026",
    category: "Web Development",
    status: "Published",
    views: 1248,
    date: "Sep 24, 2026",
  },
  {
    title: "Understanding Artificial Intelligence",
    category: "Artificial Intelligence",
    status: "Published",
    views: 892,
    date: "Sep 22, 2026",
  },
  {
    title: "Building My First Full Stack Application",
    category: "Programming",
    status: "Draft",
    views: 0,
    date: "Sep 20, 2026",
  },
];

function Dashboard() {
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
            <span className="dashboard-user">Nithish Edward</span>

            <Link to="/" className="dashboard-home">
              View site
            </Link>
          </div>
        </div>
      </header>

      <main className="container dashboard-content">
        <div className="dashboard-heading">
          <div>
            <span className="eyebrow">Workspace</span>
            <h1>Dashboard</h1>
            <p>
              Welcome back! Manage your articles and track your
              publishing activity.
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
              <strong>12</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <BookOpen size={21} />
            </div>
            <div>
              <span>Published</span>
              <strong>9</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              <PenLine size={21} />
            </div>
            <div>
              <span>Drafts</span>
              <strong>3</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">
              <TrendingUp size={21} />
            </div>
            <div>
              <span>Total Views</span>
              <strong>8.4K</strong>
            </div>
          </div>
        </div>

        <section className="dashboard-section">
          <div className="dashboard-section-heading">
            <div>
              <h2>My Blog Posts</h2>
              <p>Manage your recent articles.</p>
            </div>

            <button className="dashboard-filter">
              All Posts
            </button>
          </div>

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
                {posts.map((post) => (
                  <tr key={post.title}>
                    <td>
                      <div className="table-title">
                        <div className="table-icon">
                          <FileText size={17} />
                        </div>
                        <span>{post.title}</span>
                      </div>
                    </td>

                    <td>{post.category}</td>

                    <td>
                      <span
                        className={`status-badge ${
                          post.status === "Published"
                            ? "published"
                            : "draft"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>

                    <td>{post.views.toLocaleString()}</td>

                    <td>{post.date}</td>

                    <td>
                      <button className="table-action">
                        <ArrowRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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