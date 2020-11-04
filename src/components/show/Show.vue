<template>
  <div class="container-detalhe">
    <h2>{{produto.nome}} (codigo do produto: {{id}})</h2>
    <div class="polaroid">
      <div class="container-detalhe">
        <p v-show="messagem" class="botao-detalhe"> {{messagem}} </p>
        <div>
          <p>
            Quantidade: <input required type="number"  v-model="carrinho.quantidade" placeholder="Informe a quantidade do produto">
          </p>
        </div>
        <div class="centro">
          <button class="botao-detalhe" @click="store">Adicionar quantidade</button>
        </div>

        <br>
        <router-link class="botao-detalhe" to="/">Volta</router-link>
        <router-link class="botao-detalhe" to="/checkout">Finalizae compra</router-link>
        <br>
        <br>
        <div>
        </div>
      </div>
      <img class="detalhe-imagem" :src="'http://localhost:8000/'+produto.imagem" :alt="produto.nome" style="width: 100%">
      <div class="container-detalhe">
        <ul>
          <li>Tipo: {{produto.tipo}}</li>
          <li>Peso: {{produto.peso}}</li>
          <li>Preço: {{produto.preco}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      id: this.$route.params.id,
      produto: [],
      carrinho: {
        produto_id: this.$route.params.id,
        quantidade: '',
        numero_pedido: 1
      },
      messagem: ''
    }
  },

  created() {
    this.$http.get(`http://localhost:8000/api/produto/${this.id}`)
      .then(resp => {
        this.produto = resp.data
      })
  },

  methods: {
    store() {

      this.$http.post('carrinho', this.carrinho)
      .then(resp => {
        this.carrinho.quantidade = ''
        this.carrinho.numero_pedido = 1
        this.messagem = 'Adicioando com sucesso'
      })
    }
  }
}

</script>

<style>

div.polaroid {
  width: 40%;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 25px;
}

div .container-detalhe {
  display: inline-block;
  padding: 10px 20px;
}
il li {
  text-align: left;
}
input[type=number]{
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
.botao-detalhe {
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  background-color: green;
  color: whitesmoke;
  text-decoration: none;
}
</style>
