
import { useState } from "react";
import posts from "./data/posts.json";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(posts.map((post) => post.category))
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || post.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <header className="header">
        <h1>BlogSpace</h1>
        <p>Stories, ideas and inspiration for everyone.</p>
      </header>

      <main className="container">
        <section className="controls">
          <input
            type="text"
            placeholder="Search blog posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>
        </section>

        <p className="results">
          Showing {filteredPosts.length} post(s)
        </p>

        <section className="blog-grid">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article className="blog-card" key={post.id}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="post-image"
                />

                <div className="post-content">
                  <span className="category">
                    {post.category}
                  </span>

                  <h2>{post.title}</h2>

                  <p className="description">
                    {post.description}
                  </p>

                  <div className="post-footer">
                    <span>By {post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="no-results">
              <h2>No posts found</h2>
              <p>Try another search term or category.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 BlogSpace | Built with React</p>
      </footer>
    </div>
  );
}

export default App;
