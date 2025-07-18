// script.js

// Parse URL query parameters
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    name: params.get("name"),
    room: params.get("room"),
    date: params.get("date"),
    time: params.get("time"),
    purpose: params.get("purpose")
  };
}

// Render visitor pass or error message
function renderVisitorPass() {
  const container = document.getElementById("pass-container");
  const { name, room, date, time, purpose } = getQueryParams();

  if (!name || !room || !date || !time || !purpose) {
    container.innerHTML = `
      <div class="error">
        Error: Missing one or more required fields. Please check the URL parameters.
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="pass-card">
      <h2>Visitor Pass</h2>
      <div class="pass-detail"><strong>Name:</strong> ${decodeURIComponent(name)}</div>
      <div class="pass-detail"><strong>Room:</strong> ${decodeURIComponent(room)}</div>
      <div class="pass-detail"><strong>Date:</strong> ${decodeURIComponent(date)}</div>
      <div class="pass-detail"><strong>Time:</strong> ${decodeURIComponent(time)}</div>
      <div class="pass-detail"><strong>Purpose:</strong> ${decodeURIComponent(purpose)}</div>
    </div>
  `;
}

// Execute on load
document.addEventListener("DOMContentLoaded", renderVisitorPass);
