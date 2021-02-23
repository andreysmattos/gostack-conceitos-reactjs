import React, { useEffect, useState } from "react";
import api from './services/api'
import "./styles.css";



function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      // console.log('response', response)
      if (response && response.status === 200) {
        setRepositories(response.data)
      }
    })
  }, []);

  async function handleAddRepository() {
    api.post('repositories', {
      title: `Projeto ${Date.now()}!`,
      owner: 'Andrey'
    }).then(response => {
      if (response && response.status) {
        let repository = response.data;
        setRepositories([...repositories, repository])
      }
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
      if (response && response.status === 204) {

        let index = repositories.findIndex(repository => repository.id === id);

        if (index === -1) return false;

        let tempArray = [...repositories];

        tempArray.splice(index, 1)

        setRepositories(tempArray);

      }
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories && repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        )
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
