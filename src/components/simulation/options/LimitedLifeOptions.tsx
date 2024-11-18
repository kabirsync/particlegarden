import {
  lifeAtom,
  lifeRefAtom,
  selectedMaterialAtom,
} from "@/components/simulation/simulationState";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useAtom } from "jotai";
import { Clock } from "lucide-react";

const LimitedLifeOptions = () => {
  const [selectedMaterial] = useAtom(selectedMaterialAtom);
  const [lifeRef] = useAtom(lifeRefAtom);
  const [life, setLife] = useAtom(lifeAtom);

  const handleLifeChange = (value: number) => {
    setLife(value);
    lifeRef.current = value;
  };

  if (["Smoke"].includes(selectedMaterial)) {
    return (
      <>
        <Separator className="mt-2" />
        <div className="px-3 flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <Clock className="h-4 w-4 text-yellow-500 " />
            <span className="text-xs font-bold">Limited Life</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="life" className="text-xs">
                <div className="flex items-center justify-between gap-3">
                  <span>Life : </span>
                  <Input
                    className="text-xs h-8 w-min"
                    type="number"
                    min={0}
                    max={1000}
                    value={life}
                    onChange={(e) => {
                      if (Number(e.target.value) > 1000)
                        handleLifeChange(Number(10));
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
                max={1000}
                step={10}
                onValueChange={(values: number[]) => {
                  handleLifeChange(values[0]);
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  } else return null;
};

export default LimitedLifeOptions;
