import { buscarAnuncio } from '../../services/mercadolivre'

export default async function handler(req, res) {
  try {
    let { mlb } = req.query

    const produto = await buscarAnuncio(mlb)

    res.status(200).json(produto)
  } catch (err) {
    res.status(400).json(err.message)
  }
}

// 2986493277
