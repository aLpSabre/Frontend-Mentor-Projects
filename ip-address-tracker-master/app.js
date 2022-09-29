const header = document.querySelector(".header");
const submit = document.getElementById("submit");
const input = document.getElementById("input");
const ipElement = document.getElementById("ip");
const locationElement = document.getElementById("location");
const timezoneElement = document.getElementById("timezone");
const ispElement = document.getElementById("isp");


let ips = JSON.parse(localStorage.getItem("IPS")) || [];
/* L.marker([38.9637, 35.2433],
  { alt: 'city' }).addTo(map) */
  const accessToken = config.MY_API_TOKEN;
  const map = L.map('map').setView([38.9637, 35.2433], 6);
  L.tileLayer(
    `https://tile.jawg.io/jawg-terrain/{z}/{x}/{y}.png?access-token=${accessToken}`, {
    attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">© <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">© OSM contributors</a>',
    minZoom: 2,
    maxZoom: 20
  }
  ).addTo(map);
function renderIps(ips){
  ips.forEach(element => {
    L.marker([element.lat, element.long],
      { alt: `${element.id}` }).addTo(map)
  });
}
renderIps(ips);
submit.addEventListener("click", () => {
  if (input.value.length > 0) {
    getIP(input.value);
    input.value = "";
   
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter an Ip adress!',
  
    })
  }

})




const getIP = async function (ip) {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    console.log(res);
    if (res.error) {
      renderError();
      throw new Error(`${res.status}`);
    }
    const data = await res.json();
    renderData(data);
  }
  catch (error) {

  }
}

function renderError() {

  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Please enter an valid Ip adress!',

  })
}
function renderData(data) {
  console.log(data);
  if(data.error){
    renderError();
    return;
  }

  const { ip, latitude, longitude, utc_offset, country, region, city,org } = data;
  let newIP={}
  newIP.id=ip
  newIP.lat=latitude
  newIP.long=longitude

  console.log(newIP)
  ips.push(newIP)
  localStorage.setItem("IPS",JSON.stringify(ips))
  console.log(ips)
  ipElement.innerText = ip;
  locationElement.innerText = country + " ," + region + ", " + city;
  timezoneElement.innerText = "UTC" + " " + utc_offset;
  ispElement.innerText = org;
  let marker = L.marker([latitude, longitude],
    { alt: 'city' }).addTo(map) // "Kyiv" is the accessible name of this marker
    .bindPopup(`Ip adress is ${ip}`);
  /*   map.flyTo([latitude, longitude], 12,true) */
  map.setView([latitude, longitude], 12)
}

/* getIP("8.8.8.8") */
/* fetch('https://ipapi.co/8.8.8.8/json/')
.then(function(response) {
  response.json().then(jsonData => {
    console.log(jsonData);
  });
})
.catch(function(error) {
  console.log(error)
}); */

/* let ip=prompt("Please enter your name", "Harry Potter"); */

/* var map = L.map('map').setView([51.505, -0.09], 13); */

/* var map = L.map('map', {
  minZoom: 2,
  maxZoom: 20
});

var cartodbAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>';

var positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: cartodbAttribution
}).addTo(map);

map.setView([38.9637, 35.2433], 6);

L.tileLayer.provider('Jawg.Streets', {
  variant: 'jawg-sunny',
  accessToken: 'gmrZfcp8DZm0lWE9EFmO7cRLg6AohmioDxCgiLjkDTyLglJX9zxCgHV1M1NNcuyZ'
}).addTo(map); */