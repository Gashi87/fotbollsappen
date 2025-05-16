// src/App.tsx
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import LeagueDetails from "./pages/LeagueDetails";
import Layout from "./components/Layout.tsx";
import TeamDetails from "./pages/TeamDetails.tsx";
import PlayerDetails from "./pages/PlayerDetails.tsx";
import "./i18n";
// import MatchDetails from "./pages/MatchDetails.tsx";
import MatchCenter from "./pages/MatchCenter.tsx";


function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/league/:id" element={<LeagueDetails/>}/>
                    <Route path="/team/:id" element={<TeamDetails />} />
                    <Route path="/player/:id" element={<PlayerDetails />} />
                    {/*<Route path="/matches" element={<MatchDetails />} />*/}
                    <Route path="/matchcenter" element={<MatchCenter />} />
                </Routes>
            </Layout>
        </Router>

    );
}

export default App;
