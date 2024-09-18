export function generateUrlFriendlyFileName(fileName){
  // Get the file extension
  const extension = fileName.substring(fileName.lastIndexOf('.'));
  // Remove the extension from the file name
  const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
  // Convert the name to lower case, replace spaces and special characters with hyphens, and remove non-alphanumeric characters
  const urlFriendlyName = nameWithoutExtension
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  // Combine the processed name with the extension
  const timestamp = Date.now();
  return `${urlFriendlyName}-${timestamp}${extension}`;
}