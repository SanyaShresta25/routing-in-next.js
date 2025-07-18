// Server-only function to delete session/cookie
import { cookies } from 'next/headers';

export async function deleteSession() {
  const cookieStore = cookies();
  (await cookieStore).delete('token');
}
