function getQueryParams() {
  const params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str,key,value) {
    params[key] = decodeURIComponent(value.replace(/\+/g, " "));
  });
  return params;
}
const params = getQueryParams();

// Generate QR code for the current URL
new QRCode(document.getElementById("qrcode"), {
  text: window.location.href,
  width: 200,
  height: 200
});

// Show details only when button is clicked
const detailsDiv = document.getElementById('details');
const btn = document.getElementById('show-details-btn');
btn.onclick = function() {
  if (params.name && params.room && params.date && params.time && params.purpose) {
    detailsDiv.innerHTML = `
      <h2>Visitor Pass</h2>
      <div class="info"><span class="label">Name:</span> ${params.name}</div>
      <div class="info"><span class="label">Room:</span> ${params.room}</div>
      <div class="info"><span class="label">Date:</span> ${params.date}</div>
      <div class="info"><span class="label">Time:</span> ${params.time}</div>
      <div class="info"><span class="label">Purpose:</span> ${params.purpose}</div>
    `;
    detailsDiv.style.display = "block";
    btn.style.display = "none";
  } else {
    detailsDiv.innerHTML = `<span style="color:red;">Invalid or missing visitor data.</span>`;
    detailsDiv.style.display = "block";
  }
};
