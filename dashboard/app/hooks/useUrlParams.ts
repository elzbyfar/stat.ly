export function useUrlParams(endpoint: string, params: { [key: string]: string | string[] }) {
  const BASE_URL = "http://127.0.0.1:5000/api";

  let url = BASE_URL + endpoint;
  if (!Object.keys(params).length) return url;

  url += "?";

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      url += key + "=" + value.join(",") + "&"
      continue;
    }
    url += key + "=" + value + "&"
  }

  return url.substring(0, url.length - 1);
}
