document.addEventListener("DOMContentLoaded", () => {
  // VARIABLES
  const allMonsters = "http://localhost:3000/monsters"
  const fiftyMonsters = "http://localhost:3000/monsters/?_limit=50&_page=3"
  const monsterContainer = document.getElementById('monster-container')
  const createMonsterDiv = document.getElementById('create-monster')
  const monsterForm = document.getElementById('monster-form')
  console.log(monsterForm)

  // FETCH REQUESTS
  function fetchMonsters(){
    fetch(fiftyMonsters)
    .then(resp => resp.json())
    .then(monsters => renderMonsters(monsters))
  }

  // EVENT LISTENERS



  // FUNCTIONS
  function renderMonsters(monsters){
    monsters.forEach(monster => {
      const monsterDiv = document.createElement("div")
      monsterDiv.dataset.id = monster.id
      monsterDiv.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>${monster.age}</h4>
        <p>${monster.description}</p>
      `
      monsterContainer.append(monsterDiv)
     })
  }

  function createMonsterForm(){
    const monsterForm = document.createElement("form")
    monsterForm.id = "monster-form"
    monsterForm.innerHTML = `
      <label for="name">name:</label>
      <input type="text" id="name" name="name">
      <label for="age">age:</label>
      <input type="text" id="age" name="age">
      <label for="description">description:</label>
      <input type="text" id="description" name="description">
      <button type="button">Create Monster</button>
    `
    createMonsterDiv.append(monsterForm)
  }

  // EXECUTIONS
  fetchMonsters()
  createMonsterForm()

})