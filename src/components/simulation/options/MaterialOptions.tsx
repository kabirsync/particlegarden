import MoveVerticalLiquidOptions from "@/components/simulation/options/MovesVerticalLiquidOptions";
import MoveVerticalOptions from "@/components/simulation/options/MoveVerticalOptions";
import StrokeOptions from "@/components/simulation/options/StrokeOptions";

const MaterialOptions = () => {
  return (
    <div className="flex flex-col gap-3">
      <StrokeOptions />
      <MoveVerticalOptions />
      <MoveVerticalLiquidOptions />
    </div>
  );
};

export default MaterialOptions;
