import {
  acidStrengthAtom,
  acidStrengthRefAtom,
  selectedMaterialAtom,
} from "@/components/simulation/simulationState";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useAtom } from "jotai";
import { FlaskConical } from "lucide-react";

const AcidOptions = () => {
  const [selectedMaterial] = useAtom(selectedMaterialAtom);
  const [acidStengthRef] = useAtom(acidStrengthRefAtom);
  const [acidStrength, setAcidStrength] = useAtom(acidStrengthAtom);

  const handleAcidStrengthChange = (value: number) => {
    setAcidStrength(value);
    acidStengthRef.current = value;
  };

  if (["Acid"].includes(selectedMaterial)) {
    return (
      <>
        <Separator className="mt-2" />
        <div className="px-3 flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <FlaskConical className="h-4 w-4 text-green-500 " />
            <span className="text-xs font-bold">Acid</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="diagonalSpread" className="text-xs">
                <div className="flex items-center justify-between gap-3">
                  <span>Acid Strength : </span>
                  <Input
                    className="text-xs h-8 w-min"
                    type="number"
                    min={0}
                    max={1}
                    value={acidStrength}
                    onChange={(e) => {
                      if (Number(e.target.value) > 1)
                        handleAcidStrengthChange(Number(1));
                      else if (Number(e.target.value) < 0) {
                        handleAcidStrengthChange(Number(0));
                      } else {
                        handleAcidStrengthChange(Number(e.target.value));
                      }
                    }}
                    step={0.001}
                  />
                </div>
              </Label>
              <Slider
                id="diagonalSpread"
                className="py-1"
                value={[acidStrength]}
                min={0}
                max={1}
                step={0.001}
                onValueChange={(values: number[]) => {
                  handleAcidStrengthChange(values[0]);
                }}
              />
            </div>
          </div>
        </div>{" "}
      </>
    );
  } else {
    return null;
  }
};

export default AcidOptions;
