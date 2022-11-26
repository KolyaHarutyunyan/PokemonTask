import "./App.css";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Main from "./layout/Main";

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
};

export default App;
