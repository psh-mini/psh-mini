export async function fetchRecentPower() {
  const res = await fetch('http://localhost:3001/api/frontend');

  if (!res.ok) {
    const err = await res.text();  // safer than res.json() in error case
    console.error('API error:', err);
    return null;
  }

  const json = await res.json();
  return json; // { status, count, data: [...] }
}