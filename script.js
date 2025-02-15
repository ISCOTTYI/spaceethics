import allObjects from "./spatial-objects.js";
import { checkIfVisible, getTransformObjects } from "./utils.js";

const viz = new Spacekit.Simulation(document.getElementById("main-container"), {
  basePath: "https://typpo.github.io/spacekit/src",
  startDate: Date.now(),
  unitsPerAu: 1.0,
  camera: {
    enableDrift: false,
    initialPosition: [2, -2, 1],
  },
});

// Create a background
const skybox = viz.createSkybox(Spacekit.SkyboxPresets.ESO_GIGAGALAXY);

// Set simulation speed
viz.setJdDelta(viz.getJdDelta() * 0.02);

// Set Controls
// document.getElementById('btn-start').onclick = function () {
//   viz.start();
// };
// document.getElementById('btn-stop').onclick = function () {
//   viz.stop();
//};
//document.getElementById('btn-set-time').onclick = function () {
//viz.setDate(new Date(prompt('Enter a date (YYYY-mm-dd)')));
//};

//show date
const dateElt = document.getElementById("current-date");

const transformedObjects = getTransformObjects(allObjects)


viz.onTick = function () {
  var d = viz.getDate();
  dateElt.innerHTML = d.toLocaleDateString();

  const date = d.getTime();

  transformedObjects.forEach((point) => {
    const pointShouldAppear = checkIfVisible(point, date);

    if (!pointShouldAppear) {
      point.visible = false;
      viz.removeObject(point.newObject);
      return;
    }
    if (!point.visible) {
      point.visible = true;
      point.newObject = viz.createObject(point.name, point.characteristics);
    }
  });
};

document.getElementById("btn-faster").onclick = function () {
  viz.setJdDelta(viz.getJdDelta() * 1.5);
};

document.getElementById("btn-slower").onclick = function () {
  viz.setJdDelta(viz.getJdDelta() * 0.5);
};

// document.getElementById("1950").onclick = function () {
//   viz.setDate(new Date("1950-01-01"));
// };

// document.getElementById("1960").onclick = function () {
//   viz.setDate(new Date("1960-01-01"));
// };

// document.getElementById("1970").onclick = function () {
//   viz.setDate(new Date("1970-01-01"));
// };

// document.getElementById("1980").onclick = function () {
//   viz.setDate(new Date("1980-01-01"));
// };


// document.getElementById("1990").onclick = function () {
//   viz.setDate(new Date("1990-01-01"));
// };

// document.getElementById("2000").onclick = function () {
//   viz.setDate(new Date("2000-01-01"));
// };

// document.getElementById("2010").onclick = function () {
//   viz.setDate(new Date("2010-01-01"));
// };

// document.getElementById("Today").onclick = function () {
//   viz.setDate(Date.now());
// };


// CHAT GPT HERE
const yearSlider = document.getElementById("year-slider");

yearSlider.addEventListener("input", (event) => {
  const selectedYear = parseInt(event.target.value);
  viz.setDate(new Date(`${selectedYear}-01-01`));
});

// NATURAL OBJECTS
const sun = viz.createObject("sun", Spacekit.SpaceObjectPresets.SUN);
viz.createAmbientLight();
viz.createLight([0, 0, 0]);
viz.createLight([(50 * 6440 * 10) ^ 9, 0, 0]);
viz.createLight([10000, 0, 0]);

// planets.forEach(planet => {
//   viz.createObject(planet.name, planet);
// })
// // Then add some planets
viz.createObject("mercury", {
  labelText: "Mercury",
  ephem: Spacekit.EphemPresets.MERCURY,
});
viz.createObject("venus", {
  labelText: "Venus",
  ephem: Spacekit.EphemPresets.VENUS,
});
viz.createObject("mars", {
  labelText: "Mars",
  ephem: Spacekit.EphemPresets.MARS,
});
viz.createObject("uranus", {
  labelText: "Uranus",
  ephem: Spacekit.EphemPresets.URANUS,
});
viz.createObject("saturn", {
  labelText: "Saturn",
  ephem: Spacekit.EphemPresets.SATURN,
});
viz.createObject("naptune", {
  labelText: "Neptune",
  ephem: Spacekit.EphemPresets.NEPTUNE,
});
viz.createObject("jupiter", {
  labelText: "Jupiter",
  ephem: Spacekit.EphemPresets.JUPITER,
});

