export async function useFetch(method, url, payload) {
  let status = null
  let data = null
  let error = null

  try {
    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const jsonRes = await res.json()
    status = jsonRes.status
    data = jsonRes.data || null
    error = jsonRes.error || null
  } catch (err) {
    error = err
  }

  return { status, data, error }
}
