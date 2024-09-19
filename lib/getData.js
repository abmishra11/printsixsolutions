export async function getData(endpoint) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    console.log(`Fetching data from: ${baseUrl}/api/${endpoint}`);
    const response = await fetch(`${baseUrl}/api/${endpoint}`);
    console.log("response", response);
    
    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Data received:', data);
    return data;
  } catch (error) {
    console.error("Error in getData function:", error);
    throw error;
  }
}
