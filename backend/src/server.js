const express = require("express");
const cors = require('cors'); 
const mongoose = require("mongoose");
const app = express();
app.use(express.json()); // Pour parser le JSON des requêtes
 app.use(cors({
          origin: 'http://localhost:3000' // Autorise les requêtes depuis votre frontend
        }));

//Connexion à MongoDB
mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@localhost:27017/${process.env.MONGO_DB}?authSource=admin`
);

// Schéma et Modèle MongoDB pour les Projets de Robotique
const RobotProjectSchema = new mongoose.Schema({
  projectName: { type: String, required: true, unique: true },
  description: String,
  robotType: String, // e.g., Wheeled, Arm, Drone
  hardwareComponents: [{ componentName: String, quantity: Number }], // e.g., Motor, Sensor, Camera
  softwareDetails: {
    programmingLanguage: String,
    frameworks: [String],
    operatingSystem: String,
  },
  status: { type: String, enum: ['Planning', 'Development', 'Testing', 'Completed'], default: 'Planning' }, // État du projet
  startDate: Date,
  endDate: Date,
  teamMembers: [{ memberName: String, role: String }],
  githubRepo: String, // Lien vers le dépôt GitHub
  imageUrl: String, // URL de l'image du robot/projet
});
const RobotProject = mongoose.model("RobotProject", RobotProjectSchema);

// Routes API pour les Projets de Robotique
app.get("/api/robot-projects", async (req, res) => {
  try {
    const projects = await RobotProject.find();
 res.status(200).json(projects); // Use 200 for success
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/robot-projects", async (req, res) => {
  const newProject = new RobotProject(req.body);
  try {
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/api/robot-projects/:id", async (req, res) => {
  try {
    const project = await RobotProject.findById(req.params.id);
    if (project == null) {
      return res.status(404).json({ message: 'Cannot find project' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch("/api/robot-projects/:id", async (req, res) => {
  try {
    const project = await RobotProject.findById(req.params.id);
    if (project == null) {
      return res.status(404).json({ message: 'Cannot find project' });
    }

    if (req.body.projectName != null) {
      project.projectName = req.body.projectName;
    }
    if (req.body.description != null) {
      project.description = req.body.description;
    }
    if (req.body.robotType != null) {
      project.robotType = req.body.robotType;
    }
    if (req.body.hardwareComponents != null) {
      project.hardwareComponents = req.body.hardwareComponents;
    }
    if (req.body.softwareDetails != null) {
      project.softwareDetails = req.body.softwareDetails;
    }
    if (req.body.status != null) {
      project.status = req.body.status;
    }
    if (req.body.startDate != null) {
      project.startDate = req.body.startDate;
    }
    if (req.body.endDate != null) {
      project.endDate = req.body.endDate;
    }
    if (req.body.teamMembers != null) {
      project.teamMembers = req.body.teamMembers;
    }
    if (req.body.githubRepo != null) {
      project.githubRepo = req.body.githubRepo;
    }
    if (req.body.imageUrl != null) {
      project.imageUrl = req.body.imageUrl;
    }

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/robot-projects/:id", async (req, res) => {
  try {
    await RobotProject.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));