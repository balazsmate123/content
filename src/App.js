import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import { ContentListPage } from "./ContentListPage";
import { ContentSinglePage } from "./ContentSinglePage";
import { ContentCreatePage } from "./ContentCreatePage";
import { ContentModPage } from "./ContentModPage";
import { ContentDelPage } from "./ContentDelPage";
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-light bg-success">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={'/'} style={{textDecoration:"none"}}>
                <span className="nav-link">Content</span>
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to={'/uj-content'} style={{textDecoration:"none"}} >
                <span className="nav-link">Új content</span>
              </NavLink>
              </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" exact element={<ContentListPage />} />
        <Route path="/content/:contentId" exact element={<ContentSinglePage />} />
        <Route path="/uj-content" exact element={<ContentCreatePage />} />
        <Route path="/mod-content/:contentId" exact element={<ContentModPage />} />
        <Route path="/del-content/:contentId" exact element={<ContentDelPage />} />
      </Routes>
    </Router>
  );
}

export default App;