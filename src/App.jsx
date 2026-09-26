import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateBlog from "./pages/CreateBlog";
import {
  Search,
  Menu,
  X,
  ArrowRight,
  BookOpen,
  Code2,
  BrainCircuit,
  Shield,
  Sparkles,
} from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Getting Started with React in 2026",
    excerpt:
      "Learn the fundamentals of React and how component-based development makes modern web applications easier to build.",
    category: "Web Development",
    author: "Alex Morgan",
    date: "Sep 24, 2026",
    icon: Code2,
  },
  {
    id: 2,
    title: "Understanding Artificial Intelligence",
    excerpt:
      "Explore the core concepts behind modern AI systems and how they are changing the way developers build applications.",
    category: "Artificial Intelligence",
    author: "Sarah Wilson",
    date: "Sep 22, 2026",
    icon: BrainCircuit,
  },
  {
    id: 3,
    title: "Essential Cybersecurity Practices",
    excerpt:
      "A practical introduction to protecting applications, user data, and digital infrastructure from common threats.",
    category: "Cybersecurity",
    author: "Daniel Lee",
    date: "Sep 20, 2026",
    icon: Shield,
  },
];

const categories = [
  "All",
  "Web Development",
  "Artificial Intelligence",
  "Programming",
  "Cybersecurity",
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className="app">
      {/* Navbar */}
      <header className="navbar">
        <div className="container nav-container">
          <a href="#home" className="logo">
            <span className="logo-icon">
              <BookOpen size={21} />
            </span>
            <span>
              Dev<span>Blog</span>
            </span>
          </a>

          <nav className={`nav-links ${menuOpen ? "mobile-open" : ""}`}>
            <a href="#home" onClick={() => setMenuOpen(false)}>
              Home
            </a>

            <a href="#articles" onClick={() => setMenuOpen(false)}>
              Articles
            </a>

            <a href="#categories" onClick={() => setMenuOpen(false)}>
              Categories
            </a>

            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>

            {/* Mobile Login/Register */}
            <div className="mobile-actions">
              <Link
                to="/login"
                className="btn btn-outline"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-primary"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </nav>

          <div className="nav-actions">
            <button className="search-btn" aria-label="Search">
              <Search size={19} />
            </button>

            {/* Desktop Login */}
            <Link to="/login" className="btn btn-outline desktop-btn">
              Login
            </Link>

            {/* Desktop Register */}
            <Link to="/register" className="btn btn-primary desktop-btn">
              Register
            </Link>
          </div>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero" id="home">
          <div className="container hero-content">
            <div className="hero-badge">
              <Sparkles size={15} />
              <span>Ideas • Code • Innovation</span>
            </div>

            <h1>
              Learn. Build.
              <br />
              <span>Share.</span>
            </h1>

            <p>
              A developer-focused blog for exploring technology,
              programming, artificial intelligence, and the ideas shaping
              the future of software.
            </p>

            <div className="hero-actions">
              <a href="#articles" className="btn btn-primary btn-large">
                Explore Articles
                <ArrowRight size={18} />
              </a>

              <Link to="/create-blog" className="btn btn-secondary btn-large">
                Start Writing
              </Link>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="section featured-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Featured</span>
                <h2>Featured Article</h2>
              </div>

              <span className="heading-description">
                Hand-picked insights for developers
              </span>
            </div>

            <article className="featured-card">
              <div className="featured-visual">
                <Code2 size={70} strokeWidth={1.4} />
                <span>FEATURED</span>
              </div>

              <div className="featured-content">
                <span className="category-badge">
                  Web Development
                </span>

                <h3>
                  Building Better Web Experiences with Modern
                  Development
                </h3>

                <p>
                  Discover practical approaches to designing fast,
                  accessible, and maintainable web applications using
                  modern development techniques.
                </p>

                <div className="post-meta">
                  <span>Alex Morgan</span>
                  <span>•</span>
                  <span>Sep 24, 2026</span>
                </div>

                <button className="read-more">
                  Read Article <ArrowRight size={17} />
                </button>
              </div>
            </article>
          </div>
        </section>

        {/* Latest Articles */}
        <section className="section" id="articles">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Discover</span>
                <h2>Latest Articles</h2>
              </div>

              <button className="view-all">
                View all <ArrowRight size={16} />
              </button>
            </div>

            <div className="posts-grid">
              {filteredPosts.map((post) => {
                const Icon = post.icon;

                return (
                  <article className="post-card" key={post.id}>
                    <div className="post-image">
                      <Icon size={48} strokeWidth={1.4} />
                    </div>

                    <div className="post-content">
                      <span className="category-badge">
                        {post.category}
                      </span>

                      <h3>{post.title}</h3>

                      <p>{post.excerpt}</p>

                      <div className="post-footer">
                        <div className="post-meta">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                        </div>

                        <button
                          className="icon-arrow"
                          aria-label={`Read ${post.title}`}
                        >
                          <ArrowRight size={17} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section
          className="section categories-section"
          id="categories"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Explore</span>
                <h2>Browse Categories</h2>
              </div>
            </div>

            <div className="category-list">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-button ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section" id="about">
          <div className="container cta-content">
            <div>
              <span className="eyebrow">Join the community</span>

              <h2>Have something worth sharing?</h2>

              <p>
                Create an account and start publishing your ideas,
                tutorials, and experiences.
              </p>
            </div>

            <Link to="/register" className="btn btn-primary btn-large">
              Create Account
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <a href="#home" className="logo">
              <span className="logo-icon">
                <BookOpen size={19} />
              </span>

              <span>
                Dev<span>Blog</span>
              </span>
            </a>

            <p>
              A modern space for developers to learn, build, and share.
            </p>
          </div>

          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#articles">Articles</a>
            <a href="#categories">Categories</a>
            <a href="#about">About</a>
          </div>
        </div>

        <div className="container copyright">
          © 2026 DevBlog. Built as part of the Codomax Full Stack Web
          Development Internship.
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-blog" element={<CreateBlog />} />
    </Routes>
  );
}

export default App;