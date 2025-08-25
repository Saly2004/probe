const data = [
  { country: "Deutschland", company: "GreenPower AG", sector: "Energie", emissions: 85.3, year: 2023 },
  { country: "Frankreich", company: "EcoFuel", sector: "Öl & Gas", emissions: 92.1, year: 2023 },
  { country: "USA", company: "CleanFuture Inc.", sector: "Industrie", emissions: 120.5, year: 2023 },
  { country: "China", company: "Dragon Coal", sector: "Bergbau", emissions: 310.2, year: 2023 },
  { country: "Indien", company: "SunEnergy Ltd", sector: "Energie", emissions: 200.1, year: 2023 },
  { country: "Japan", company: "TechnoGas", sector: "Öl & Gas", emissions: 75.4, year: 2023 },
  { country: "Brasilien", company: "Amazon Energy", sector: "Energie", emissions: 95.8, year: 2023 },
  { country: "Kanada", company: "Maple Oil", sector: "Öl & Gas", emissions: 110.2, year: 2023 },
  { country: "Australien", company: "Outback Mining", sector: "Bergbau", emissions: 140.6, year: 2023 },
  { country: "Russland", company: "NordOil", sector: "Öl & Gas", emissions: 210.3, year: 2023 },
  { country: "Mexiko", company: "Aztec Energy", sector: "Energie", emissions: 90.1, year: 2023 },
  { country: "Südafrika", company: "Cape Coal", sector: "Bergbau", emissions: 130.0, year: 2023 },
  { country: "Norwegen", company: "Fjord Energy", sector: "Energie", emissions: 55.4, year: 2023 },
  { country: "Schweden", company: "Nordic Renewables", sector: "Energie", emissions: 40.3, year: 2023 },
  { country: "Finnland", company: "SnowPower", sector: "Energie", emissions: 38.6, year: 2023 },
  { country: "Spanien", company: "Iberia Solar", sector: "Energie", emissions: 88.8, year: 2023 },
  { country: "Italien", company: "Vesuvio Oil", sector: "Öl & Gas", emissions: 97.5, year: 2023 },
  { country: "Griechenland", company: "Athena Energy", sector: "Energie", emissions: 60.7, year: 2023 },
  { country: "Türkei", company: "Anatolia Mining", sector: "Bergbau", emissions: 115.6, year: 2023 },
  { country: "Polen", company: "CoalPol", sector: "Bergbau", emissions: 180.3, year: 2023 },
  { country: "Tschechien", company: "Bohemia Gas", sector: "Öl & Gas", emissions: 70.2, year: 2023 },
  { country: "Ungarn", company: "Danube Energy", sector: "Energie", emissions: 58.4, year: 2023 },
  { country: "Rumänien", company: "Carpathia Oil", sector: "Öl & Gas", emissions: 95.0, year: 2023 },
  { country: "Portugal", company: "Lisbon Energy", sector: "Energie", emissions: 62.3, year: 2023 },
  { country: "Saudi-Arabien", company: "Desert Oil", sector: "Öl & Gas", emissions: 320.0, year: 2023 },
  { country: "VAE", company: "Dune Energy", sector: "Öl & Gas", emissions: 270.0, year: 2023 },
  { country: "Argentinien", company: "Pampa Oil", sector: "Öl & Gas", emissions: 102.0, year: 2023 },
  { country: "Chile", company: "Andes Mining", sector: "Bergbau", emissions: 90.5, year: 2023 },
  { country: "Ägypten", company: "Nile Energy", sector: "Energie", emissions: 150.5, year: 2023 },
  { country: "Nigeria", company: "Lagos Oil", sector: "Öl & Gas", emissions: 220.1, year: 2023 }
];

function initTable() {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '';
  data.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="p-3">${row.country}</td>
      <td class="p-3">${row.company}</td>
      <td class="p-3">${row.sector}</td>
      <td class="p-3 ${row.emissions > 200 ? 'high-emissions' : 'low-emissions'}">${row.emissions} Mt</td>
      <td class="p-3">${row.year}</td>
    `;
    tbody.appendChild(tr);
  });

  const uniqueCountries = [...new Set(data.map(d => d.country))].sort();
  const countrySelect = document.getElementById('countryFilter');
  uniqueCountries.forEach(country => {
    let opt = document.createElement('option');
    opt.value = country;
    opt.text = country;
    countrySelect.appendChild(opt);
  });
}

function sortTable(colIndex) {
  const tbody = document.getElementById('tableBody');
  const rows = Array.from(tbody.querySelectorAll("tr"));
  const ascending = tbody.getAttribute("data-sort") !== "asc";
  tbody.setAttribute("data-sort", ascending ? "asc" : "desc");

  rows.sort((a, b) => {
    let x = a.cells[colIndex].innerText.replace(' Mt', '');
    let y = b.cells[colIndex].innerText.replace(' Mt', '');
    return isNaN(x) ? x.localeCompare(y) * (ascending ? 1 : -1) : (parseFloat(x) - parseFloat(y)) * (ascending ? 1 : -1);
  });

  tbody.innerHTML = "";
  rows.forEach(row => tbody.appendChild(row));
}

function filterTable() {
  const country = document.getElementById('countryFilter').value.toLowerCase();
  const company = document.getElementById('companyFilter').value.toLowerCase();
  document.querySelectorAll('#tableBody tr').forEach(row => {
    const countryText = row.cells[0].innerText.toLowerCase();
    const companyText = row.cells[1].innerText.toLowerCase();
    row.style.display = (country === "" || countryText.includes(country)) &&
                        (company === "" || companyText.includes(company)) ? "" : "none";
  });
}

initTable();

const translations = {
      de: "Willkommen auf unserer Webseite!",
      ar: "مرحبًا بكم في موقعنا!",
      en: "Welcome to our website!"
    };

    function switchLanguage(lang) {
      document.documentElement.lang = lang;
      document.body.dir = lang === "ar" ? "rtl" : "ltr";
      document.getElementById("textContent").textContent = translations[lang] || translations.en;
      localStorage.setItem("preferredLang", lang);
    }

    window.onload = function () {
      const savedLang = localStorage.getItem("preferredLang");
      const browserLang = navigator.language.slice(0, 2); // z.B. "de", "ar", "en"
      const lang = savedLang || (["de", "ar", "en"].includes(browserLang) ? browserLang : "en");
      switchLanguage(lang);
    };

    function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); 

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  const safeName = escapeHTML(name);
  const safeEmail = escapeHTML(email);
  const safeSubject = escapeHTML(subject);
  const safeMessage = escapeHTML(message);

  console.log("Gesicherte Eingaben:", {
    safeName,
    safeEmail,
    safeSubject,
    safeMessage
  });

  alert("Vielen Dank für Ihre Nachricht!");

  e.target.reset();
});

function sanitizeInput(input) {
  return input
    .replace(/</g, "&lt;") 
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

document.querySelector("form").addEventListener("submit", function(e) {
  const inputs = this.querySelectorAll("input, textarea");
  inputs.forEach(input => {
    input.value = sanitizeInput(input.value);
  });
});



