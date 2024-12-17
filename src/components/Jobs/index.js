import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Header from "../Header";
import JobCard from "../JobItemCard";
import ProfileCard from "../ProfileCard";
import FilterItem from "../FilterItem";
import { ThreeDots } from "react-loader-spinner";
import { FaSearch } from "react-icons/fa";
import "./index.css";

const employmentTypesList = [
  {
    label: "Full Time",
    employmentTypeId: "FULLTIME",
  },
  {
    label: "Part Time",
    employmentTypeId: "PARTTIME",
  },
  {
    label: "Freelance",
    employmentTypeId: "FREELANCE",
  },
  {
    label: "Internship",
    employmentTypeId: "INTERNSHIP",
  },
];

const salaryRangesList = [
  {
    salaryRangeId: "1000000",
    label: "10 LPA and above",
  },
  {
    salaryRangeId: "2000000",
    label: "20 LPA and above",
  },
  {
    salaryRangeId: "3000000",
    label: "30 LPA and above",
  },
  {
    salaryRangeId: "4000000",
    label: "40 LPA and above",
  },
];

function Jobs() {
  const [jobsList, setJobsList] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [profileData, setProfileData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedEmployment, setSelectedEmployment] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState([]);

  const onChangeEmployment = (value) => {
    setSelectedEmployment((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value) // Remove if unchecked
        : [...prev, value] // Add if checked
    );
  };

  const onChangeSalary = (value) => {
    setSelectedSalary((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value) // Remove if unchecked
        : [...prev, value] // Add if checked
    );
  };

  const getJobData = async () => {
    const url = "https://apis.ccbp.in/jobs";
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setIsLoad(false);
        setJobsList(data.jobs);
      } else {
        console.log(data.error_msg);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getProfileData = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const url = "https://apis.ccbp.in/profile";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    setProfileData(data.profile_details);
  };

  const onChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    getJobData();
    getProfileData();
  }, []);

  const filterData = jobsList.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchInput.toLowerCase());
    const matchesEmployment =
      selectedEmployment.length === 0 || selectedEmployment.includes(item.employment_type);
    const matchesSalary =
      selectedSalary.length === 0 ||
      selectedSalary.some((salary) => parseInt(item.package_per_annum) >= parseInt(salary));
  
    return matchesSearch && matchesEmployment && matchesSalary;
  });
  

  return isLoad ? (
    <div className="loader">
      <ThreeDots />
    </div>
  ) : (
    <div className="jobs">
      <Header />
      <div className="job-container">
        <div className="left-bar">
          <ProfileCard profileData={profileData} />
          <FilterItem
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            onChangeEmployment={onChangeEmployment}
            onChangeSalary={onChangeSalary}
            selectedEmployment={selectedEmployment}
            selectedSalary={selectedSalary}
          />
        </div>
        <div className="right">
          <div className="search-bar-container">
            <FaSearch className="search-icon" />
            <input
              type="search"
              placeholder="Search jobs..."
              className="search-input"
              value={searchInput}
              onChange={onChangeSearchInput}
            />
          </div>
          {filterData.length > 0 ? (
            filterData.map((item) => <JobCard job={item} key={item.id} />)
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
