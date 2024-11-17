import Spinner from "@/components/spinners/Spinner";

export async function getData(endpoint) {
  try {
    <Spinner />;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    console.log(`Fetching data from: ${baseUrl}/api/${endpoint}`);
    const response = await fetch(`${baseUrl}/api/${endpoint}`);
    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getData function:", error);
    throw error;
  }
}
