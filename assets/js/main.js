function newVideo(weather) {
  var bv = new Bideo();
  bv.init({
    // Video element
    videoEl: document.querySelector('#background_video'),

    // Container element
    container: document.querySelector('body'),

    // Resize
    resize: true,

    // autoplay: false,

    isMobile: window.matchMedia('(max-width: 768px)').matches,

    playButton: document.querySelector('#play'),
    pauseButton: document.querySelector('#pause'),

    // Array of objects containing the src and type
    // of different video formats to add
    src: [
      {
        src: `/assets/videos/${weather}.mp4`,
        type: 'video/mp4'
      },
   
    ],

    // What to do once video loads (initial frame)
    onLoad: function () {
      document.querySelector('#video_cover').style.display = 'none';
    }
  });
};


function reloadVideo() {
  videoEl: document.querySelector('#background_video').load();
}



function formHandler() {
  document.querySelector('.input').addEventListener('submit', function (event) {
    event.preventDefault()
    const taskFormData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(taskFormData);
    document.querySelector('.input').reset();
    getMeteo(formObject.city);

  });
}
formHandler();

function getMeteo(city) {

  const params = {
    key: '0b96760c50b24f95ae5202232231109',
    query: city,
  }

  axios.get('https://api.weatherapi.com/v1/current.json?&lang=fr', {
      params
    })
    .then(response => {
      const infos = response.data;


      inputInfos(infos);


    }).catch(error => {
      console.log(error);
    });
}

function inputInfos(infos) {
  let weather = ""


  switch (infos.current.condition.text) {
    case "Pluie modérée":
      weather = "rainy";
      break;
    case "Clair":
      weather = "sunny";
      break;
    case "Couvert":
      weather = "cloudy";
      break;
    case "Partiellement nuageux":
      weather = "cloudy";
      break;
    case "Averse de pluie modérée":
      weather = "rainy";
      break;

    case "Ensoleillé":
      weather = "sunny";
      break;

    case "Foyers orageux à proximité":
      weather = "stormy"
      break;

    case "Pluie forte à modérée avec tonerre par endroit":
      weather = "stormy";
      break;

    default:
      weather = "stormy";
      break;
  }



  newVideo(weather)
  reloadVideo()
  let city = document.querySelector('.city');
  let date = document.querySelector('.date');
  let condition = document.querySelector('.condition');
  let conditionimg = document.querySelector('.conditionimg');
  let temp = document.querySelector('.temp');
  let humidity = document.querySelector('.humidity');
  let wind = document.querySelector('.wind');
  let uv = document.querySelector('.uv');
  let cloud = document.querySelector('.cloud');
  let unhide = document.querySelector('.infos');
  let humidityimg = document.querySelector('.humidityimg');
  let windimg = document.querySelector('.windimg');
  let uvimg = document.querySelector('.uvimg');
  let cloudimg = document.querySelector('.cloudimg');
  unhide.classList.remove("is_hidden");


  city.innerText = infos.location.name;
  date.innerText = infos.location.localtime;
  condition.innerText = infos.current.condition.text;

  temp.innerText = `${infos.current.temp_c}°`;
  humidity.innerText = `${infos.current.humidity}%`;
  wind.innerText = `${infos.current.wind_kph}km/h`;
  uv.innerText = `${infos.current.uv}`;
  cloud.innerText = `${infos.current.cloud}%`;

  // Icones
  conditionimg.src = infos.current.condition.icon;
  humidityimg.src = '/assets/icons/drop.png';
  windimg.src = '/assets/icons/wind.png';
  uvimg.src = '/assets/icons/uv.png';
  cloudimg.src = '/assets/icons/clouds.png';


}