import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function App() {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    projectName: '',
    description: '',
    status: 'En Cours', // Default status
    components: [] // Array to hold components
  });

  const fetchProjects = () => {
    fetch('http://robo-backend-service:3000/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAddComponent = () => {
    setNewProject({ ...newProject, components: [...newProject.components, { name: '', quantity: 1 }] });
  };

  const handleComponentInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedComponents = [...newProject.components];
    updatedComponents[index][name] = value;
    setNewProject({ ...newProject, components: updatedComponents });
  };

  const handleCreateProject = () => {
    fetch('http://robo-backend-service:3000/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject),
    })
    .then(res => res.json())
    .then(project => {
      setProjects([...projects, project]);
      handleClose();
      setNewProject({ projectName: '', description: '', status: 'En Cours', components: [] }); // Reset form
    });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom align="center">
        Projets Robotiques
      </Typography>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen} style={{ marginBottom: '20px' }}>
        Créer un Nouveau Projet
      </Button>
      <Grid container spacing={3}>
        {projects.map(project => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {project.projectName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Statut: {project.status}
                </Typography>
                <Typography variant="h6" component="div" style={{ marginTop: '10px' }}>
                  Composants:
                </Typography>
                <ul>
                  {project.components && project.components.map((component, index) => (
                    <li key={index}>{component.name} - Quantité: {component.quantity}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Créer un Nouveau Projet Robotique</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" name="projectName" label="Nom du Projet" type="text" fullWidth variant="standard" value={newProject.projectName} onChange={handleInputChange} />
          <TextField margin="dense" name="description" label="Description" type="text" fullWidth variant="standard" multiline rows={4} value={newProject.description} onChange={handleInputChange} />
          <Typography variant="h6" component="div" style={{ marginTop: '20px' }}>
            Composants:
          </Typography>
          {newProject.components.map((component, index) => (
            <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <TextField margin="dense" name="name" label={`Nom du Composant ${index + 1}`} type="text" variant="standard" value={component.name} onChange={(e) => handleComponentInputChange(index, e)} />
              <TextField margin="dense" name="quantity" label="Quantité" type="number" variant="standard" value={component.quantity} onChange={(e) => handleComponentInputChange(index, e)} inputProps={{ min: 1 }} />
            </div>
          ))}
          <Button onClick={handleAddComponent} startIcon={<AddIcon />}>Ajouter un Composant</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleCreateProject}>Créer</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;