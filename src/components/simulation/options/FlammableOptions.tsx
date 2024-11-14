import {
  chanceToCatchAtom,
  chanceToCatchRefAtom,
  chanceToMeltAtom,
  chanceToMeltRefAtom,
  lifeAtom,
  lifeRefAtom,
  smokeColorAtom,
  smokeColorRefAtom,
} from "@/components/simulation/simulationState";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useAtom } from "jotai";
import { Color } from "three";

const FlammableOptions = () => {
  const [chanceToCatchRef] = useAtom(chanceToCatchRefAtom);
  const [chanceToCatch, setChanceToCatch] = useAtom(chanceToCatchAtom);
  const [chanceToMeltRef] = useAtom(chanceToMeltRefAtom);
  const [chanceToMelt, setChanceToMelt] = useAtom(chanceToMeltAtom);
  const [smokeColor, setSmokeColor] = useAtom(smokeColorAtom);
  const [smokeColorRef] = useAtom(smokeColorRefAtom);
  const [lifeRef] = useAtom(lifeRefAtom);
  const [life, setLife] = useAtom(lifeAtom);

  const handleLifeChange = (value: number) => {
    setLife(value);
    lifeRef.current = value;
  };

  const handleChanceToCatchChange = (value: number) => {
    setChanceToCatch(value);
    chanceToCatchRef.current = value;
  };
  const handleChanceToMeltChange = (value: number) => {
    setChanceToMelt(value);
    chanceToMeltRef.current = value;
  };

  const handleSmokeColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const newColor = new Color(value);
    setSmokeColor(newColor);
    smokeColorRef.current = newColor;
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="life" className="text-xs">
            <div className="flex items-center justify-between gap-3">
              <span className="text-zinc-400">Life : </span>
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
          <Label htmlFor="life" className="text-xs">
            <div className="flex items-center justify-between gap-3">
              <span className="text-zinc-400">Chance to catch : </span>
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
        <div className="flex flex-col gap-2">
          <Label htmlFor="life" className="text-xs">
            <div className="flex items-center justify-between gap-3">
              <span className="text-zinc-400">Chance to melt : </span>
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
        <div className="flex flex-col gap-2">
          <Label htmlFor="colorPicker" className="text-xs text-zinc-400">
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
    </>
  );
};

export default FlammableOptions;
