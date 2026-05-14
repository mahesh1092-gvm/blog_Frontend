import React from "react";
import {
  pageBackground,
  pageWrapper,
  section,
  pageTitleClass,
  bodyText,
  cardClass,
  headingClass,
  primaryBtn,
  secondaryBtn,
  articleGrid,
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
} from "../styles/common.js";

function Home() {
  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>
        {/* Hero Section */}
        <section className={section + " text-center"}>
          <h1 className={pageTitleClass}>Welcome to Blog App</h1>
          <p className={bodyText + " max-w-2xl mx-auto"}>
            Modern platform where authors share ideas and readers discover
            inspiring stories.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="/register" className={primaryBtn}>
              Get Started
            </a>
            <a href="/login" className={secondaryBtn}>
              Sign In
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className={section}>
          <h2 className={headingClass + " text-center mb-10"}>
           Blog App
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className={cardClass}>
              <h3 className="text-lg font-semibold mb-3"> Read Articles</h3>
              <p className={bodyText}>
                Discover inspiring stories and insightful posts from authors
                worldwide.
              </p>
            </div>
            <div className={cardClass}>
              <h3 className="text-lg font-semibold mb-3"> Write Articles</h3>
              <p className={bodyText}>
                Share your thoughts, ideas, and expertise with a global audience.
              </p>
            </div>
            <div className={cardClass}>
              <h3 className="text-lg font-semibold mb-3"> Connect with Authors</h3>
              <p className={bodyText}>
                Engage with readers and authors, build your network, and grow
                your influence.
              </p>
            </div>
          </div>
        </section>

        {/* Latest Articles Preview */}
        <section className={section}>
          
          <div className={articleGrid}>
            <div className={articleCardClass}>
              <h3 className={articleTitle}>Start Blogging</h3>
              <p className={articleExcerpt}>
                Learn the basics of setting up your blog and sharing your first
                post.
              </p>
              <span className={articleMeta}>Updated May 2026</span>
            </div>
            <div className={articleCardClass}>
              <h3 className={articleTitle}>Top  Writing Tips</h3>
              <p className={articleExcerpt}>
                Improve your writing style with these practical techniques.
              </p>
              <span className={articleMeta}>Updated May 2026</span>
            </div>
            <div className={articleCardClass}>
              <h3 className={articleTitle}>Building an Audience</h3>
              <p className={articleExcerpt}>
                Strategies to grow your readership and connect with your
                community.
              </p>
              <span className={articleMeta}>Updated May 2026</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-[#a1a1a6] text-sm mt-16">
          © {new Date().getFullYear()} Blog App. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default Home;