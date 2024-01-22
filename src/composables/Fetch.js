import { ref } from "vue";

export async function useFetch(url) {
  const data = ref(null);
  const error = ref(null);

  try {
    const res = await fetch(url);
    const json = await res.json();
    // console.log("json", json);
    data.value = json;
  } catch (err) {
    error.value = err;
  }

  return { data, error };
}
