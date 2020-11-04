<template>
  <div class="container">
    <div>
      <h1 class="centro">Cadastro de Produto</h1>
    </div>
    <form @submit.prevent="store()" enctype="multipart/form-data">

<!--      <div>-->
<!--        <label for="imagem">Imagem</label>-->
<!--      </div>-->
<!--      <div>-->
<!--        <input type="file" id="imagem" name="imagem">-->
<!--      </div>-->

      <div>
        <label for="nome">Nome do produto</label>
      </div>
      <div>
        <input type="text" id="nome" name="nome" placeholder="Informe o nome" required v-model="product.nome">
      </div>
      <div >
        <label for="tipo">Tipo</label>
      </div>
      <div>
        <select id="tipo" name="tipo" required v-model="product.tipo">
          <option value="">Escolha uma opção</option>
          <option value="BRANCOS">BRANCOS</option>
          <option value="ROSES">ROSÉS</option>
          <option value="TINTOS">TINTOS</option>
          <option value="ESPUMANTE">ESPUMANTE</option>
          <option value="SOBREMESA">SOBREMESA</option>
        </select>
      </div>

      <div>
        <label for="peso">Informe o peso</label>
      </div>
      <div>
        <input type="text" id="peso" name="peso" placeholder="Peso" required v-model="product.peso">
      </div>

      <div>
        <label for="preco">R$ Preço</label>
      </div>
      <div>
        <input type="text" id="preco" name="preco" placeholder="Digite o preço" required v-model="product.preco">
      </div>
      <div class="centro">
        <input type="submit" value="Salvar" >
      </div>
    </form>
  </div>
</template>

<script>

import Product from "../../domain/Product";

export default {
  components: {

  },
  data() {
    return {
      product: new Product(),
      selectedFile: null
    }
  },
  methods: {
    store() {
      this.$http.post('http://localhost:8000/api/produto', this.product)
      .then( () => {
        this.product = new Product(), err => console.log(err)
        this.$router.push('/')
      })

    }
  }
}

</script>

<style>

* {
  box-sizing: border-box;
}

label {
  font-size: 20px;

}

.container {
  padding: 50px;
  margin: 100px;
}

.centro {
  text-align: center;
}

input[type=text],
input[type=email],
input[type=file],
input[type=number],
select{
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}


input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: center;
  margin: 10px;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
}

</style>

