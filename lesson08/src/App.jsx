import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Countries from './components/Countries/Countries';
import Country from './components/Country/Country';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/countries" element={<Countries />} />
      <Route path="/countries/:name" element={<Country />} />
    </Routes>
  </Router>
);

export default App;
