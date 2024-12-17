import './index.css';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';
function Home(){
    const navigate=useNavigate()
    const onNavigate=()=>{
        navigate('/jobs')
    }
    return(
        <>
        <Header/>
        <div className="home-container">
            <div className="left">
                <h1 className="title">
                    Find The Job That Fits Your Life
                </h1>
                <p className="description">millions of people are searching for jobs,salary,information,company reviews.
                    Find the job that fits your abilities and potential
                </p>
                <button className="find-jobs" onClick={onNavigate}>Find Jobs</button>
            </div>
            <div className="right">
                <img src="https://assets.ccbp.in/frontend/react-js/home-lg-bg.png" className="desktop-image"/>
                <img src="https://assets.ccbp.in/frontend/react-js/home-sm-bg.png" className="mobile-image"/>
            </div>
        </div>
        </>
    )
} 
export default Home;