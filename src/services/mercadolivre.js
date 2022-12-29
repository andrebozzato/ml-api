export async function buscarAnuncio(mlb) {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/MLB${mlb}`)

    const data = await response.json()

    if (response.status !== 200) throw new Error('Anuncio não encontrado')

    const produto = {
      id: data.id,
      nome: data.title,

      variacoes: data.variations.map((item) => ({
        id: item.id,
        nome: `${item.attribute_combinations[0].name} ${item.attribute_combinations[0].value_name}`,
      })),
    }

    return produto
  } catch (err) {
    throw new Error(err.message)
  }
}
