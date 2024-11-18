import {
  chanceToCatchAtom,
  chanceToCatchRefAtom,
  chanceToMeltAtom,
  chanceToMeltRefAtom,
  selectedMaterialAtom,
} from "@/components/simulation/simulationState";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useAtom } from "jotai";

const CombustibleOptions = () => {
  const [selectedMaterial] = useAtom(selectedMaterialAtom);
  const [chanceToCatchRef] = useAtom(chanceToCatchRefAtom);
  const [chanceToCatch, setChanceToCatch] = useAtom(chanceToCatchAtom);
  const [chanceToMeltRef] = useAtom(chanceToMeltRefAtom);
  const [chanceToMelt, setChanceToMelt] = useAtom(chanceToMeltAtom);

  const handleChanceToCatchChange = (value: number) => {
    setChanceToCatch(value);
    chanceToCatchRef.current = value;
  };
  const handleChanceToMeltChange = (value: number) => {
    setChanceToMelt(value);
    chanceToMeltRef.current = value;
  };

  if (["Wood", "Oil", "Gas"].includes(selectedMaterial)) {
    return (
      <>
        <div className="px-3 flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="life" className="text-xs">
                <div className="flex items-center justify-between gap-3">
                  <span>Chance to catch : </span>
                  <Input
                    className="text-xs h-8 w-min"
                    type="number"
                    min={0}
                    max={1}
                    value={chanceToCatch}
                    onChange={(e) => {
                      if (Number(e.target.value) > 1)
                        handleChanceToCatchChange(Number(1));
                      else if (Number(e.target.value) < 0) {
                        handleChanceToCatchChange(Number(0));
                      } else {
                        handleChanceToCatchChange(Number(e.target.value));
                      }
                    }}
                    step={0.005}
                  />
                </div>
              </Label>
              <Slider
                id="life"
                className="py-1"
                value={[chanceToCatch]}
                min={0}
                max={1}
                step={0.005}
                onValueChange={(values: number[]) => {
                  handleChanceToCatchChange(values[0]);
                }}
              />
            </div>
            {["Wood"].includes(selectedMaterial) && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="life" className="text-xs">
                  <div className="flex items-center justify-between gap-3">
                    <span>Chance to melt : </span>
                    <Input
                      className="text-xs h-8 w-min"
                      type="number"
                      min={0}
                      max={1}
                      value={chanceToMelt}
                      onChange={(e) => {
                        if (Number(e.target.value) > 1)
                          handleChanceToMeltChange(Number(1));
                        else if (Number(e.target.value) < 0) {
                          handleChanceToMeltChange(Number(0));
                        } else {
                          handleChanceToMeltChange(Number(e.target.value));
                        }
                      }}
                      step={0.005}
                    />
                  </div>
                </Label>
                <Slider
                  id="life"
                  className="py-1"
                  value={[chanceToMelt]}
                  min={0}
                  max={1}
                  step={0.005}
                  onValueChange={(values: number[]) => {
                    handleChanceToMeltChange(values[0]);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </>
    );
  } else return null;
};

export default CombustibleOptions;
