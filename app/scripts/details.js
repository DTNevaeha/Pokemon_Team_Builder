import { elementFactory } from "./helper_functions.js";


export const pokeDetail = async (e) =>  {
    e.preventDefault()
    const pokemon = e.target;
    const detailsContainer = document.querySelector("#list_content").children[1];
    detailsContainer.innerHTML = ""
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`;

    await fetch(apiUrl).then((response) => (
        response.json()
    ))
    .then(data => (
        getPokemon({data, parentElt: detailsContainer}))
    );  
}

function getPokemon({data, parentElt}){
    const details_card = elementFactory({
        eltType: "div",
        parentElt: parentElt,
        classNames: ["details_card", "align-center", "rounded"],
        attrs: [{
          name: "style", value: "display: flex; flex-direction: column; align-items: center; "
         }]
      });
    
      const heading = elementFactory({
        eltType: "h1",
        text: "Pokemon Details",
        parentElt: details_card,
        classNames: ["card_Title"],
      })
     
      const img = elementFactory({
        parentElt: details_card,
        eltType: "img", 
        classNames: ["col-6"],
        attrs: [
          { name: "alt", value: `${data.name}` },
          {
            name: "src",
            value: `${data.sprites.other.dream_world.front_default}`,
          },
          {name: "style", value:"max-height:200px ; max-width:200px ;"},
        ],
      })

      
      const storage  = localStorage
      const keys = Object.keys(storage) 
      let storageKey = [];
      keys.forEach(key => {
          if (key != "activePage" && key != "teamNum" && key != "length") {
              storageKey.push(key)
            }
        });
        if (storageKey.length > 0) {
          const form = elementFactory({
            eltType: "form",
            parentElt: details_card,
            attrs: [{name: "name", value: "selectForm"}]
          })
          const addToTeamLabel = elementFactory({
            eltType: "label",
            parentElt: form,
            text: "Add to a team:"
          })
          const dropSelect = elementFactory({
            eltType: "select",
            parentElt: form,
            attrs: [{name: "name", value: "selectInput"}]
          })
          const options = ["--Please Choose an option--", ...storageKey]
          options.forEach(option => {
            elementFactory({
                eltType: "option",
                parentElt: dropSelect,
                attrs: [{name: "value", value: `${option}`}],
                text: `${option}`
            })
          })

          const inputSubmit = elementFactory({
            eltType: "input",
            parentElt: form,
            attrs: [{name: "type", value: "submit"}],
            text: "Submit",
            classNames: ["btn","btn-block", "btn-primary"],
          })
          document.forms.selectForm.addEventListener('submit', (e) => {
              const pokemonName = e.target.parentElement.children[3].id
              const teamInput = document.forms.selectForm.elements.selectInput.value;
              let team = localStorage.getItem(teamInput)
              const pokeArr = team.split(",")
              if (pokeArr.length < 7) {
                team += `${pokemonName},`;
                localStorage.setItem(teamInput, team)
              } else {
                e.preventDefault()
                alert("Cannot Add Pokemon, this team is full!")
              }
          })
      }


      const newName = elementFactory({
        eltType: "h3",
        text: `${data.name.slice(0,1).toUpperCase()}${data.name.slice(1)}`,
        parentElt: details_card,
        classNames: ["Poke_Name"],
        attrs: [{name: "id", value: `${data.name}`}]
    })
    
      const section1 = elementFactory({
        eltType: "section",
        parentElt: details_card,
        classNames: ["pokemon_details"],
      })

      for (let index = 0; index < data.types.length; index++) {
        const element = data.types[index];
        elementFactory({
            eltType: "p",
            text: `Type: ${element.type.name.slice(0,1).toUpperCase()}${element.type.name.slice(1)}`,
            parentElt: section1,
            classNames: ["Pok-type"],
          })
      }

    const weight = elementFactory({
      eltType: "p",
        text: `Weight: ${data.weight}`,
        parentElt: section1,
        classNames: ["Poke_weight"] ,
    })

    const height = elementFactory({
      eltType: "p",
        text: `Height: ${data.height}`,
        parentElt: section1,
        classNames: ["Poke_height"],
    })

    const moveArr = []
    for (let index = 0; index < data.moves.length; index++) {
        const element = data.moves[index];
        moveArr.push(element.move.name)
    }

    createMoves({parentElt: section1, moveArr})
}

function createMoves({parentElt, moveArr}) {
    elementFactory({
     eltType: "p",
     text: `Moves: ${moveArr.join(', ')}`,
     parentElt,
     classNames: ["Poke_move"],
     attrs: [{name: "style", value: "strong"}]
    })
    
}