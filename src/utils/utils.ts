import axios from "axios";

export async function convertImageToBase64(url: string) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const base64String = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

    return base64String;
  } catch (error) {
    console.error("Error converting image to base64:", error);
    throw error;
  }
}
