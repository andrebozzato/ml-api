export async function buscarAnuncio(mlb) {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/MLB${mlb}`)

    const data = await response.json()

    if (response.status !== 200) throw new Error('Anuncio não encontrado')

    const mapVarName = (variation) => variation.map((v) => v.name)

    function groupBy(array, key) {
      return array.reduce(
        (acc, item) => ({
          ...acc,
          [item[key]]: [...(acc[item[key]] ?? []), item],
        }),
        {}
      )
    }

    const produto = {
      id: data.id,
      nome: data.title,
      variacoes: data.variations.map((item) => ({
        id: item.id,
        nome: item.attribute_combinations.map((i) => i.name).join('/'),
        valor: item.attribute_combinations.map((i) => i.value_name).join('/'),
      })),
    }

    return produto
  } catch (err) {
    throw new Error(err.message)
  }
}
