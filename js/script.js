// Load JSON Data
const dataUrl = 'js/data.json'; // Replace with your JSON file path

let allData = [];
const dataTable = document.getElementById('dataTable');
const searchInput = document.getElementById('searchInput');
const ovenSettingFilter = document.getElementById('ovenSettingFilter');
const shelfLifeFilter = document.getElementById('shelfLifeFilter');

// Fetch data and initialize
fetch(dataUrl)
    .then(response => response.json())
    .then(data => {
        allData = data;
        displayData(allData);
    })
    .catch(error => console.error('Error loading JSON:', error));

// Display Data
function displayData(data) {
    dataTable.innerHTML = data.map(item => `
    <tr>
      <td>${item["Retail Line"]}</td>
      <td>${item["Forecast Qty"]}</td>
      <td>${item["Shelf Life (Days)"]}</td>
      <td>${item["Oven Setting"]}</td>
    </tr>
  `).join('');
}

// Search and Filter Function
// Search and Filter Function
function filterData() {
    const searchText = searchInput.value.toLowerCase();
    const ovenSetting = ovenSettingFilter.value;
    const shelfLife = shelfLifeFilter.value;

    const filteredData = allData.filter(item => {
        const matchesName = item["Retail Line"].toLowerCase().includes(searchText);
        const matchesOven = ovenSetting ? item["Oven Setting"].toString() === ovenSetting : true;
        const matchesShelfLife = shelfLife ? item["Shelf Life (Days)"].toString() === shelfLife : true;

        return matchesName && matchesOven && matchesShelfLife;
    });

    displayData(filteredData);
}

// Event Listeners
searchInput.addEventListener('input', filterData);
ovenSettingFilter.addEventListener('change', filterData);
shelfLifeFilter.addEventListener('change', filterData);
