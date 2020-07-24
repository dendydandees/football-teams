const API_KEY = 'e34049b056b848529f51a3b024277e82'
const BASE_URL = 'https://api.football-data.org/v2/competitions/'
const LEAGUE_ID = '2001'

const ENDPOINT_STANDINGS = `${BASE_URL}${LEAGUE_ID}/standings?standingType=TOTAL`
const ENDPOINT_ALLTEAMS = `${BASE_URL}${LEAGUE_ID}/teams?stage=group`

// status dari fetch
const status = (response) => {
  if (response.status !== 200) {
    console.log(`Error : ${response.status}`)
    document.getElementById('loader').style.display = 'none'
    return Promise.reject(new Error(response.statusText))
  } else {
    return Promise.resolve(response)
  }
}

// parsing data json
const json = (response) => {
  return response.json()
}

// handle error
const error = (error) => {
  console.log('Error : ' + error)
}

// fetch function
const fetchAPI = (url) => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': API_KEY,
    },
  })
    .then(status)
    .then(json)
    .catch(error)
}

const getStandings = () => {
  if ('caches' in window) {
    caches.match(ENDPOINT_STANDINGS).then((response) => {
      if (response) {
        response.json().then((data) => {
          getStandingsTemplate(data)
        })
      }
    })
  }

  fetchAPI(ENDPOINT_STANDINGS)
    .then((data) => {
      getStandingsTemplate(data)
    })
    .catch(error)
}

const getTeams = () => {
  if ('caches' in window) {
    caches.match(ENDPOINT_ALLTEAMS).then((response) => {
      if (response) {
        response.json().then((data) => {
          getTeamsTemplate(data)
        })
      }
    })
  }

  fetchAPI(ENDPOINT_ALLTEAMS)
    .then((data) => {
      getTeamsTemplate(data)
    })
    .catch(error)
}

const getStandingsTemplate = (data) => {
  let groupsHTML = ''

  data.standings.map((standing) => {
    const club = standing.table.map((club) => {
      const { position, playedGames, won, draw, lost, points } = club
      const { crestUrl, name } = club.team
      return `
              <tr>
                <td class="valign-wrapper">
                  <p class="valign-wrapper">${position}</p>
                  <img src="${crestUrl.replace(/^http:\/\//i,'https://')}" class="valign-wrapper" onerror="onerror=''" alt="Logo ${name}">
                  ${name}
                </td>
                <td>${playedGames}</td>
                <td>${won}</td>
                <td>${draw}</td>
                <td>${lost}</td>
                <td>${points}</td>
              </tr>
            `
    })

    groupsHTML += `
            <table class="highlight yellow black-text z-depth-3">
              <thead>
                <tr>
                  <th>${standing.group}</th>
                  <th>GP</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>P</th>
                </tr>
              </thead>
              <tbody>
                ${club}
              </tbody>
            </table>
          `
  })
  document.getElementById('standings').innerHTML = groupsHTML
  document.getElementById('standings-title').textContent = data.competition.name
  document.getElementById('loader').style.display = 'none'
}

const getTeamsTemplate = (data) => {
  let teamsHTML = ''

  data.teams.map((team) => {
    const { id, crestUrl, venue, name } = team
    teamsHTML += `
      <div class="card-panel yellow team">
        <img
          src="${crestUrl.replace(/^http:\/\//i, 'https://')}"
          alt="Logo ${name}"
          width="80"
          onerror="onerror=''"
        />
        <div class="details">
          <span class="card-title truncate">${name}</span>
          <p>${venue ? venue : ''}</p>
        </div>
        <div class="actions">
          <button
            class="waves-effect waves-light btn-floating right yellow darken-2"
            onclick = "addSavedTeam(${id},'${crestUrl}','${name}','${venue}')"
            ><i class="material-icons">bookmark</i></button
          >
        </div>
      </div>
    `
  })

  document.getElementById('teams').innerHTML = teamsHTML
  document.getElementById('loader').style.display = 'none'
}

export default {
  getStandings,
  getTeams,
}
