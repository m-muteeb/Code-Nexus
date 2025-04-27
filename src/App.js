import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Use Routes instead of Switch
import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';  // Import AboutPage
import LoginPage from './pages/auth/login';
import SignupPage from './pages/auth/signup';
import ForgotPassword from './pages/auth/forgotpassword';  

const App = () => (
  <Router>
         <Header />
    <Routes>  {/* Replace Switch with Routes */}
      <Route path="/" element={<HomePage />} />  {/* Use element instead of component */}
      <Route path="/about" element={<AboutPage />} />  {/* Add AboutPage route */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;









// import React from 'react';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import HomePage from './pages/HomePage';

// const App = () => (
//   <>
//     <Header />
//     <HomePage />
//     <Footer />
//   </>
// );

// export default App;
