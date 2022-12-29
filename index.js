const produto = {
  id: '123',
  var: {
    id: '123-1',
    attr: [
      {
        name: 'cor',
        valor: 'branco',
      },
      {
        name: 'voltagem',
        valor: '110v',
      },
      {
        name: 'tamanho',
        valor: 'tam1',
      },
    ],
  },
}

let ac = []
const novoProduto = {
  id: produto.id,
  variacaoId: produto.var.id,
  variacaoNome: produto.var.attr.reduce((a, i) => (ac = [...a, ...i])),
}

console.log(novoProduto)
