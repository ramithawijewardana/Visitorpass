const isVisitorPage = window.location.pathname.endsWith('visitor.html');
const isDetailsPage = window.location.pathname.endsWith('details.html');

function getQueryParams() {
  const params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str,key,value) {
    params[key] = decodeURIComponent(value.replace(/\+/g, " "));
  });
  return params;
}

const params = getQueryParams();

if (isVisitorPage) {
  // On visitor.html: show only the QR code
  const qrDiv = document.getElementById('qrcode');
  if (params.name && params.room && params.date && params.time && params.purpose) {
    // Generate a secret (for demo, use a random string)
    const secret = Math.random().toString(36).substring(2, 10);
    // Build details.html link
    const detailParams = Object.entries(params).map(([k,v]) => `${k}=${encodeURIComponent(v)}`).join('&') + `&secret=${secret}`;
    const detailsLink = `${window.location.origin}/details.html?${detailParams}`;
    // Generate QR code for details.html
    new QRCode(qrDiv, {
      text: detailsLink,
      width: 220,
      height: 220
    });
  } else {
    qrDiv.innerHTML = '<span style="color:red;">Invalid or missing visitor data.</span>';
  }
}

if (isDetailsPage) {
  // On details.html: show only the details if secret is present
  const detailsDiv = document.getElementById('details-container');
  if (params.secret && params.name && params.room && params.date && params.time && params.purpose) {
    detailsDiv.innerHTML = `
      <h2>Visitor Pass</h2>
      <div class="info"><span class="label">Name:</span> ${params.name}</div>
      <div class="info"><span class="label">Room:</span> ${params.room}</div>
      <div class="info"><span class="label">Date:</span> ${params.date}</div>
      <div class="info"><span class="label">Time:</span> ${params.time}</div>
      <div class="info"><span class="label">Purpose:</span> ${params.purpose}</div>
    `;
  } else {
    detailsDiv.innerHTML = '<span style="color:red;">Access denied or missing data.</span>';
  }
}
