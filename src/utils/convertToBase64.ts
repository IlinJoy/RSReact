export function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      resolve(typeof result === 'string' ? result : '');
    };

    reader.onerror = () => reject('');

    reader.readAsDataURL(file);
  });
}
