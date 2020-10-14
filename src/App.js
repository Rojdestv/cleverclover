import React, { useContext} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect,
  useRouteMatch
} from "react-router-dom";
import { LeagueContext } from './ContextAPI'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Router>
      <div  style={{height: '100%'}}>

        <Nav style={{  paddingLeft:'20%', backgroundColor: '#000080'}}variant="tabs" >
  <Nav.Item>
    <Nav.Link href="/users" eventKey="link-1"><Link to="/users" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize:18 }}>Users</Link></Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link  href="/leagues" eventKey="link-2"><Link to="/leagues" style={{ textDecoration: 'none',fontWeight: 'bold', fontSize:18 }}>Leagues</Link></Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link  href="/analytics" eventKey="link-3"><Link to="/analytics" style={{ textDecoration: 'none',  fontWeight: 'bold', fontSize:18 }}> Analytics</Link></Nav.Link>
  </Nav.Item>
</Nav>
        <Switch>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route path="/leagues">
            <Leagues />
          </Route>
          <Route path="/analytics">
            <Analytics />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Users() {
  return (
  <div style={{ height: '100%'}}>
        <div style={{ width:'20%',  height: '100%', padding: 15,  
  borderRight: '1px solid black'}}>    <h2 style={{fontSize:20, fontWeight: 'bold'}}>User Management Menu</h2></div>
  <div style={{ position: 'absolute', top: 60, left: '25%',  }}>
  <h3 style={{fontSize:20, fontWeight: 'bold'}}>User Management Content</h3>
</div>
</div>
  );
}

function Analytics() {
  return (
    <div style={{ height: '100%'}}>
    <div style={{ width:'20%',  height: '100%', padding: 15,  
borderRight: '1px solid black'}}>    <h2 style={{fontSize:20, fontWeight: 'bold'}}>Analytics Menu</h2></div>
<div style={{ position: 'absolute', top: 60, left: '25%',  }}>
<h3 style={{fontSize:20, fontWeight: 'bold'}}>Analytics</h3>
</div>
</div>

  );
}

function Topic() {
  let { topicId } = useParams();
  const name = topicId 
const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)
  const [currentLeague, setLeague] = useContext(LeagueContext);
  return (
    <div style={{ position: 'absolute', top: 75, left: '25%',  }}>
      <h3>{currentLeague.toUpperCase() + '-' + nameCapitalized}</h3>
    </div>
  );
}

function Leagues() {
  let { path, url } = useRouteMatch();
  const [currentLeague, setLeague] = useContext(LeagueContext);
  const dropDownTitle = currentLeague ? currentLeague.toUpperCase() : "League Selector"
  return (
    <div style={{ width:'20%',  height: '100%',   
  borderRight: '1px solid black'}}>
      <Nav  style={{ padding: 15}}defaultActiveKey="/home" className="flex-column">
      <DropdownButton id="dropdown-basic-button" title={dropDownTitle}>
  <Dropdown.Item onClick={() => {setLeague('nba') }}><Link  style={{color: 'black'}} to={`${url}/nba`}>NBA</Link></Dropdown.Item>
  <Dropdown.Item onClick={() => {setLeague('nhl') }}><Link  style={{color: 'black'}} to={`${url}/nhl`}>NHL</Link></Dropdown.Item>
  <Dropdown.Item  onClick={() => { setLeague('nfl')}}><Link style={{color: 'black'}}  to={`${url}/nfl`}>NFL</Link></Dropdown.Item>
</DropdownButton>
</Nav>
      <Switch>
        <Route exact path={path}>
        {currentLeague ? <Redirect to={`${url}/${currentLeague}`} /> : false}
        </Route>
        <Route path={`${path}/:topicId`}>
        {currentLeague ?  <Teams/> : false}
        </Route>
      </Switch>
    </div>
  );
}

function Teams() {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <Nav defaultActiveKey="/home" className="flex-column">
  <Nav.Link ><Link style={{color: 'black', fontWeight: 'bold'}} to={`${url}/schedule`}>Schedule</Link></Nav.Link>
  <Nav.Link ><Link style={{color: 'black', fontWeight: 'bold'}} to={`${url}/teams`}>Teams</Link></Nav.Link>
  <Nav.Link ><Link style={{color: 'black', fontWeight: 'bold'}} to={`${url}/athletes`}>Athletes</Link></Nav.Link>
</Nav>
      <Switch>
        <Route exact path={path}>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  );
}
