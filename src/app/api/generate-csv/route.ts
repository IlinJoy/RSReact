import { ERROR_MESSAGES } from '@/constants/messages';
import { generateCsvFromObjectArray, isObjectArray } from '@/utils/generateCsvFromObjectArray';
import { normalizeError } from '@/utils/normalizeError';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!isObjectArray(data)) {
      throw new Error(ERROR_MESSAGES.INVALID_DATA);
    }

    const csv = generateCsvFromObjectArray(data);

    return new Response(csv, { status: 200, headers: { 'Content-Type': 'text/csv' } });
  } catch (error) {
    const message = normalizeError(error).message;
    return new Response(message, { status: 500 });
  }
}
