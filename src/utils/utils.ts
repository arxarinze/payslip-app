import axios from "axios";

export async function convertImageToBase64(url: string) {
  try {
    // Make a GET request to the specified URL with arraybuffer response type
    const response = await axios.get(url, { responseType: "arraybuffer" });

    // Create a Blob from the arraybuffer with the appropriate content type
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });

    // Use FileReader to read the Blob as a data URL (base64)
    const base64String = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });

    // Return the base64 string
    return base64String;
  } catch (error) {
    // Log and rethrow any errors that occurred during the conversion
    console.error("Error converting image to base64:", error);
    throw error;
  }
}
