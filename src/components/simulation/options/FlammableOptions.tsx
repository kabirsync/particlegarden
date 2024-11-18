import {
  lifeAtom,
  lifeRefAtom,
  selectedMaterialAtom,
  smokeColorAtom,
  smokeColorRefAtom,
} from "@/components/simulation/simulationState";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useAtom } from "jotai";
import { FlameIcon } from "lucide-react";
import { Color } from "three";

const FlammableOptions = () => {
  const [selectedMaterial] = useAtom(selectedMaterialAtom);
  const [smokeColor, setSmokeColor] = useAtom(smokeColorAtom);
  const [smokeColorRef] = useAtom(smokeColorRefAtom);
  const [lifeRef] = useAtom(lifeRefAtom);
  const [life, setLife] = useAtom(lifeAtom);

  const handleLifeChange = (value: number) => {
    setLife(value);
    lifeRef.current = value;
  };

  const handleSmokeColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const newColor = new Color(value);
    setSmokeColor(newColor);
    smokeColorRef.current = newColor;
  };

  if (["Fire", "Lava", "Wood", "Oil", "Gas"].includes(selectedMaterial)) {
    return (
      <>
        <Separator className="mt-2" />
        <div className="px-3 flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <FlameIcon className="h-4 w-4 text-red-500 " />
            <span className="text-xs font-bold">Flammable</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="life" className="text-xs">
                <div className="flex items-center justify-between gap-3">
                  <span>Fuel : </span>
                  <Input
                    className="text-xs h-8 w-min"
                    type="number"
                    min={0}
                    max={10000}
                    value={life}
                    onChange={(e) => {
                      if (Number(e.target.value) > 10000)
                        handleLifeChange(Number(10000));
                      else if (Number(e.target.value) < 0) {
                        handleLifeChange(Number(0));
                      } else {
                        handleLifeChange(Number(e.target.value));
                      }
                    }}
                    step={10}
                  />
                </div>
              </Label>
              <Slider
                id="life"
                className="py-1"
                value={[life]}
                min={0}
                max={10000}
                step={10}
                onValueChange={(values: number[]) => {
                  handleLifeChange(values[0]);
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="colorPicker" className="text-xs">
                Smoke Color:
              </Label>
              <Input
                type="color"
                id="colorPicker"
                value={`#${smokeColor.getHexString()}`}
                onChange={handleSmokeColorChange}
                className="cursor-pointer w-12 h-12 p-0"
              />
            </div>
          </div>
        </div>
      </>
    );
  } else return null;
};

export default FlammableOptions;
