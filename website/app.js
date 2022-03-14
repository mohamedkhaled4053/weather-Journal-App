/* Global Variables */
const apiKey = ',&appid=1f2dff15c97c0e29003389ff83b2910e&units=imperial';

// url from openweathermap.org
const weatherUrl='https://api.openweathermap.org/data/2.5/weather?zip='
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// perform process when click
document.getElementById('generate').addEventListener('click', generate)

function generate(event) {
    let zipCode = document.getElementById('zip').value
    let feelings = document.getElementById('feelings').value

    getWeather(weatherUrl, zipCode, apiKey)
    .then((data)=>{
        let date = newDate
        let temp = data.main.temp
        let feel = feelings

        // post data to the server
        postData('/add', {date , temp , feel})

        updateUI()
    })

}

// get data from openweathermap.org
const getWeather = async (url , zip , key)=>{
    const res = await fetch(url + zip + key)
    try{
        const data = await res.json()
        return data
    }catch{
        console.log('error',error);
    }
}

// function to postData
const postData = async ( url = '', data = {})=>{
    console.log(data)
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
  
      try {
        const newData = await response.json();
        // console.log(newData);
        return newData
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }
  
  // function to update UI
  const updateUI = async()=>{
      let res = await fetch ('/all')
      let data = await res.json()
      try {
          // make it visible
          document.getElementById('entryHolder').style.width = '400px'
          document.getElementById('entryHolder').style.height = '150px'

          // modify its content
          document.getElementById('date').innerHTML ='date: ' + data.date
          document.getElementById('temp').innerHTML ='temperature: '  + data.temp +' degrees'
          document.getElementById('content').innerHTML = 'I feel: '+ data.feel
      } catch (error) {
          console.log('error',error);
      }
  }