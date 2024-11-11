import {
  getMaterialIcon,
  MaterialOptionsType,
} from "@/components/simulation/materials/Material";
import {
  accelerationAtom,
  accelerationRefAtom,
  chanceToCatchAtom,
  chanceToCatchRefAtom,
  diagonalSpreadAtom,
  diagonalSpreadRefAtom,
  fuelAtom,
  fuelRefAtom,
  gravityDirectionAtom,
  gravityDirectionRefAtom,
  horizontalSpreadAtom,
  horizontalSpreadRefAtom,
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
  vertiacallSpreadAtom,
  verticalSpreadRefAtom,
} from "@/components/simulation/simulationState";
import { Button } from "@/components/ui/button";
import {
  acidAcceleration,
  acidColor,
  acidDiagonalSpread,
  acidDirection,
  acidHorizontalSpread,
  acidInitialVelocity,
  acidMaxSpeed,
  acidVerticalSpread,
  clonerColor,
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
  gasDiagonalSpread,
  gasDirection,
  gasFuel,
  gasHorizontalSpread,
  gasInitialVelocity,
  gasMaxSpeed,
  gasSmokeColor,
  gasVerticalSpread,
  lavaAcceleration,
  lavaColor,
  lavaDiagonalSpread,
  lavaDirection,
  lavaFuel,
  lavaHorizontalSpread,
  lavaInitialVelocity,
  lavaMaxSpeed,
  lavaSmokeColor,
  lavaVerticalSpread,
  oilAcceleration,
  oilChanceToCatch,
  oilColor,
  oilDiagonalSpread,
  oilDirection,
  oilFuel,
  oilHorizontalSpread,
  oilInitialVelocity,
  oilMaxSpeed,
  oilSmokeColor,
  oilVerticalSpread,
  sandAcceleration,
  sandColor,
  sandDirection,
  sandInitialVelocity,
  sandMaxSpeed,
  smokeAcceleration,
  smokeColor,
  smokeDiagonalSpread,
  smokeDirection,
  smokeHorizontalSpread,
  smokeInitialVelocity,
  smokeLife,
  smokeMaxSpeed,
  smokeVerticalSpread,
  stoneColor,
  transparentColor,
  voidColor,
  waterAcceleration,
  waterColor,
  waterDiagonalSpread,
  waterDirection,
  waterHorizontalSpread,
  waterInitialVelocity,
  waterMaxSpeed,
  waterVerticalSpread,
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
  const [, setDiagonalSpread] = useAtom(diagonalSpreadAtom);
  const [diagonalSpreadRef] = useAtom(diagonalSpreadRefAtom);
  const [, setVerticalSpread] = useAtom(vertiacallSpreadAtom);
  const [verticalSpreadRef] = useAtom(verticalSpreadRefAtom);
  const [, setHorizontalSpread] = useAtom(horizontalSpreadAtom);
  const [horizontalSpreadRef] = useAtom(horizontalSpreadRefAtom);
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
        setDiagonalSpread(waterDiagonalSpread);
        diagonalSpreadRef.current = waterDiagonalSpread;
        setVerticalSpread(waterVerticalSpread);
        verticalSpreadRef.current = waterVerticalSpread;
        setHorizontalSpread(waterHorizontalSpread);
        horizontalSpreadRef.current = waterHorizontalSpread;
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
        setDiagonalSpread(smokeDiagonalSpread);
        diagonalSpreadRef.current = smokeDiagonalSpread;
        setVerticalSpread(smokeVerticalSpread);
        verticalSpreadRef.current = smokeVerticalSpread;
        setHorizontalSpread(smokeHorizontalSpread);
        horizontalSpreadRef.current = smokeHorizontalSpread;
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
        setDiagonalSpread(oilDiagonalSpread);
        diagonalSpreadRef.current = oilDiagonalSpread;
        setVerticalSpread(oilVerticalSpread);
        verticalSpreadRef.current = oilVerticalSpread;
        setHorizontalSpread(oilHorizontalSpread);
        horizontalSpreadRef.current = oilHorizontalSpread;
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
        setDiagonalSpread(gasDiagonalSpread);
        diagonalSpreadRef.current = gasDiagonalSpread;
        setVerticalSpread(gasVerticalSpread);
        verticalSpreadRef.current = gasVerticalSpread;
        setHorizontalSpread(gasHorizontalSpread);
        horizontalSpreadRef.current = gasHorizontalSpread;
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
        setFuel(lavaFuel);
        fuelRef.current = lavaFuel;
        setDiagonalSpread(lavaDiagonalSpread);
        diagonalSpreadRef.current = lavaDiagonalSpread;
        setVerticalSpread(lavaVerticalSpread);
        verticalSpreadRef.current = lavaVerticalSpread;
        setHorizontalSpread(lavaHorizontalSpread);
        horizontalSpreadRef.current = lavaHorizontalSpread;
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
        setDiagonalSpread(acidDiagonalSpread);
        diagonalSpreadRef.current = acidDiagonalSpread;
        setVerticalSpread(acidVerticalSpread);
        verticalSpreadRef.current = acidVerticalSpread;
        setHorizontalSpread(acidHorizontalSpread);
        horizontalSpreadRef.current = acidHorizontalSpread;
        break;
      }
      case "Cloner": {
        setMaterialColor(clonerColor);
        materialColorRef.current = clonerColor;
        break;
      }
      case "Void": {
        setMaterialColor(voidColor);
        materialColorRef.current = voidColor;
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
