export async function searchScholarships(params: {
  country: string;
  level: string;
  field: string;
}) {
  const query = `${params.country} ${params.level} ${params.field} scholarship official site`;

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

  return data.organic.map((item: any) => ({
    title: item.title,
    url: item.link,
  }));
}
