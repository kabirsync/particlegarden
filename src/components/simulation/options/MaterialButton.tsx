import {
  getMaterialIcon,
  MaterialOptionsType,
} from "@/components/simulation/materials/Material";
import {
  accelerationAtom,
  accelerationRefAtom,
  chanceToCatchAtom,
  chanceToCatchRefAtom,
  fuelAtom,
  fuelRefAtom,
  gravityDirectionAtom,
  gravityDirectionRefAtom,
  initialVelocityAtom,
  initialVelocityRefAtom,
  lifeAtom,
  lifeRefAtom,
  materialColorAtom,
  materialColorRefAtom,
  maxSpeedAtom,
  maxSpeedRefAtom,
  selectedMaterialAtom,
  smokeColorAtom,
  smokeColorRefAtom,
} from "@/components/simulation/simulationState";
import { Button } from "@/components/ui/button";
import {
  acidAcceleration,
  acidColor,
  acidDirection,
  acidInitialVelocity,
  acidMaxSpeed,
  fireAcceleration,
  fireColor,
  fireDirection,
  fireInitialVelocity,
  fireLife,
  fireMaxSpeed,
  fireSmokeColor,
  gasAcceleration,
  gasChanceToCatch,
  gasColor,
  gasDirection,
  gasFuel,
  gasInitialVelocity,
  gasMaxSpeed,
  gasSmokeColor,
  lavaAcceleration,
  lavaColor,
  lavaDirection,
  lavaInitialVelocity,
  lavaMaxSpeed,
  lavaSmokeColor,
  oilAcceleration,
  oilChanceToCatch,
  oilColor,
  oilDirection,
  oilFuel,
  oilInitialVelocity,
  oilMaxSpeed,
  oilSmokeColor,
  sandAcceleration,
  sandColor,
  sandDirection,
  sandInitialVelocity,
  sandMaxSpeed,
  smokeAcceleration,
  smokeColor,
  smokeDirection,
  smokeInitialVelocity,
  smokeLife,
  smokeMaxSpeed,
  stoneColor,
  transparentColor,
  waterAcceleration,
  waterColor,
  waterDirection,
  waterInitialVelocity,
  waterMaxSpeed,
  woodChanceToCatch,
  woodColor,
  woodFuel,
  woodSmokeColor,
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
  const [, setLife] = useAtom(lifeAtom);
  const [lifeRef] = useAtom(lifeRefAtom);
  const [, setGravityDirection] = useAtom(gravityDirectionAtom);
  const [gravityDirectionRef] = useAtom(gravityDirectionRefAtom);
  const [, setFuel] = useAtom(fuelAtom);
  const [fuelRef] = useAtom(fuelRefAtom);
  const [, setChanceToCatch] = useAtom(chanceToCatchAtom);
  const [chanceToCatchRef] = useAtom(chanceToCatchRefAtom);
  const [, setSmokeColor] = useAtom(smokeColorAtom);
  const [smokeColorRef] = useAtom(smokeColorRefAtom);
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
        setFuel(woodFuel);
        fuelRef.current = woodFuel;
        setChanceToCatch(woodChanceToCatch);
        chanceToCatchRef.current = woodChanceToCatch;
        setSmokeColor(woodSmokeColor);
        smokeColorRef.current = woodSmokeColor;
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
        setGravityDirection(sandDirection);
        gravityDirectionRef.current = sandDirection;
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
        setGravityDirection(waterDirection);
        gravityDirectionRef.current = waterDirection;
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
        setLife(smokeLife);
        lifeRef.current = smokeLife;
        setGravityDirection(smokeDirection);
        gravityDirectionRef.current = smokeDirection;
        break;
      }
      case "Fire": {
        setMaterialColor(fireColor);
        materialColorRef.current = fireColor;
        setMaxSpeed(smokeMaxSpeed);
        maxSpeedRef.current = fireMaxSpeed;
        setInitialVelocity(fireInitialVelocity);
        initialVelocityRef.current = fireInitialVelocity;
        setAcceleration(fireAcceleration);
        accelerationRef.current = fireAcceleration;
        setLife(fireLife);
        lifeRef.current = fireLife;
        setGravityDirection(fireDirection);
        gravityDirectionRef.current = fireDirection;
        setSmokeColor(fireSmokeColor);
        smokeColorRef.current = fireSmokeColor;
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
        setGravityDirection(oilDirection);
        gravityDirectionRef.current = oilDirection;
        setFuel(oilFuel);
        fuelRef.current = oilFuel;
        setChanceToCatch(oilChanceToCatch);
        chanceToCatchRef.current = oilChanceToCatch;
        setSmokeColor(oilSmokeColor);
        smokeColorRef.current = oilSmokeColor;
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
        setGravityDirection(gasDirection);
        gravityDirectionRef.current = gasDirection;
        setFuel(gasFuel);
        fuelRef.current = gasFuel;
        setChanceToCatch(gasChanceToCatch);
        chanceToCatchRef.current = gasChanceToCatch;
        setSmokeColor(gasSmokeColor);
        smokeColorRef.current = gasSmokeColor;
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
        setGravityDirection(lavaDirection);
        gravityDirectionRef.current = lavaDirection;
        setSmokeColor(lavaSmokeColor);
        smokeColorRef.current = lavaSmokeColor;
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
        setGravityDirection(acidDirection);
        gravityDirectionRef.current = acidDirection;
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
