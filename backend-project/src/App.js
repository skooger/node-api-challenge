import React, {useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

function App() {

  const [projects, setProjects] = useState([]);



  useEffect(() => {

    axios.get(`http://localhost:4500/api/project/1`)
    .then(res => {
     
        setProjects(res.data);
    
      
    })
  },[])
    /**/



console.log(projects);
  return (
    <div className="App">
      <div>
        <h2>project</h2>

        <Card bg="primary" text="white" style={{ width: '18rem' }}>
          <Card.Header>{projects.name}</Card.Header>
          <Card.Body>
            <Card.Text>
              {projects.description}
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
      </div>

      <div>
        <h3>Actions for the project</h3>
        {/*projects.actions.map(action =>(
          <Card bg="info" text="white" style={{ width: '18rem' }}>
            <Card.Header>{action.description}</Card.Header>
            <Card.Body>
              <Card.Text>
                {action.notes}
              </Card.Text>
              <Card.Text>
                Completed?: {action.completed}
              </Card.Text>
            </Card.Body>
          </Card>

        )) */}
      </div>

    </div>
  );
}

export default App;
