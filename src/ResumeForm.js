import React, { useState } from "react";
import { TextField, Button, Grid, Input } from "@mui/material";
import axios from "axios";

const ResumeForm = () => {
  const [name, setname] = useState("");
  const [empId, setempId] = useState("");
  const [tagline, settagline] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [highlights, setHighlights] = useState("");
  const [profileImagePath, setProfileImagePath] = useState("");
  const [aboutImagePath, setAboutImagePath] = useState("");
  const [fullData, setFullData] = useState({});

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAboutImagePath(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleFileInputChange2 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImagePath(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };



  const [resumeData, setResumeData] = useState({
    education: [],
    workHistory: [],
    skills: [],
    projectDetails: [],
    interestsDetails: [],
  });

  const handleInputChange = (event, section, index, field) => {
    const newData = { ...resumeData };
    newData[section][index][field] = event.target.value;
    setResumeData(newData);
  };

  const handleAddItem = (section) => {
    const newData = { ...resumeData };
    newData[section].push({});
    setResumeData(newData);
  };



const handleSubmit3 = async () => {
  try {
    const prodata = {
      name: `${name} !`,
      tagline,
      profileImagePath,
    };

    const abtdata = {
      aboutMe,
      highlights: highlights.split(",").map((highlight) => highlight.trim()),
      aboutImagePath,
    };

    const data = {
      aboutData: abtdata,
      profileData: prodata,
      resumeData,
    };

    setFullData(data);

    await axios.post(
      `https://tb-family-qrcode-6f3beee0dd82.herokuapp.com/resume-details/${empId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Form submitted successfully");
    console.log(data);

  } catch (error) {
    console.error("An error occurred during form submission:", error);
  }
};


console.log(fullData);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          margin="normal"
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Emp ID"
          value={empId}
          onChange={(e) => setempId(e.target.value)}
          margin="normal"
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Tagline/Fav Quotes"
          value={tagline}
          onChange={(e) => settagline(e.target.value)}
          margin="normal"
          style={{ marginRight: "10px", width: "500px" }}
        />
        <Input
          type="file"
          onChange={handleFileInputChange2}
          inputProps={{ accept: "image/*" }}
          // style={{ display: "none" }}
          id="image-upload"
          margin="normal"
        />
        <Grid sx={{ p: "20px 0px 20px 0px" }}>
          <label htmlFor="image-upload">
            {" "}
            <Button
              variant="contained"
              color="primary"
              component="span"
              margin="normal"
              disabled
            >
              Choose Dp Image * Passport / Square size
            </Button>
          </label>
        </Grid>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          label="Short Note About You"
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
          margin="normal"
          style={{ marginRight: "10px", width: "400px" }}
        />
        <TextField
          label="Your Highlights (comma-separated)"
          value={highlights}
          onChange={(e) => setHighlights(e.target.value)}
          margin="normal"
          style={{ marginRight: "10px", width: "400px" }}
        />
        <Input
          type="file"
          onChange={handleFileInputChange}
          inputProps={{ accept: "image/*" }}
          // style={{ display: "none" }}
          id="image-upload"
          margin="normal"
        />
        <Grid sx={{ p: "20px 0px 20px 0px" }}>
          <label htmlFor="image-upload">
            {" "}
            <Button
              variant="contained"
              color="primary"
              component="span"
              margin="normal"
              disabled
            >
              Choose Profile Image * any Size
            </Button>
          </label>
        </Grid>
      </div>

      <h2>Education</h2>
      {resumeData.education.map((edu, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={4}>
            <TextField
              label="Institution"
              value={edu.institution || ""}
              onChange={(event) =>
                handleInputChange(event, "education", index, "institution")
              }
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Degree"
              value={edu.degree || ""}
              onChange={(event) =>
                handleInputChange(event, "education", index, "degree")
              }
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Date eg:(2017-2021)"
              value={edu.date || ""}
              onChange={(event) =>
                handleInputChange(event, "education", index, "date")
              }
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleAddItem("education")}
        margin="normal"
      >
        Add Education
      </Button>

      <h2>Work History</h2>
      {resumeData.workHistory.map((work, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={4}>
            <TextField
              label="Company"
              value={work.company || ""}
              onChange={(event) =>
                handleInputChange(event, "workHistory", index, "company")
              }
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Position"
              value={work.position || ""}
              onChange={(event) =>
                handleInputChange(event, "workHistory", index, "position")
              }
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Note"
              value={work.note || ""}
              onChange={(event) =>
                handleInputChange(event, "workHistory", index, "note")
              }
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Description"
              value={work.description || ""}
              onChange={(event) =>
                handleInputChange(event, "workHistory", index, "description")
              }
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Duration eg(2017-2021 or 2017-present)"
              value={work.date || ""}
              onChange={(event) =>
                handleInputChange(event, "workHistory", index, "date")
              }
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleAddItem("workHistory")}
        margin="normal"
      >
        Add Work History
      </Button>

      <h2>Skills</h2>
      {resumeData.skills.map((skill, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={6}>
            <TextField
              label="Skill"
              value={skill.skill || ""}
              onChange={(event) =>
                handleInputChange(event, "skills", index, "skill")
              }
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Rating (0-100)"
              value={skill.ratingPercentage || ""}
              onChange={(event) =>
                handleInputChange(event, "skills", index, "ratingPercentage")
              }
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleAddItem("skills")}
        margin="normal"
      >
        Add Skill
      </Button>

      <h2>Project Details</h2>
      {resumeData.projectDetails.map((project, index) => (
        <div key={index}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              value={project.title || ""}
              onChange={(event) =>
                handleInputChange(event, "projectDetails", index, "title")
              }
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Duration eg(2017-2020)"
                value={project.duration || ""}
                onChange={(event) =>
                  handleInputChange(event, "projectDetails", index, "duration")
                }
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={project.description || ""}
                onChange={(event) =>
                  handleInputChange(
                    event,
                    "projectDetails",
                    index,
                    "description"
                  )
                }
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Technology used"
                value={project.subHeading || ""}
                onChange={(event) =>
                  handleInputChange(
                    event,
                    "projectDetails",
                    index,
                    "subHeading"
                  )
                }
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
        </div>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleAddItem("projectDetails")}
      >
        Add Project
      </Button>

      <h2>Interests Details</h2>
      {resumeData.interestsDetails.map((interest, index) => (
        <div key={index}>
          <TextField
            label="Your other Interests"
            value={interest.heading || ""}
            onChange={(event) =>
              handleInputChange(event, "interestsDetails", index, "heading")
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Interest Description"
            value={interest.description || ""}
            onChange={(event) =>
              handleInputChange(event, "interestsDetails", index, "description")
            }
            fullWidth
            margin="normal"
          />
        </div>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleAddItem("interestsDetails")}
        margin="normal"
      >
        Add Interest
      </Button>
      <Grid sx={{ p: "50px 0px 100px 0px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit3}
          margin="normal"
        >
          Save Resume Data
        </Button>
      </Grid>
      {/* <img src={aboutImagePath} alt="not found"/>
    <img src={profileImagePath} alt="not found"/> */}
    </div>
  );
};

export default ResumeForm;
