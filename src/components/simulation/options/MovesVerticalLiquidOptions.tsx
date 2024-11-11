import {
  diagonalSpreadAtom,
  diagonalSpreadRefAtom,
  horizontalSpreadAtom,
  horizontalSpreadRefAtom,
  vertiacallSpreadAtom,
  verticalSpreadRefAtom,
} from "@/components/simulation/simulationState";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useAtom } from "jotai";

const MoveVerticalLiquidOptions = () => {
  const [diagonalSpreadRef] = useAtom(diagonalSpreadRefAtom);
  const [verticalSpreadRef] = useAtom(verticalSpreadRefAtom);
  const [horizontalSpreadRef] = useAtom(horizontalSpreadRefAtom);
  const [diagonalSpread, setDiagonalSpread] = useAtom(diagonalSpreadAtom);
  const [verticalSpread, setVerticalSpread] = useAtom(vertiacallSpreadAtom);
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
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="diagonalSpread" className="text-xs">
            <div className="flex items-center justify-between gap-3">
              <span className="text-zinc-400">Diagonal Spread : </span>
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
              <span className="text-zinc-400">Vertical Spread : </span>
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
              <span className="text-zinc-400">Horizontal Spread : </span>
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
    </>
  );
};

export default MoveVerticalLiquidOptions;
