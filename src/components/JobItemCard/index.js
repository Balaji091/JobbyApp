import './index.css';
import { Link } from 'react-router-dom';
function JobCard(props) {
   const {job}=props;
   const{id}=job;
    return (
        <Link to={`/jobs/${id}`}>
        <div className="job-card">
            <div className="job-header">
                <img src={job.company_logo_url} alt={`${job.title} logo`} className="company-logo" />
                <div>
                    <h2 className="job-title">{job.title}</h2>
                    <p className="job-rating">⭐ {job.rating}</p>
                </div>
            </div>
            <div className="job-info">
                <p className="job-location">{job.location}</p>
                <p className="job-type">{job.employment_type}</p>
                <p className="job-salary">{job.package_per_annum}</p>
            </div>
            <hr className="divider" />
            <div className="job-description">
                <h3>Description</h3>
                <p>{job.job_description}</p>
            </div>
        </div>
        </Link>
    );
}

export default JobCard;
