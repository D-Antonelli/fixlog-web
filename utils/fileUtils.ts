// Utility functions to handle file-related logic
export const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

export const validFileType = (file: File) => fileTypes.includes(file.type);

export const returnFileSize = (number: number) => {
  if (number < 1000) return `${number} bytes`;
  if (number >= 1000 && number < 1000000) return `${(number / 1000).toFixed(1)} KB`;
  return `${(number / 1000000).toFixed(1)} MB`;
}