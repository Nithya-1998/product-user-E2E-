import React from 'react';
import './App.css';
import Content from './components/spa/contents/content';
import Header from './components/spa/header/header';
import Footer from './components/spa/footer/footer';

function App() {
  return (
    <div>
      <Header />
      <div>
        <Content />
      </div>
      <Footer />
    </div>
  );
}

export default App;
