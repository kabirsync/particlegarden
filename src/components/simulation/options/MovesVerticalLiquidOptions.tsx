import {
  diagonalSpreadRefAtom,
  horizontalSpreadRefAtom,
  selectedMaterialAtom,
  verticalSpreadRefAtom,
} from "@/components/simulation/simulationState";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  defaultDiagonalSpread,
  defaultHorizontalSpread,
  defaultVerticalSpread,
} from "@/lib/constants";
import { useAtom } from "jotai";
import { useState } from "react";

const MoveVerticalLiquidOptions = () => {
  const [selectedMaterial] = useAtom(selectedMaterialAtom);
  const [diagonalSpreadRef] = useAtom(diagonalSpreadRefAtom);
  const [verticalSpreadRef] = useAtom(verticalSpreadRefAtom);
  const [horizontalSpreadRef] = useAtom(horizontalSpreadRefAtom);
  const [diagonalSpread, setDiagonalSpread] = useState(defaultDiagonalSpread);
  const [verticalSpread, setVerticalSpread] = useState(defaultVerticalSpread);
  const [horizontalSpread, setHorizontalSpread] = useState(
    defaultHorizontalSpread
  );

  const handleDiagonalSpreadChange = (value: number) => {
    setDiagonalSpread(value);
    diagonalSpreadRef.current = value;
  };
  const handleVerticalSpreadChange = (value: number) => {
    setVerticalSpread(value);
    verticalSpreadRef.current = value;
  };
  const handleHorizontalSpreadChange = (value: number) => {
    setHorizontalSpread(value);
    horizontalSpreadRef.current = value;
  };
  return (
    <>
      {["Water", "Smoke", "Acid", "Lava", "Oil"].includes(selectedMaterial) && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="diagonalSpread" className="text-xs">
              Diagonal Spread
            </Label>
            <Slider
              id="diagonalSpread"
              className="py-1"
              value={[diagonalSpread]}
              min={1}
              max={10}
              step={1}
              onValueChange={(values: number[]) => {
                handleDiagonalSpreadChange(values[0]);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="diagonalSpread" className="text-xs">
              Vertical Spread
            </Label>
            <Slider
              id="diagonalSpread"
              className="py-1"
              value={[verticalSpread]}
              min={1}
              max={10}
              step={1}
              onValueChange={(values: number[]) => {
                handleVerticalSpreadChange(values[0]);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="diagonalSpread" className="text-xs">
              Horizontal Spread
            </Label>
            <Slider
              id="diagonalSpread"
              className="py-1"
              value={[horizontalSpread]}
              min={1}
              max={10}
              step={1}
              onValueChange={(values: number[]) => {
                handleHorizontalSpreadChange(values[0]);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MoveVerticalLiquidOptions;
