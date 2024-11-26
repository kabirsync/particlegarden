import { Grid } from "@/components/simulation/Grid";
import { clsx, type ClassValue } from "clsx";
import { MutableRefObject } from "react";
import { twMerge } from "tailwind-merge";
import pako from "pako";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const throttle = (func: (...args: any[]) => void, limit: number) => {
  let inThrottle: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const getLocalStorageSize = () => {
  let total = 0;
  for (const key in localStorage) {
    if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
      total += key.length + localStorage[key].length;
    }
  }
  console.log(`LocalStorage Size: ${(total / 1024).toFixed(2)} KB`);
};

export const uint8ArrayToBase64 = (uint8Array: Uint8Array) => {
  const chunkSize = 8192;
  let base64 = "";
  for (let i = 0; i < uint8Array.length; i += chunkSize) {
    base64 += String.fromCharCode(...uint8Array.subarray(i, i + chunkSize));
  }
  return btoa(base64);
};

export const base64ToUint8Array = (base64: string) => {
  const binaryString = atob(base64);
  const length = binaryString.length;
  const uint8Array = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }
  return uint8Array;
};

export const formatCurrentDate = (): string => {
  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const handleSaveToLocalStorage = ({
  gridRef,
  onSucces,
}: {
  gridRef: MutableRefObject<Grid | null>;
  onSucces: () => void;
}) => {
  try {
    const jsonString = JSON.stringify(gridRef.current);

    const compressedData = pako.deflate(jsonString);
    const compressedBase64 = uint8ArrayToBase64(compressedData);

    localStorage.setItem("gridData", compressedBase64);
    // toast("Canvas has been saved", {
    //   description: formatCurrentDate(),
    // });
    onSucces();
    console.log("Data successfully compressed and saved!");

    // Todo: this is only for debuggins, remove
    getLocalStorageSize();
  } catch (error) {
    console.error("Error compressing and saving data:", error);
  }
};

export const handleLoadFromLocalStorage = ({
  gridRef,
  onSucces,
}: {
  gridRef: MutableRefObject<Grid | null>;
  onSucces: () => void;
}) => {
  getLocalStorageSize();

  try {
    const compressedBase64 = localStorage.getItem("gridData");

    if (compressedBase64) {
      const compressedData = base64ToUint8Array(compressedBase64);
      const decompressedData = pako.inflate(compressedData, { to: "string" });
      const gridData: Grid = JSON.parse(decompressedData);
      gridRef.current = Grid.fromJSON(gridData);
      // toast("Canvas loaded successfully", {
      //   description: formatCurrentDate(),
      //   // action: {
      //   //   label: "Undo",
      //   //   onClick: () => console.log("Undo"),
      //   // },
      // });
      onSucces();
    } else {
      console.log("No data found in localStorage.");
    }
  } catch (error) {
    console.error("Error decompressing and loading data:", error);
  }
};
