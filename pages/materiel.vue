<template>
  <section class="materiel">
    <h1>MATÉRIEL MILITANT</h1>

    <div class="card-grid">
      <div class="card" v-for="materiel of getMateriel()">
        <a :href="materiel.file">
          <img :src="materiel.image" alt="">
          <h3>{{ materiel.title }}</h3>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
// First, include Leaflet.js library in your HTML file

// Create a map
var map = L.map('map').setView([48.8566, 2.3522], 6); // Set initial view to France

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add GeoJSON data for départements
var departements = L.geoJSON(departementsData).addTo(map);

// Define what happens when a département is clicked
departements.on('click', function (e) {
  var departementCode = e.layer.feature.properties.code; // Assuming each département has a "code" property
  var url = '/' + departementCode; // Construct the URL based on the département code
  window.location.href = url; // Redirect to the URL
});

</script>