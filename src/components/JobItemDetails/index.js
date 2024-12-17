import React, { useState, useEffect } from 'react';
import './index.css';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import Header from '../Header';
const JobDetails = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState({});
  const [isLoad, setIsLoad] = useState(true);

  const getJobDetails = async () => {
    const url = `https://apis.ccbp.in/jobs/${id}`;
    const jwtToken = Cookies.get('jwt_token');
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok === true) {
        setIsLoad(false);
        setJobData(data);
        console.log(data);
      } else {
        console.log(data.error_msg);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getJobDetails();
    setIsLoad(true)
  }, [id]);

  const { job_details,  similar_jobs } = jobData;
  
  if (isLoad) {
    return  <div className="loader">
    <ThreeDots/>
   </div>;
  }

  return (
    <>
    <Header/>
    <div className="job-details-container">
      <div className="job-header">
        <img
          src={job_details.company_logo_url}
          alt="company logo"
          className="company-logo"
        />
        <div>
          <h2 className="job-title">{job_details.title || "Job Title"}</h2>
          <div className="job-info">
            <span className="job-location">{job_details.location}</span>
            <span className="job-type">{job_details.employment_type}</span>
          </div>
        </div>
        <div className="job-salary">{job_details.package_per_annum}</div>
      </div>

      <div className="job-description">
        <h3>Description</h3>
        <p>{job_details.job_description}</p>
        <div className="skills">
          {job_details.skills && job_details.skills.map((skill) => (
            <div key={skill.name} className="skill">
              <img
                src={skill.image_url}
                alt={skill.name}
                className="skill-icon"
              />
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="life-at-company">
        <h3>Life at Company</h3>
        <p>{job_details.life_at_company?.description}</p>
        <img
          src={job_details.life_at_company?.image_url}
          alt="life at company"
          className="life-image"
        />
      </div>

      <div className="similar-jobs">
        <h3>Similar Jobs</h3>
        <div className="similar-jobs-list">
          {similar_jobs && similar_jobs.map((job) => (
            <Link to={`/jobs/${job.id}`}>
              <div key={job.id} className="similar-job-card" >
              <img
                src={job.company_logo_url}
                alt="company logo"
                className="similar-job-logo"
              />
              <div>
                <h4>{job.title}</h4>
                <p>{job.job_description}</p>
                <div className="job-info">
                  <span className="job-location">{job.location}</span>
                  <span className="job-type">{job.employment_type}</span>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};
export default JobDetails;
