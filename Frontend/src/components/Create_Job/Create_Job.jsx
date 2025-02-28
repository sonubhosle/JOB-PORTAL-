import React, { useState, useRef, useEffect } from "react";
import "../../Styles/Create_Job.css";
import axios from "axios";

const Create_Job = () => {
  const [jobData, setJobData] = useState({
    title: "",
    companyLogo: "",
    experience: "",
    skills: [],
    description: "",
    category: "",
    location: "",
    salary: "",
    postedDate: new Date().toISOString(),
    jobStatus: "APPLIED",
    keyResponsibilities: [],
  });

  const skillOptions = [
    "JavaScript", "React", "Node.js", "MongoDB", "Express", "Python", "Django", "HTML", "CSS",
    "Flask", "SQL", "PostgreSQL", "MySQL", "Java", "Spring Boot", "Kotlin",
    "Swift", "Objective-C", "C#", "ASP.NET", "C++", "Ruby", "Ruby on Rails",
    "PHP", "Laravel", "Go", "Rust", "Docker", "Kubernetes", "AWS", "Azure",
    "Google Cloud", "Terraform", "Linux", "Bash", "TypeScript", "Vue.js",
    "Angular", "Svelte", "GraphQL", "REST API", "Redux", "Next.js", "Nuxt.js",
    "Flutter", "React Native", "Unity", "TensorFlow", "PyTorch", "Machine Learning",
    "Artificial Intelligence", "Data Science", "Cybersecurity", "Blockchain", "DevOps"
  ];

  const categoryOptions = [
    "Android Development", "Web Development", "Data Science", "AI & Machine Learning",
    "Cybersecurity", "Blockchain Development", "Cloud Computing", "UI/UX Design",
    "Game Development", "Embedded Systems", "Network Engineering", "DevOps",
    "Product Management", "Quality Assurance", "Technical Writing", "Full Stack Development",
    "Back-End Development", "Front-End Development", "Software Testing", "IT Support",
    "Database Administration", "Mobile App Development", "E-commerce Development",
    "Digital Marketing", "SEO Specialist", "Business Intelligence", "Systems Administration",
    "IT Consulting", "Financial Technology", "Healthcare Technology", "Computer Vision",
    "Natural Language Processing", "Augmented Reality", "Virtual Reality", "Edge Computing",
    "Internet of Things (IoT)", "Big Data Engineering", "Game AI Development", "Software Security"
  ];

  const [skillInput, setSkillInput] = useState("");
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categoryOptions);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (e) => {
    const value = e.target.value;
    setSkillInput(value);
    setFilteredSkills(
      value ? skillOptions.filter(skill => skill.toLowerCase().includes(value.toLowerCase())) : []
    );
  };

  const addSkill = (skill) => {
    if (!jobData.skills.includes(skill)) {
      setJobData({ ...jobData, skills: [...jobData.skills, skill] });
    }
    setSkillInput("");
    setFilteredSkills([]);
  };

  const removeSkill = (skill) => {
    setJobData({ ...jobData, skills: jobData.skills.filter(s => s !== skill) });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategoryInput(value);
    setFilteredCategories(
      value ? categoryOptions.filter(cat => cat.toLowerCase().includes(value.toLowerCase())) : categoryOptions
    );
    setDropdownOpen(true);
  };

  const selectCategory = (category) => {
    setJobData({ ...jobData, category });
    setCategoryInput(category);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7866/api/jobs/create", jobData);
      alert("Job created successfully!");
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Failed to create job");
    }
  };

  return (
    <div className="create-job-container">
      <h2>Create a Job</h2>
      <form onSubmit={handleSubmit} className="create-job-form">

        <div className="form-row">
          <input type="text" name="title" placeholder="Job Title" value={jobData.title} onChange={handleChange} required />
          <input type="text" name="companyLogo" placeholder="Company Logo URL" value={jobData.companyLogo} onChange={handleChange} />
        </div>

        <div className="category-input" ref={dropdownRef}>
          <label>Category:</label>
          <input type="text" placeholder="Select a category..." value={categoryInput} onChange={handleCategoryChange} onClick={toggleDropdown} />
          {dropdownOpen && (
            <ul className="dropdown">
              {filteredCategories.map((category) => (
                <li key={category} onClick={() => selectCategory(category)}>{category}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="skill-input">
          <label>Skills:</label>
          <input type="text" placeholder="Type a skill..." value={skillInput} onChange={handleSkillChange} />
          {filteredSkills.length > 0 && (
            <ul className="suggestions">
              {filteredSkills.map((skill) => (
                <li key={skill} onClick={() => addSkill(skill)}>{skill}</li>
              ))}
            </ul>
          )}
          <div className="selected-skills">
            {jobData.skills.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill} <button type="button" onClick={() => removeSkill(skill)}>x</button>
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">Create Job</button>
      </form>
    </div>
  );
};

export default Create_Job;
