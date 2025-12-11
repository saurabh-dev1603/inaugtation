export async function FetchApi(input) {
  if (input) {
    const arg = "https://workers.vedicrishi.in/vedicrishi";
    const response = await fetch(arg, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    return await response.json();
  } else {
    return "loading...";
  }
}
