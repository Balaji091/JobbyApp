import './App.css';
import {Routes,Route} from 'react-router-dom'
import LoginItem from './components/LoginItem';
import Home from './components/Home';
import Jobs from './components/Jobs';
import ProtectedRoute from './components/ProtectedComponent';
import JobDetails from './components/JobItemDetails';
import NotFound from './components/notfound';
function App() {
  return (
    <div className="App">
        <Routes>
            <Route path='/login' element={<LoginItem/>}/>
            <Route path='/' element={<ProtectedRoute path="/" element={<Home/>}/>}/>
            <Route path='/jobs' element={<ProtectedRoute  path="/jobs"element={<Jobs/>}/>}/>
            <Route path='/jobs/:id' element={<ProtectedRoute  path="/jobs/:id"element={<JobDetails/>}/>}/>
            <Route path="*" element={<NotFound/>}/>    
        </Routes>
    </div>
  );
}

export default App;
