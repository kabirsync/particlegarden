// @ts-expect-error - pako is imported from CDN and added to global scope
importScripts("https://cdn.jsdelivr.net/npm/pako@2.1.0/dist/pako.min.js");

// Helper functions needed by the worker
const uint8ArrayToBase64 = (uint8Array: Uint8Array) => {
  const chunkSize = 8192;
  let base64 = "";
  for (let i = 0; i < uint8Array.length; i += chunkSize) {
    base64 += String.fromCharCode(...uint8Array.subarray(i, i + chunkSize));
  }
  return btoa(base64);
};

self.onmessage = (e: MessageEvent) => {
  try {
    const { jsonString, key } = e.data;

    // @ts-expect-error - pako is globally available from the CDN
    const compressedData = pako.deflate(jsonString);
    const compressedBase64 = uint8ArrayToBase64(compressedData);

    // Send the compressed data back to the main thread
    self.postMessage({ success: true, key, compressedBase64 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      self.postMessage({ success: false, error: error.message });
    } else {
      self.postMessage({ success: false, error: "An unknown error occurred" });
    }
  }
};
