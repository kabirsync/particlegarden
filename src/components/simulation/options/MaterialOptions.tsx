import MoveVerticalLiquidOptions from "@/components/simulation/options/MovesVerticalLiquidOptions";
import MoveVerticalOptions from "@/components/simulation/options/MoveVerticalOptions";
import StrokeColorOptions from "@/components/simulation/options/StrokeColorOptions";
import StrokeSizeOptions from "@/components/simulation/options/StrokeSizeOptions";
import { selectedMaterialAtom } from "@/components/simulation/simulationState";
import { useAtom } from "jotai";

const MaterialOptions = () => {
  const [selectedMaterial] = useAtom(selectedMaterialAtom);

  return (
    <div className="flex flex-col gap-3">
      <StrokeSizeOptions />
      {[
        "Sand",
        "Wood",
        "Water",
        "Smoke",
        "Acid",
        "Gas",
        "Oil",
        "Stone",
      ].includes(selectedMaterial) && <StrokeColorOptions />}
      {["Sand", "Water", "Smoke", "Acid", "Lava", "Gas", "Oil"].includes(
        selectedMaterial
      ) && <MoveVerticalOptions />}
      {["Water", "Smoke", "Acid", "Lava", "Oil", "Gas"].includes(
        selectedMaterial
      ) && <MoveVerticalLiquidOptions />}
    </div>
  );
};

export default MaterialOptions;
