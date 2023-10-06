// const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
// const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

function raceSearch(e) {
    e.preventDefault();
    let raceForm = document.getElementById("race")
    fetch(`http://localhost:5000/race/${raceForm.value}`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        // .then((response) => response.json()) // Parse the response as JSON
        // .then((data) => console.log(data)) // Do something with the data
        .then((data) => {
            viewOneRace(data)
        })
        .catch((error) => console.error(error)); // Handle errors
}

function viewOneRace(data) {
    fetch(`http://localhost:5000/race/view`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .catch((error) => console.error(error)); // Handle errors
}
const skillDesc = document.querySelector("#skill_desc")
function findSkill(skill) {
    console.log("submitted " + skill)
    fetch(`http://localhost:5000/skill/view/${skill}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            skillDesc.innerHTML = data.desc[0]
        })
        .catch(err => console.log(err))

}

const traitDesc = document.querySelector('#trait_desc')
function findTrait(trait) {
    console.log("submitted " + trait)
    fetch(`http://localhost:5000/trait/view/${trait}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            traitDesc.innerHTML = data.desc
        })
        .catch(err => console.log(err))

}

function findRule(rule) {

    let ruleDesc = document.querySelector(`#table_${rule}`)
    console.log("submitted " + rule)
    fetch(`http://localhost:5000/rule/view/${rule}`)
        .then(res => res.json())
        .then(data => {

            if (ruleDesc.innerHTML.includes(data.subsections[0].name)) {
                return null
            }
            else {
                console.log(data)
                for (let i = 0; i < data.subsections.length; i++) {
                    ruleDesc.innerHTML += '<tr><td>'+ '- ' + `<button id='pop_${data.subsections[i].index}' type="button" class="btn btn-outline-primary" onclick="popRule('${data.subsections[i].index}')" type="button" class="btn btn-lg btn-danger" data-bs-toggle="popover" data-bs-title='${data.subsections[i].name}' data-bs-content="Rolling dice..." data-bs-html="true">` + data.subsections[i].name + '</button>' + '</tr></td>'
            }
            const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
            const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
            }


        })
        .catch(err => console.log(err))
}

function popRule(rule){
    let popOverDesc = document.querySelector(`#pop_${rule}`)
    console.log("submitted " + rule)
    fetch(`http://localhost:5000/popover/view/${rule}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            var popover = bootstrap.Popover.getInstance(`#pop_${rule}`)
            console.log(popover)
            popover.setContent({'.popover-body': `${data.desc.substring(2,300)}.... <br></br><a  class="link-primary link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href='/onerule/view/${rule}'>Learn More</a>`} )    
        })

}
