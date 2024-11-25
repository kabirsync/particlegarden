import {
  diagonalSpreadAtom,
  diagonalSpreadRefAtom,
  horizontalSpreadAtom,
  horizontalSpreadRefAtom,
  selectedMaterialAtom,
  verticalSpreadAtom,
  verticalSpreadRefAtom,
} from "@/components/simulation/simulationState";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useAtom } from "jotai";
import { Droplet } from "lucide-react";

const LiquidOptions = () => {
  const [selectedMaterial] = useAtom(selectedMaterialAtom);
  const [diagonalSpreadRef] = useAtom(diagonalSpreadRefAtom);
  const [verticalSpreadRef] = useAtom(verticalSpreadRefAtom);
  const [horizontalSpreadRef] = useAtom(horizontalSpreadRefAtom);
  const [diagonalSpread, setDiagonalSpread] = useAtom(diagonalSpreadAtom);
  const [verticalSpread, setVerticalSpread] = useAtom(verticalSpreadAtom);
  const [horizontalSpread, setHorizontalSpread] = useAtom(horizontalSpreadAtom);

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

  if (
    ["Water", "Smoke", "Acid", "Lava", "Oil", "Gas"].includes(selectedMaterial)
  ) {
    return (
      <>
        <Separator className="mt-2" />
        <div className="px-3 flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <Droplet className="h-4 w-4 text-blue-500 " />
            <span className="text-xs font-bold">Liquid Movement</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="diagonalSpread" className="text-xs">
                <div className="flex items-center justify-between gap-3">
                  <span>Diagonal Spread : </span>
                  <Input
                    className="text-xs h-8 w-min"
                    type="number"
                    min={0}
                    max={10}
                    value={diagonalSpread}
                    onChange={(e) => {
                      if (Number(e.target.value) > 10)
                        handleDiagonalSpreadChange(Number(10));
                      else if (Number(e.target.value) < 1) {
                        handleDiagonalSpreadChange(Number(1));
                      } else {
                        handleDiagonalSpreadChange(Number(e.target.value));
                      }
                    }}
                    step={1}
                  />
                </div>
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
              <Label htmlFor="verticalSpread" className="text-xs">
                <div className="flex items-center justify-between gap-3">
                  <span>Vertical Spread : </span>
                  <Input
                    className="text-xs h-8 w-min"
                    type="number"
                    min={0}
                    max={10}
                    value={verticalSpread}
                    onChange={(e) => {
                      if (Number(e.target.value) > 10)
                        handleVerticalSpreadChange(Number(10));
                      else if (Number(e.target.value) < 1) {
                        handleVerticalSpreadChange(Number(1));
                      } else {
                        handleVerticalSpreadChange(Number(e.target.value));
                      }
                    }}
                    step={1}
                  />
                </div>
              </Label>
              <Slider
                id="verticalSPread"
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
              <Label htmlFor="horizontalSpread" className="text-xs">
                <div className="flex items-center justify-between gap-3">
                  <span>Horizontal Spread : </span>
                  <Input
                    className="text-xs h-8 w-min"
                    type="number"
                    min={0}
                    max={10}
                    value={horizontalSpread}
                    onChange={(e) => {
                      if (Number(e.target.value) > 10)
                        handleHorizontalSpreadChange(Number(10));
                      else if (Number(e.target.value) < 1) {
                        handleHorizontalSpreadChange(Number(1));
                      } else {
                        handleHorizontalSpreadChange(Number(e.target.value));
                      }
                    }}
                    step={1}
                  />
                </div>
              </Label>
              <Slider
                id="horizontalSpread"
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
        </div>
      </>
    );
  } else return null;
};

export default LiquidOptions;
