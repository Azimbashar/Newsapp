import axios from "axios";
import React, { useEffect, useState } from "react";
import './News.css'


export default function News() {
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const [data, setData] = useState([]);
  const [inp, setInp] = useState("Mumbai");
  const [loading, setLoading] = useState(false);

  const getnews = async () => {
    setData([]);

    try {
      setLoading(true);

      const res = await axios.get(
        `https://gnews.io/api/v4/search?q=${inp}&lang=en&apikey=${API_KEY}`
      );

      setData(res.data.articles);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getnews();
  }, []);

  return (
    <>
      <div id="navbar">
        <div id="logo">Hamari-News</div>
  <div className="input-box">
        <input
          id="searchInput"
          type="text"
          placeholder="Search News..."
          onChange={(e) => setInp(e.target.value)}
        />

        <button id="searchBtn" onClick={getnews}>
          Search
        </button></div>
      </div>

      {loading ? (
        <h2 id="loading">Loading.......</h2>
      ) : (
        <div id="newsContainer">
          {data.slice(0, -1).map((v, i) => (
            <div key={i} className="card">
              <h3>
                {i + 1}. {v.title}
              </h3>

              <img src={v.image} alt={v.title} className="newsImg" />

              <p>{v.description}</p>

              <h6>{v.content}</h6>
            </div>
          ))}
        </div>
      )}

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-box">
            <h2 className="footer-logo">Hamari-News</h2>

            <p className="footer-text">
              Your trusted source for breaking news, trending stories, and
              latest updates from India and around the world.
            </p>
          </div>

          <div className="footer-box">
            <h3 className="footer-title">Quick Links</h3>

            <a href="/">Home</a>
            <a href="/business">Business</a>
            <a href="/sports">Sports</a>
            <a href="/technology">Technology</a>
          </div>

          <div className="footer-box">
            <h3 className="footer-title">Contact Us</h3>

            <p>Email: support@hamarinews.com</p>
            <p>Location: India</p>
            <p>Phone: +91 XXXXX XXXXX</p>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Hamari-News | All Rights Reserved
        </div>
      </footer>
    </>
  );
}