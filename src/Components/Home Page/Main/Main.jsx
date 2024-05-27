import React, { useState } from "react";
import { Header } from "../Header/Header";
import { Home } from "../Home/Home";

const locations = ["Chennai", "Trichy", "Thanjavur"];

export default function Main() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  return (
    <div>
      <Header selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
      <Home selectedLocation={selectedLocation} />
    </div>
  );
}
