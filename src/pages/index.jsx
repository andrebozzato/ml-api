import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const li = 'border border-gray-300 px-2 py-1 text-sm'

export default function Home() {
  const [mlb, setMlb] = useState('')
  const [produto, setProduto] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    try {
      e.preventDefault()
      const response = await fetch(`/api/${mlb}`) // 2986493277
      const data = await response.json()
      if (response.status !== 200) throw new Error(data)
      setError('')
      setProduto(data)
      setMlb('')
    } catch (err) {
      setProduto('')
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-200 pt-16">
      <main
        className={`
          max-w-2xl my-0 mx-auto bg-white rounded-md shadow-md p-4
          flex flex-col gap-4 items-center
        `}
      >
        <h1 className="text-xl font-medium text-center">
          Busca ID de Variações de Anuncio no MercadoLivre
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-4 justify-center">
          <input
            type="text"
            placeholder="MLB1234567890"
            value={mlb}
            onChange={(e) => setMlb(e.target.value)}
            required
            className={`
              w-44 border border-gray-300 px-2 py-1 rounded 
              focus:outline-blue-500 focus:border-blue-500
            `}
          />

          <button
            type="submit"
            className={`
              bg-blue-500 text-white font-medium px-4 py-1 border-0
              rounded transition-all hover:bg-blue-600
            `}
          >
            Buscar
          </button>
        </form>

        {error && (
          <p className="text-red-600 font-medium">
            <span className="text-xl">⚠️</span>
            {error}
          </p>
        )}

        {produto && (
          <>
            <Image
              src={produto.img}
              alt="imagem produto"
              width={100}
              height={100}
            />
            <ul
              className={`
              w-full grid grid-cols-3 rounded border border-gray-300
            `}
            >
              <li className={`${li}`}>{produto.id}</li>
              <li className={`${li} col-span-2`}>
                <Link href={produto.url} className="text-blue-700">
                  {produto.nome}
                </Link>
              </li>
              {produto?.variacoes.map((item) => (
                <>
                  <li className={`${li}`} key={item.id}>
                    {item.id}
                  </li>
                  <li key={item.nome} className={`${li}`}>
                    {item.nome}
                  </li>
                  <li key={item.valor} className={`${li}`}>
                    {item.valor}
                  </li>
                </>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  )
}
