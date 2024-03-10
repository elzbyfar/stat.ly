export default function getUrlWithParams(endpoint: string, params: { [key: string]: string | string[] | undefined }) {
  const BASE_URL = "http://127.0.0.1:5000/api";

  let url = BASE_URL + endpoint;
  if (!Object.keys(params).length) return url;

  url += "?";

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    const snakeCaseKey = key.replace(/([A-Z])/g, (g) => `_${g[0].toLowerCase()}`);
    if (Array.isArray(value)) {
      url += snakeCaseKey + "=" + value.join(",") + "&"
      continue;
    }
    url += snakeCaseKey + "=" + value + "&"
  }

  return url.substring(0, url.length - 1);
}
