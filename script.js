const data = {
  labels: ['Amanah', 'Kompeten', 'Harmonis', 'Loyal', 'Adaptif', 'Kolaboratif'],
  datasets: [{
      label: 'My Stats',
      data: [3, 2,1, 2, 2, 2.5],
      backgroundColor: 'rgba(240, 231, 16, 0.5)',
      borderColor: 'rgba(240, 231, 16, 1)',
      borderWidth: 1
      
  }]
};

const config = {
  type: 'radar',
  data: data,
  options: {
      elements: {
          line: {
              borderWidth: 3
          }
      },
      scales: {
          r: {
              angleLines: {
                  display: true
              },
              suggestedMin: 0,
              suggestedMax: 5
          }
      },
      plugins: {
          legend: {
              display: true,
              position: 'top'
          },
          title: {
              display: true,
              text: ''
          }
      }
  }
};

const myRadarChart = new Chart(
  document.getElementById('myRadarChart'),
  config
);

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        document.getElementById('loading').classList.remove('hidden');
        navigator.geolocation.getCurrentPosition(showWeather, showError);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function showWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('cityName').textContent = data.name;
                document.getElementById('temperature').textContent = data.main.temp;
                document.getElementById('weatherDescription').textContent = data.weather[0].description;

                const iconCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                document.getElementById('weatherIcon').src = iconUrl;

                document.getElementById('weatherResult').classList.remove('hidden');
                document.getElementById('loading').classList.add('hidden');
            } else {
                alert('Weather data not found');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data');
        });
}

function showError(error) {
    document.getElementById('loading').classList.add('hidden');
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred.');
            break;
    }
}


document.getElementById('new-task-button').addEventListener('click', function() {
    var newTask = document.getElementById('new-task-input').value;
    if (newTask) {
      var taskItem = document.createElement('li');
      taskItem.className = 'task-item';
      taskItem.innerHTML = '<input type="checkbox" class="task-checkbox" />' + '<span class="task-name">' + newTask + '</span>';
      document.getElementById('task-list').appendChild(taskItem);
      document.getElementById('new-task-input').value = '';
    }
  });
  
  document.getElementById('task-list').addEventListener('change', function(e) {
    if (e.target.type === 'checkbox') {
      e.target.parentElement.classList.toggle('task-done');
    }
  });

