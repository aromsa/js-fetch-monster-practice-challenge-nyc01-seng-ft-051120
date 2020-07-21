document.addEventListener("DOMContentLoaded", () => {
  // VARIABLES
  const allMonsters = "http://localhost:3000/monsters"
  const fiftyMonsters = "http://localhost:3000/monsters/?_limit=50&_page=1"
  const monsterContainer = document.getElementById('monster-container')
  const createMonsterDiv = document.getElementById('create-monster')
  let pageCounter = 1 //why do I have to call this outside the function? 

  // FETCH REQUESTS
  function fetchMonsters(url){
    fetch(url)
    .then(resp => resp.json())
    .then(monsters => renderMonsters(monsters))
  }

  function createNewMonster(newMonster){
    fetch(allMonsters, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(newMonster)
    })
    alert(`${newMonster.name} has been saved.`)
  }

  // EVENT LISTENERS
  document.addEventListener("click",function(e){
      if (e.target.id === "forward"){
          pageCounter += 1            
          monsterContainer.innerHTML=""
          fetchMonsters(`http://localhost:3000/monsters/?_limit=50&_page=${pageCounter}`)
      }
      else if (e.target.id === "back"){
          if (pageCounter>1) {
              pageCounter -= 1           
              monsterContainer.innerHTML=""
              fetchMonsters(`http://localhost:3000/monsters/?_limit=50&_page=${pageCounter}`)
          }
          else {
              alert('You are current on page 1.')
          }
      }
  })


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
      <button type="submit">Create Monster</button>
    `
    createMonsterDiv.append(monsterForm)
    monsterForm.addEventListener("submit", e => {
      e.preventDefault()
      let newMonsterForm = e.target
      let name = e.target.name.value
      let age = e.target.age.value
      let description = e.target.description.value
      let newMonster = {name, age, description}
      createNewMonster(newMonster)
      newMonsterForm.reset()
    })
  }

  // EXECUTIONS
  fetchMonsters(fiftyMonsters)
  createMonsterForm()
})