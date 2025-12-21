

export async function searchScholarships(params: {
  country: string;
  level: string;
}) {
  const query = `${params.country} ${params.level} scholarship official site`;

  const res = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: {
      "X-API-KEY": process.env.SERPER_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: query,
      num: 10,
    }),
  });

  const data = await res.json();
 console.log("searchScholarships data", data);
 
  return data.organic.map((item: any) => ({
    title: item.title,
    url: item.link,
    snippet: item.snippet,
    "position": item.position
  }));
}
