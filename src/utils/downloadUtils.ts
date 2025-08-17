export async function postRequest<T>(url: string, body: T) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function handleDownload(url: string, fileName: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
}
