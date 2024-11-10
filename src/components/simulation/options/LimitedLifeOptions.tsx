import { lifeAtom, lifeRefAtom } from "@/components/simulation/simulationState";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useAtom } from "jotai";

const LimitedLifeOptions = () => {
  const [lifeRef] = useAtom(lifeRefAtom);

  const [life, setLife] = useAtom(lifeAtom);

  const handleLifeChange = (value: number) => {
    setLife(value);
    lifeRef.current = value;
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
    </>
  );
};

export default LimitedLifeOptions;
