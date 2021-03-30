import { useState, useEffect } from 'react';
import { RepositoryItem } from "./RepositoryItem";


import '../styles/repositories.scss';


interface Repository {
  name: string;
  description: string;
  html_url: string;

}




export function RepositoryList() {

  const [repositories, setRepositories] = useState<Repository[]>([]);

  const [newUser, setNewUser] = useState('');
  const [newUserOrOrgs, setNewUserOrOrgs] = useState('1');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewUserOrOrgs(event.target.value as string);
  };




  function repositoryGitHub() {

    console.log(newUserOrOrgs);
    console.log("ronadlogoaf");
    if (newUserOrOrgs === '1') {
      fetch(`https://api.github.com/users/${newUser}/repos`)
        .then(response => response.json())
        .then(data => setRepositories(data))
    } else if (newUserOrOrgs === '2') {
      fetch(`https://api.github.com/orgs/${newUser}/repos`)
        .then(response => response.json())
        .then(data => setRepositories(data))
    }

  }

  useEffect(() => {
    fetch('https://api.github.com/orgs/rocketseat/repos')
      .then(response => response.json())
      .then(data => setRepositories(data))

  }, []);


  return (
    <section className="repository-list">


      <h1> Lista de repositórios</h1>

      <div className="hea">

        <div className="input-group">
          <select value={newUserOrOrgs} onChange={handleChange}>
            <option value={1}>User</option>
            <option value={2}>Org</option>

          </select>
          <input
            type="text"
            placeholder="nome do Usuario no git hub"
            onChange={(e) => setNewUser(e.target.value)}
            value={newUser}
          />

          <button type="submit" data-testid="add-task-button" onClick={repositoryGitHub}>
            procurar
          </button>
        </div>

      </div>
      <ul>
        {repositories.map(repository => {

          return <RepositoryItem key={repository.name} repository={repository} />
        })}

      </ul>
    </section>
  );

}