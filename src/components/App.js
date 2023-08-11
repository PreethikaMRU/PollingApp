import '../styles/App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './Home';
import Sidebar from './Sidebar';
import Login from './Login';
import Dashboard from './Dashboard';
import Footer from './Footer';
import PollPage from './Poll-page';
import Newpoll from './Newpoll';
import Report from './Report';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Loggedin from './Loggedin';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <div className='sidebar'>
        <Sidebar></Sidebar>
      </div>
      <div className='main'>
        <main>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/Login" element={<Login user={user}></Login>} />
            <Route path="/Dashboard" element={<Dashboard user={user}></Dashboard>}>
              <Route path="Report/:id" element={<Report></Report>} />
            </Route>
            <Route path='Poll/:id' element={<PollPage></PollPage>}/>
            <Route path='/Newpoll' element={<Newpoll></Newpoll>}/>
            <Route path='/Loggedin' element={<Loggedin user={user}></Loggedin>}/>
          </Routes>
        </main>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
