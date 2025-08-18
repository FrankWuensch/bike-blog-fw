---
layout: default
title: Kirchbichl 2025 Touren
header: yes
elevation_profile: no
gpx_tracks:
  - name: Ellmau - Hohe Salve - Ellmau
    gpx: "src/gpx_files/Kirchbichl2025/Ellmau_HoheSalve_Ellmau.gpx"
    color: "#FF0000"
  - name: Itter - Hohe Salve - Schloss Itter - Itter
    gpx: "src/gpx_files/Kirchbichl2025/Itter_HoheSalve_SchlossItter_Itter.gpx"
    color: "#CC0000"
  - name: Kirchbichl - Café Grubers - Kirchbichl
    gpx: "src/gpx_files/Kirchbichl2025/Kirchbichl_CaféGrubers_Kirchbichl.gpx"
    color: "#990000"
  - name: Kirchbichl - Hintersteiner See - Bruckhäusl - Kirchbichl
    gpx: "src/gpx_files/Kirchbichl2025/Kirchbichl_Hinterstein_Bruckhäusl_Kirchbichl.gpx"
    color: "#660000"
  - name: Kirchbichl - Pölvenkreuz - Kirchbichl
    gpx: "src/gpx_files/Kirchbichl2025/Kirchbichl_Pölvenkreuz_Kirchbichl.gpx"
    color: "#330000"
  - name: Kirchbichl - Pendlinghaus - Kirchbichl
    gpx: "src/gpx_files/Kirchbichl2025/MTB_Kirchbichl_Pendlinghaus_Kirchbichl.gpx"
    color: "#0000FF"
  - name: Westendorf - Alpenrosenhütte - Westendorf
    gpx: "src/gpx_files/Kirchbichl2025/Westendorf_Alpenrosenhütte_Westendorf.gpx"
    color: "#0033FF"
---

## Touren Kirchbichl 2025

{%include add_map.html%}

<script>
document.addEventListener("DOMContentLoaded", () => {
  let darkmode = document.documentElement.classList.contains("dark");

  // Initialize Leaflet map
  const map = L.map("map", {
    zoomSnap: 0.1,
    zoomDelta: 0.1,
  }).setView([48.64683407492267, 9.451204869722357], 13);

  // Add tile layer
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

const tracks = [];
let gpxBounds = null; // Außerhalb der Schleife

{% for track in page.gpx_tracks %}
tracks.push({
  name: "{{track.name}}",
  color: "{{track.color}}"
});

console.log("Loading GPX from:", "{{site.baseurl}}{{track.gpx}}");

new L.GPX("{{site.baseurl}}{{track.gpx}}", {
  async: true,
  marker_options: {
    startIconUrl: null,
    endIconUrl: null,
    shadowUrl: null,
    wptIcons: {},
    wptTypeIcons: {}
  },
  polyline_options: {
    color: "{{track.color}}",
    weight: 3,
    opacity: 0.7,
    linecap: "round",
  }
})
.on("loaded", function (e) {
  const gpx = e.target;
  if (!gpxBounds) {
    gpxBounds = gpx.getBounds();
  } else {
    gpxBounds.extend(gpx.getBounds());
  }
  map.fitBounds(gpxBounds, { padding: [40, 40] });
})
.addTo(map);
{% endfor %}


  // Reset View Button
  const resetControl = L.Control.extend({
    options: {
      position: "topleft",
    },

    onAdd: function () {
      const div = L.DomUtil.create("div", "leaflet-control-zoom leaflet-bar");
      const container = L.DomUtil.create("a", "leaflet-bar-part", div);
      container.href = "#";
      container.title = "Reset view";
      container.innerHTML = `
        <div class="flex justify-center items-center w-full h-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-sky-600 dark:text-sky-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5">
            <path d="M12 3a9 9 0 1 1-5.657 2"/>
            <path d="M3 4.5h4v4"/>
          </svg>
        </div>
      `;
      L.DomEvent.on(container, "click", L.DomEvent.stopPropagation)
        .on(container, "click", L.DomEvent.preventDefault)
        .on(container, "click", () => {
          if (gpxBounds) {
            map.fitBounds(gpxBounds, { padding: [40, 40] });
          }
        });
      return div;
    },
  });

  map.addControl(new resetControl());
});
</script>

<br/>

## Tourenübersicht

{% for track in page.gpx_tracks %}
    {{ track.name }}
{% endfor %}
