// Fetch data from data.json
let data = [];

fetch('js/data.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        initializeFilters();
        renderTable(data);
    })
    .catch(error => console.error('Error fetching data:', error));

// DOM Elements
const dataTable = document.getElementById("dataTable");
const shelfLifeFilter = document.getElementById("shelfLifeFilter");
const ovenSettingFilter = document.getElementById("ovenSettingFilter");

// Initialize Filters
function initializeFilters() {
    // Get unique values for filters
    const uniqueShelfLife = [...new Set(data.map(item => item["Shelf Life"]))];
    const uniqueOvenSettings = [...new Set(data.map(item => item["Oven Setting"]))];

    // Populate Shelf Life Filter
    uniqueShelfLife.forEach(shelfLife => {
        const option = document.createElement("option");
        option.value = shelfLife;
        option.textContent = shelfLife;
        shelfLifeFilter.appendChild(option);
    });

    // Populate Oven Setting Filter
    uniqueOvenSettings.forEach(ovenSetting => {
        const option = document.createElement("option");
        option.value = ovenSetting;
        option.textContent = ovenSetting;
        ovenSettingFilter.appendChild(option);
    });
}

// Render Table
function renderTable(filteredData) {
    dataTable.innerHTML = "";
    filteredData.forEach(item => {
        const row = `
      <tr>
        <td>${item["Retail Line"]}</td>
        <td>${item["Shelf Life"]}</td>
        <td>${item["Oven Setting"]}</td>
      </tr>`;
        dataTable.insertAdjacentHTML("beforeend", row);
    });
}

// Filters
document.getElementById("searchInput").addEventListener("input", filterTable);
shelfLifeFilter.addEventListener("change", filterTable);
ovenSettingFilter.addEventListener("change", filterTable);

// Filter Function
function filterTable() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const shelfLifeValue = shelfLifeFilter.value;
    const ovenSettingValue = ovenSettingFilter.value;

    const filteredData = data.filter(item => {
        const matchesSearch = item["Retail Line"].toLowerCase().includes(searchValue);
        const matchesShelfLife = !shelfLifeValue || item["Shelf Life"] === shelfLifeValue;
        const matchesOvenSetting = !ovenSettingValue || item["Oven Setting"] == ovenSettingValue;
        return matchesSearch && matchesShelfLife && matchesOvenSetting;
    });

    renderTable(filteredData);
}
