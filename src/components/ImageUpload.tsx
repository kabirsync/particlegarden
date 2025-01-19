import { imageDataAtom } from "@/components/simulation/simulationState";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAtom } from "jotai";
import { useRef } from "react";
import { toast } from "sonner";

const ImageUpload = () => {
  const [, setImageData] = useAtom(imageDataAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        toast.error("Image size should be less than 10MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImageData(img);
          toast.success("Image uploaded successfully!");
          // Reset the file input after successful upload
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        };
        img.src = (e.target?.result as string) ?? "";
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 text-xs">
      <Label className="text-xs" htmlFor="picture">
        Upload Image
      </Label>
      <Input
        ref={fileInputRef}
        className="text-xs"
        id="picture"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default ImageUpload;
