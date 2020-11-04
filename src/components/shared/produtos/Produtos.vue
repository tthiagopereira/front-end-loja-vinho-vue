<template>
  <div>
    <h1>Lista de Produtos</h1>
    <div class="produto" v-for="(produto, id) in produtos" :key="produto.id">
      codigo do produto: {{produto.id}}
      <br>
      <img :src="'http://localhost:8000/'+produto.imagem" :alt="produto.nome">
      <div class="produto-info">
        <h4>{{  produto.nome }}</h4>
        <p>Tipo: {{ produto.tipo }}</p>
      </div>
      <div class="produto-preco">
        <span class="preco">R${{ produto.preco }} </span>
        <router-link :to="`show/product/${produto.id}`" class="link-comprar">Comprar</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      id: null,
      produtos: [],
      carrinho: [],
      errors: []
    }
  },

  created() {
    this.$http.get('http://localhost:8000/api/produto')
      .then(resp => {
        this.produtos = resp.data
      })
  },
  methods: {
    detalhe(id){
      console.log(id)
    }
  }
}
</script>

<style>
h1  {
  margin: 10px;
  padding: 10px;
}
.link-comprar {
  text-decoration: none;
  font-size: 1.3em;
  padding: 5px;
  background-color: darkmagenta;
  color: whitesmoke;
  border-radius: 40px;
}

.produto-preco a:hover {
  background-color: #777777;
  color: whitesmoke;
  border-radius: 40px;
}

.produto {
  display: inline-block;
  vertical-align: top;
  font-family: Verdana, sans-serif;
  border: solid 1px #ccc;
  box-shadow: 0 4px 20px 0 rgba(0,0,0,0.3);
  width: 260px;
  margin: 5px 20px;
  padding: 5px;
}

.produto img {
  width: 100%;
  max-width: 50%;
}

.produto-info {
  padding: 10px;
  height: 90px;
  overflow: hidden;
}

.produto-info h4 {
  font-size: 1.4rem;
  font-weight: 100;
  margin: 0;
}

.produto-preco {
  float: right;
  padding: 10px;
}

.preco {
  color: green;
  font-weight: bold;
  font-size: 1.4rem;
}



</style>
