const express = require("express");
const mongoose = require("mongoose");
const app = express();
 

// Connexion à MongoDB
mongoose.connect(
  `mongodb://robouser:robopass@robo-mongo-service:27017/roboDB?authSource=admin`
);
// Connexion à MongoDB
//mongoose.connect(
//  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@robo-mongo-service:27017/${process.env.MONGO_DB}?authSource=admin`
//);

// Modèle MongoDB
const ProjectSchema = new mongoose.Schema({ name: String, description: String });
const Project = mongoose.model("Project", ProjectSchema);

// Routes
app.get("/api/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));