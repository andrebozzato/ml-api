export async function buscarAnuncio(mlb) {
  try {
    const idMlb = mlb.replace(/\D/g, '')
    const response = await fetch(
      `https://api.mercadolibre.com/items/MLB${idMlb}`
    )

    const data = await response.json()

    if (response.status !== 200) throw new Error('Anuncio não encontrado')

    const produto = {
      id: data.id,
      nome: data.title,
      variacoes: data.variations
        .map((item) => ({
          id: item.id,
          nome: item.attribute_combinations.map((i) => i.name).join('/'),
          valor: item.attribute_combinations.map((i) => i.value_name).join('/'),
        }))
        .sort((x, y) => {
          let a = x.valor.toUpperCase(),
            b = y.valor.toUpperCase()
          return a == b ? 0 : a > b ? 1 : -1
        }),
    }

    return produto
  } catch (err) {
    throw new Error(err.message)
  }
}
