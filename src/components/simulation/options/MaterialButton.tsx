import {
  getMaterialIcon,
  MaterialOptionsType,
} from "@/components/simulation/materials/Material";
import {
  accelerationAtom,
  accelerationRefAtom,
  initialVelocityAtom,
  initialVelocityRefAtom,
  materialColorAtom,
  materialColorRefAtom,
  maxSpeedAtom,
  maxSpeedRefAtom,
  selectedMaterialAtom,
} from "@/components/simulation/simulationState";
import { Button } from "@/components/ui/button";
import {
  acidAcceleration,
  acidColor,
  acidInitialVelocity,
  acidMaxSpeed,
  fireColor,
  gasAcceleration,
  gasColor,
  gasInitialVelocity,
  gasMaxSpeed,
  lavaAcceleration,
  lavaColor,
  lavaInitialVelocity,
  lavaMaxSpeed,
  oilAcceleration,
  oilColor,
  oilInitialVelocity,
  oilMaxSpeed,
  sandAcceleration,
  sandColor,
  sandInitialVelocity,
  sandMaxSpeed,
  smokeAcceleration,
  smokeColor,
  smokeInitialVelocity,
  smokeMaxSpeed,
  stoneColor,
  transparentColor,
  waterAcceleration,
  waterColor,
  waterInitialVelocity,
  waterMaxSpeed,
  woodColor,
} from "@/lib/constants";
import { useAtom } from "jotai";

type MaterialButtonProps = {
  material: MaterialOptionsType;
};

const MaterialButton = ({ material }: MaterialButtonProps) => {
  const [materialColorRef] = useAtom(materialColorRefAtom);
  const [selectedMaterial, setSelectedMaterial] = useAtom(selectedMaterialAtom);

  const [, setMaterialColor] = useAtom(materialColorAtom);
  const [, setMaxSpeed] = useAtom(maxSpeedAtom);
  const [maxSpeedRef] = useAtom(maxSpeedRefAtom);
  const [, setInitialVelocity] = useAtom(initialVelocityAtom);
  const [initialVelocityRef] = useAtom(initialVelocityRefAtom);
  const [, setAcceleration] = useAtom(accelerationAtom);
  const [accelerationRef] = useAtom(accelerationRefAtom);
  // Helper function to enforce exhaustiveness
  function assertUnreachable(x: never): never {
    throw new Error(`Missing material type handling for: ${x}`);
  }

  const handleSelectedMaterialChange = (
    newSelectedMaterial: MaterialOptionsType
  ) => {
    switch (newSelectedMaterial) {
      case "Empty": {
        setMaterialColor(transparentColor);
        materialColorRef.current = transparentColor;
        break;
      }
      case "Wood": {
        setMaterialColor(woodColor);
        materialColorRef.current = woodColor;
        break;
      }
      case "Sand": {
        setMaterialColor(sandColor);
        materialColorRef.current = sandColor;
        setMaxSpeed(sandMaxSpeed);
        maxSpeedRef.current = sandMaxSpeed;
        setInitialVelocity(sandInitialVelocity);
        initialVelocityRef.current = sandInitialVelocity;
        setAcceleration(sandAcceleration);
        accelerationRef.current = sandAcceleration;
        break;
      }
      case "Water": {
        setMaterialColor(waterColor);
        materialColorRef.current = waterColor;
        setMaxSpeed(waterMaxSpeed);
        maxSpeedRef.current = waterMaxSpeed;
        setInitialVelocity(waterInitialVelocity);
        initialVelocityRef.current = waterInitialVelocity;
        setAcceleration(waterAcceleration);
        accelerationRef.current = waterAcceleration;
        break;
      }
      case "Smoke": {
        setMaterialColor(smokeColor);
        materialColorRef.current = smokeColor;
        setMaxSpeed(smokeMaxSpeed);
        maxSpeedRef.current = smokeMaxSpeed;
        setInitialVelocity(smokeInitialVelocity);
        initialVelocityRef.current = smokeInitialVelocity;
        setAcceleration(smokeAcceleration);
        accelerationRef.current = smokeAcceleration;
        break;
      }
      case "Fire": {
        setMaterialColor(fireColor);
        materialColorRef.current = fireColor;
        break;
      }
      case "Oil": {
        setMaterialColor(oilColor);
        materialColorRef.current = oilColor;
        setMaxSpeed(oilMaxSpeed);
        maxSpeedRef.current = oilMaxSpeed;
        setInitialVelocity(oilInitialVelocity);
        initialVelocityRef.current = oilInitialVelocity;
        setAcceleration(oilAcceleration);
        accelerationRef.current = oilAcceleration;
        break;
      }
      case "Gas": {
        setMaterialColor(gasColor);
        materialColorRef.current = gasColor;
        setMaxSpeed(gasMaxSpeed);
        maxSpeedRef.current = gasMaxSpeed;
        setInitialVelocity(gasInitialVelocity);
        initialVelocityRef.current = gasInitialVelocity;
        setAcceleration(gasAcceleration);
        accelerationRef.current = gasAcceleration;
        break;
      }
      case "Lava": {
        setMaterialColor(lavaColor);
        materialColorRef.current = lavaColor;
        setMaxSpeed(lavaMaxSpeed);
        maxSpeedRef.current = lavaMaxSpeed;
        setInitialVelocity(lavaInitialVelocity);
        initialVelocityRef.current = lavaInitialVelocity;
        setAcceleration(lavaAcceleration);
        accelerationRef.current = lavaAcceleration;
        break;
      }
      case "Stone": {
        setMaterialColor(stoneColor);
        materialColorRef.current = stoneColor;
        break;
      }
      case "Acid": {
        setMaterialColor(acidColor);
        materialColorRef.current = acidColor;
        setMaxSpeed(acidMaxSpeed);
        maxSpeedRef.current = acidMaxSpeed;
        setInitialVelocity(acidInitialVelocity);
        initialVelocityRef.current = acidInitialVelocity;
        setAcceleration(acidAcceleration);
        accelerationRef.current = acidAcceleration;
        break;
      }
      default: {
        assertUnreachable(newSelectedMaterial);
      }
    }

    setSelectedMaterial(newSelectedMaterial);
  };

  return (
    <Button
      className="text-xs flex justify-center"
      variant={selectedMaterial === material ? "secondary" : "outline"}
      onClick={() => handleSelectedMaterialChange(material)}
    >
      {getMaterialIcon(material)} {material}
    </Button>
  );
};

export default MaterialButton;
