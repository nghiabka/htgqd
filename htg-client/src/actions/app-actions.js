import axios from 'axios'

const client = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json"
  }
})

var hobby = [], group = [], school = [];

export function fetchData () {
  return dispatch => {
    client.get('api/hobby').then(function (response){
      hobby = response.data.data;
      client.get('api/school').then( function(response){
        school = response.data.data;
        client.get('api/group').then( function(response){
          group = response.data.data
          console.log('success')
          dispatch({
            type: 'FETCH_DATA',
            hobby,
            school,
            group,
          })
        })
      })
    })
  }
}
