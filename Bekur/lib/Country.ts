

export async function getCountries() {
  const headers = new Headers();
  headers.append(
    "X-CSCAPI-KEY",
    process.env.NEXT_PUBLIC_COUNTRY_API_KEY || "fallback-key"
  );

  const requestOptions: RequestInit = {
    method: "GET",
    headers,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://api.countrystatecity.in/v1/countries",
      requestOptions
    );
    if (!response.ok) throw new Error("Failed to fetch countries");
    return await response.json();
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}