const moon = viz.createObject("moon", {
  labelText: "moon",
  ephem: Spacekit.EphemPresets.MOON,
});

const earth = viz.createObject("earth", {
  labelText: "Earth",
  ephem: Spacekit.EphemPresets.EARTH,
});

moon.orbitAround(earth);

const earthV = viz.createSphere("earthV", {
  textureUrl:
    "https://raw.githubusercontent.com/typpo/spacekit/master/examples/planet/eso_earth.jpg",
  radius: 6371 / 149598000,
  ephem: Spacekit.EphemPresets.EARTH,
  levelsOfDetail: [
    { radii: 0, segments: 64 },
    { radii: 30, segments: 16 },
    { radii: 60, segments: 8 },
  ],
  atmosphere: {
    enable: true,
    color: 0xc7c1a8,
  },
  rotation: {
    enable: true,
    speed: 0.3,
  },
});

const marsV = viz.createSphere("marsV", {
  textureUrl:
    "./maps/Mars.png",
  radius: 3389 / 149598000,
  ephem: Spacekit.EphemPresets.MARS,
  levelsOfDetail: [
    { radii: 0, segments: 64 },
    { radii: 30, segments: 16 },
    { radii: 60, segments: 8 },
  ],
  atmosphere: {
    enable: true,
    color: 0xc7c1a8,
  },
  rotation: {
    enable: true,
    speed: 0.1,
  },
});

const moonV = viz.createSphere("moonV", {
  textureUrl:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Moon_map_grid_showing_artificial_objects_on_moon.PNG/1280px-Moon_map_grid_showing_artificial_objects_on_moon.PNG",
  radius: 1737 / 149598000,
  ephem: Spacekit.EphemPresets.MOON,
  levelsOfDetail: [
    { radii: 0, segments: 64 },
    { radii: 30, segments: 16 },
    { radii: 60, segments: 8 },
  ],
  atmosphere: {
    enable: true,
    color: 0xc7c1a8,
  },
  rotation: {
    enable: true,
    speed: 0.01,
  },
});
moonV.orbitAround(earth);

//JUPITER
const jupiter3 = viz.createSphere("jupiter3", {
  textureUrl:
    "https://raw.githubusercontent.com/typpo/spacekit/master/examples/jupiter_in_the_solar_system/jupiter2_4k.jpg",
  radius: 71492 / 149598000, // radius in AU, so jupiter is shown to scale
  // radius: 0.1, // Exxagerate Jupiter's size
  ephem: Spacekit.EphemPresets.JUPITER,
  levelsOfDetail: [
    { radii: 0, segments: 64 },
    { radii: 30, segments: 16 },
    { radii: 60, segments: 8 },
  ],
  atmosphere: {
    enable: true,
    color: 0xc7c1a8,
  },
  rotation: {
    enable: true,
    speed: 2,
  },
});

// ARTIFICIAL OBJECTS


document.getElementById("btn-system").onclick = function () {
  viz.getViewer().followObject(sun, [2, 2, 2]);
  viz.zoomToFit(sun, 2);
};


document.getElementById("btn-earth").onclick = function () {
  viz.getViewer().followObject(sun, [-0.75, -0.75, 0.5]);
  viz.zoomToFit(sun, 10000);
  setTimeout(() => {
    {
      viz.getViewer().followObject(earthV, [2, 0, 0]);
      viz.zoomToFit(earth, 0.00003);
    }
  }, 20);
}

document.getElementById("btn-mars").onclick = function () {
  viz.getViewer().followObject(sun, [-0.75, -0.75, 0.5]);
  viz.zoomToFit(sun, 10000);
  setTimeout(() => {
    {
      viz.getViewer().followObject(marsV, [2, 0, 0]);
      viz.zoomToFit(marsV, 0.00001);
    }
  }, 20);
}

document.getElementById("btn-moon").onclick = function () {
  viz.getViewer().followObject(sun, [-0.75, -0.75, 0.5]);
  viz.zoomToFit(sun, 10000);
  setTimeout(() => {
    {
      viz.getViewer().followObject(moonV, [2, 0, 0]);
      viz.zoomToFit(moonV, 0.003);
    }
  }, 20);
}