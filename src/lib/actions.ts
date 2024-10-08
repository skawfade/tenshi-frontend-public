// export const getDataKodikApi = async () => {
//   const url = `https://kodikapi.com/list?token=${import.meta.env.VITE_KODIK_TOKEN}&with_material_data=true&limit=15&types=anime,anime-serial&has_field=shikimori_id`
//   const response = await fetch(url)
//   const res = await response.json()
//   console.log(res)
//   return res.results
// }

export async function getKodikPlayer({ shikimoriId }: { shikimoriId: string }) {
  const url = `https://kodikapi.com/search?token=${import.meta.env.VITE_KODIK_TOKEN}&shikimori_id=${shikimoriId}&limit=1&with_episodes=true`
  const response = await fetch(url)
  const res = await response.json()
  return res.results[0]
}
