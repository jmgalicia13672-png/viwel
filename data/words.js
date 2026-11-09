const BRANCH = {
  id: "thermo",
  name: "Thermodynamics",
  blurb: "Temperature, heat transfer, the laws of thermodynamics, and engines.",
  terms: [
    {
      term: "Temperature",
      def: "Measure of the average kinetic energy of particles.",
      scenario: "A doctor reads 38.5 °C on a thermometer and says you have a fever.",
      photos: [
        { src: "images/thermo/temperature-1.jpg", caption: "A clinical thermometer being read" },
        { src: "images/thermo/temperature-2.jpg", caption: "A weather display on a hot summer street" }
      ]
    },
    {
      term: "Heat",
      def: "Energy transferred because of a temperature difference.",
      scenario: "Wrap your cold hands around a mug of hot cocoa: your hands warm up while the cocoa slowly cools down.",
      photos: [
        { src: "images/thermo/heat-1.jpg", caption: "A pot of water on a lit stove" },
        { src: "images/thermo/heat-2.jpg", caption: "An ice cube melting on a warm hand" }
      ]
    },
    {
      term: "Internal energy",
      def: "The total of the microscopic kinetic and potential contributions of a system's particles.",
      scenario: "Rub your hands together for ten seconds and they feel warmer, even though your hands as a whole aren't moving any faster afterward.",
      photos: [
        { src: "images/thermo/internal-energy-1.jpg", caption: "A cup of steaming tea" },
        { src: "images/thermo/internal-energy-2.jpg", caption: "A frying pan sizzling on a stove" }
      ]
    },
    {
      term: "Specific heat capacity",
      answer: "Specific heat",
      def: "Amount of thermal energy needed to raise the temperature of one unit of mass by one degree.",
      scenario: "On a sunny beach the sand burns your feet by midday, while the sea beside it has barely warmed.",
      photos: [
        { src: "images/thermo/specific-heat-capacity-1.jpg", caption: "A sandy beach next to calm sea water" },
        { src: "images/thermo/specific-heat-capacity-2.jpg", caption: "A metal pan and a pot of water side by side on a stove" }
      ]
    },
    {
      term: "Latent heat",
      def: "Thermal energy absorbed or released during a phase change with no temperature change.",
      scenario: "Water at 100 °C keeps absorbing energy from the burner while it boils, yet the thermometer reading never rises.",
      photos: [
        { src: "images/thermo/latent-heat-1.jpg", caption: "A pot of water at a rolling boil" },
        { src: "images/thermo/latent-heat-2.jpg", caption: "Ice cubes melting in a glass at room temperature" }
      ]
    },
    {
      term: "Thermal equilibrium",
      answer: "Equilibrium",
      def: "State in which objects in contact reach the same temperature.",
      scenario: "You drop a warm metal spoon into a cup of cool water; after a few minutes the two feel the same and stop changing.",
      photos: [
        { src: "images/thermo/thermal-equilibrium-1.jpg", caption: "A spoon resting in a cup of tea" },
        { src: "images/thermo/thermal-equilibrium-2.jpg", caption: "A cold can left out on a table for a long time" }
      ]
    },
    {
      term: "Zeroth law of thermodynamics",
      answer: "Zeroth law",
      def: "If two systems are each in balance with a third, they are in balance with each other.",
      scenario: "A probe gives the same reading in a cup of tea as it later does in a bowl of soup, so you know the tea and soup match without ever putting them together.",
      photos: [
        { src: "images/thermo/zeroth-law-of-thermodynamics-1.jpg", caption: "A probe placed in a cup of tea" },
        { src: "images/thermo/zeroth-law-of-thermodynamics-2.jpg", caption: "Heat flows from the hot cup into the room, and the cold cup absorbs heat from the room" }
      ]
    },
    {
      term: "First law of thermodynamics",
      answer: "First law",
      def: "A change in internal energy equals heat added minus work done.",
      scenario: "A bike pump gets warm as you push the plunger in: the effort you put in has to show up somewhere.",
      photos: [
        { src: "images/thermo/first-law-of-thermodynamics-1.jpg", caption: "A person using a bicycle pump" },
        { src: "images/thermo/first-law-of-thermodynamics-2.jpg", caption: "A pressure cooker on a stove" }
      ]
    },
    {
      term: "Second law of thermodynamics",
      answer: "Second law",
      def: "Heat flows naturally from hot to cold, and the disorder of an isolated system increases.",
      scenario: "A cup of hot cocoa on the table always cools toward room temperature; you never see it warm itself up by pulling energy out of the cooler room.",
      photos: [
        { src: "images/thermo/second-law-of-thermodynamics-1.jpg", caption: "A cup of hot cocoa cooling on a table" },
        { src: "images/thermo/second-law-of-thermodynamics-2.jpg", caption: "A hot pan left to cool on the counter" }
      ]
    },
    {
      term: "Entropy",
      def: "Measure of disorder or energy dispersion.",
      scenario: "A neatly stacked deck of cards gets shuffled, and shuffling again will never bring back the perfect order by chance.",
      photos: [
        { src: "images/thermo/entropy-1.jpg", caption: "Ink spreading through a glass of water" },
        { src: "images/thermo/entropy-2.jpg", caption: "A neatly stacked chips" }
      ]
    },
    {
      term: "Conduction",
      def: "Heat transfer through direct particle contact.",
      scenario: "You leave a metal spoon in a hot pot of soup, and soon the handle is too hot to touch.",
      photos: [
        { src: "images/thermo/conduction-1.jpg", caption: "A metal spoon in a pot of soup" },
        { src: "images/thermo/conduction-2.jpg", caption: "A wooden spoon used on a warm frying pan" }
      ]
    },
    {
      term: "Convection",
      def: "Heat transfer by bulk fluid movement.",
      scenario: "Warm air rises above a heater and cooler air sinks to take its place, setting up a slow loop around the room.",
      photos: [
        { src: "images/thermo/convection-1.jpg", caption: "Steam and warm air rising above a boiling pot" },
        { src: "images/thermo/convection-2.jpg", caption: "A hot air balloon rising" }
      ]
    },
    {
      term: "Radiation",
      def: "Heat transfer by electromagnetic waves.",
      scenario: "You feel the warmth of the sun on your face even though the space between you and it is empty.",
      photos: [
        { src: "images/thermo/radiation-1.jpg", caption: "The sun shining on a person's face" },
        { src: "images/thermo/radiation-2.jpg", caption: "People sitting around a campfire" }
      ]
    },
    {
      term: "Isothermal process",
      answer: "Isothermal",
      def: "A change that happens at constant temperature.",
      scenario: "A gas is squeezed very slowly while sitting in a big water bath that keeps its thermometer reading from changing.",
      photos: [
        { src: "images/thermo/isothermal-process-1.jpg", caption: "A beaker sitting in a large water bath" },
        { src: "images/thermo/isothermal-process-2.jpg", caption: "A sealed gas syringe in a lab" }
      ]
    },
    {
      term: "Isobaric process",
      answer: "Isobaric",
      def: "A change that happens at constant pressure.",
      scenario: "Air in a cylinder with a freely sliding lid is warmed, so the lid rises while the push on it stays steady.",
      photos: [
        { src: "images/thermo/isobaric-process-1.jpg", caption: "A balloon expanding as it warms" },
        { src: "images/thermo/isobaric-process-2.jpg", caption: "A pot with a loose lid lifting as water heats" }
      ]
    },
    {
      term: "Isochoric process",
      answer: "Isochoric",
      def: "A change that happens at constant volume.",
      scenario: "Soup warmed inside a sealed, rigid can: the can can't expand, so the pressure inside climbs.",
      photos: [
        { src: "images/thermo/isochoric-process-1.jpg", caption: "A sealed metal can left in a hot car" },
        { src: "images/thermo/isochoric-process-2.jpg", caption: "A pressure gauge on a sealed tank" }
      ]
    },
    {
      term: "Adiabatic process",
      answer: "Adiabatic",
      def: "A change with no heat exchange.",
      scenario: "Air squeezed very fast in a diesel engine cylinder gets hot enough to ignite fuel, with no spark and no time for warmth to leak out.",
      photos: [
        { src: "images/thermo/adiabatic-process-1.jpg", caption: "A diesel truck engine" },
        { src: "images/thermo/adiabatic-process-2.jpg", caption: "A compressed-air spray can feeling cold as it is used" }
      ]
    },
    {
      term: "Carnot efficiency",
      answer: "Carnot",
      def: "Maximum possible ratio of useful work to heat input for an engine between two temperatures.",
      scenario: "However well it's built, a power plant running between steam at 500 °C and river water at 20 °C can never turn all of its input into useful output.",
      photos: [
        { src: "images/thermo/carnot-efficiency-1.jpg", caption: "A power plant with cooling towers" },
        { src: "images/thermo/carnot-efficiency-2.jpg", caption: "A steam turbine" }
      ]
    },
    {
      term: "Heat engine",
      def: "A device converting thermal energy into work.",
      scenario: "Inside a car, burning fuel pushes the pistons and turns the wheels.",
      photos: [
        { src: "images/thermo/heat-engine-1.jpg", caption: "A car's motor under the hood" },
        { src: "images/thermo/heat-engine-2.jpg", caption: "A steam locomotive" }
      ]
    },
    {
      term: "Refrigerator",
      def: "A device that uses work to move thermal energy from cold to hot.",
      scenario: "The back of your kitchen's cold box feels warm to the touch while the inside stays cold.",
      photos: [
        { src: "images/thermo/refrigerator-1.jpg", caption: "A kitchen appliance with its door open" },
        { src: "images/thermo/refrigerator-2.jpg", caption: "The coils on the back of a kitchen appliance" }
      ]
    }
  ]
};
