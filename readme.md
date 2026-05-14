--Frontend readme..

we use react for UI framework
React Router – Navigation between pages
Axios / Fetch API – HTTP requests to backend
TailwindCSS / CSS Modules – Styling (customizable)

Zustand..when the application size is huge , then maintainance of multiple context will become an issue..for such large applications advamced state management tools like Redux or Zustand is used
we use Zustand React that uses hooks instead of complex boilerplate.
react install
first create the react project like--> npm create vite@latest my-react-app
press y...represents current folder
select react 
javascript
yes

react-dom
Provides DOM-specific methods to render React components into the browser.

react-hook-form
Lightweight library for handling forms in React using hooks (useForm).

react-router
Enables navigation and routing between pages in a React app (/home, /articles, /login).
tailwindcss used for styling...without it we need to custom css for every singlr style

component is a building block..we created some components ....
--AuthorArticles.jsx  
it displays all articles written by a specific author
Helps authors manage and view their published contents
--AuthorProfile.jsx  
here it shows author details like name, bio, and profile image
Provides readers context about the author behind the articles
--EditArticle.jsx  
Allows authors to edit existing articles (title, content, ,category)
Ensures content can be updated or corrected after publishing
--Footer.jsx  
Provides site-wide footer with links or copyright info. and Maintains consistent layout across all pages.

--Header.jsx  
here it can has Top navigation bar with branding and menu options.
--Home.jsx  
Landing page showing featured or latest articles.
Acts as the entry point for readers exploring the blog.

--Login.jsx  
Form for users to log in with email and password. and alsoHandles authentication and sets user session.
--ProtectedRoute.jsx  
Restricts access to certain routes based on authentication/role.
Redirects unauthorized users to login or unauthorized page.
--Register.jsx  
Form for new users to sign up with required details.
Validates inputs and creates a new account in the system.
--RootLayout.jsx  
Defines the main layout structure (Header, Footer, Outlet).
Ensures consistent design across all pages.
--Unauthorized.jsx  
Page shown when a user tries to access restricted content. gives improve UX by clearly explaining lack of permissions.
--UserProfile.jsx  
Displays user details like name, email, and role. also allows users to view or edit their personal information.
--WriteArticles.jsx
it is like a Form for authors to create and publish new articles.

make sure to import tailwindcss in vite.config.js
--app.jsx is
it is like an in a React App.jsx is the root component that acts as the entry point for your application’s UI.