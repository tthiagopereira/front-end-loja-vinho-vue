<template>
  <div>
    <div class="container" v-show="!mostrar">
      <div class="row">
        <div class="col-75">
          <div class="container">
            <h1>Resumo do pedido </h1>
            <h1 class="btn">COMPRA FINALIZADA COM SUCESSO </h1>
            <p>Nome: {{checkout.nome_cliente}}</p>
            <p>Email: {{checkout.email}}</p>
            <p>Distancia: {{checkout.distancia}}</p>
            <p>Distancia: {{checkout.numero_pedido}}</p>
            <br>
            <div class="col-25">
              <div class="container">
                <h4>Carrinho <span class="price" style="color:black"><i class="fa fa-shopping-cart"></i> <b>{{carrinhoQuantidade}}</b></span></h4>
                <table id="customers">
                  <tr>
                    <th>Produto</th>
                    <th>Qtd</th>
                    <th>Preço</th>
                    <th>Total</th>
                    <th>Numero do pedido</th>
                  </tr>
                  <tr v-for="carrinho in produtoCarrinho ">
                    <td>{{ carrinho.nome }}</td>
                    <td>{{ carrinho.quantidade }}</td>
                    <td>{{ carrinho.preco }}</td>
                    <td>{{ carrinho.preco * carrinho.quantidade }}</td>
                    <td>{{ carrinho.numero_pedido }}</td>
                  </tr>
                </table>

                <hr>
                <p>Total de produtos<span class="price" style="color:black"><b>R$ {{valorTotal()}}</b></span></p>
                <p>Peso <span class="price" style="color:black"><b> {{valorPeso()}} Kilos</b></span></p>
                <p>Frete do peso <span class="price" style="color:black"><b>R$ {{valorPeso() * 5}}</b></span></p>
                <p>Frete do distancia <span class="price" style="color:black"><b>R$ {{calculoDistancia()}}</b></span></p>
                <p class="btn">Total <span class="price" style="color:#f2f2f2"><b>R$ {{valorTotal() +calculoDistancia() + (valorPeso() * 5)}}</b></span></p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="container" v-show="mostrar">
      <div class="row">
        <div class="col-75">
          <div class="container">
            <form @submit.prevent="storeCheckout()">
              <div class="row">
                <div class="col-50">
                  <h3>Checkout</h3>
                  <label for="fname"><i class="fa fa-user"></i> Nome completo</label>
                  <input type="text" id="fname" name="firstname" placeholder="John M. Doe" v-model="checkout.nome_cliente">
                  <label for="email"><i class="fa fa-envelope"></i> Email</label>
                  <input type="text" id="email" name="email" placeholder="john@example.com" v-model="checkout.email">
                  <label><i class="fa fa-institution"></i> Informe a distancia para entrega</label>
                  <input type="text" placeholder="ex. 250km" v-model="checkout.distancia">
                </div>
              </div>

              <input type="submit" value="Finalizar compra"  class="btn">
            </form>
          </div>
        </div>

        <div class="col-25">
          <div class="container">
            <h4>Carrinho <span class="price" style="color:black"><i class="fa fa-shopping-cart"></i> <b>{{carrinhoQuantidade}}</b></span></h4>
            <table class="customers">
              <tr>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Preço</th>
                <th>Total</th>
                <th>Numero do pedido</th>
              </tr>
              <tr v-for="carrinho in produtoCarrinho ">
                <td>{{ carrinho.nome }}</td>
                <td>{{ carrinho.quantidade }}</td>
                <td>{{ carrinho.preco }}</td>
                <td>{{ carrinho.preco * carrinho.quantidade }}</td>
                <td>{{ carrinho.numero_pedido }}</td>
              </tr>
            </table>

            <hr>
            <p>Total de produtos<span class="price" style="color:black"><b>R$ {{valorTotal()}}</b></span></p>
            <p>Peso <span class="price" style="color:black"><b> {{valorPeso()}} Kilos</b></span></p>
            <p>Frete do peso <span class="price" style="color:black"><b>R$ {{valorPeso() * 5}}</b></span></p>
            <p>Frete do distancia <span class="price" style="color:black"><b>R$ {{calculoDistancia()}}</b></span></p>
            <p class="btn">Total <span class="price" style="color:#f2f2f2"><b>R$ {{valorTotal() + calculoDistancia() + (valorPeso() * 5)}}</b></span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Resume from "../shared/resumo/Resume";

export default {
  components: {Resume},
  data() {
    return {
      carrinhoQuantidade: '',
      produtoCarrinho: [],
      totalCarrinhoPreco: '',
      checkout: {
        nome_cliente: '',
        email: '',
        distancia: '',
        numero_pedido: 1
      },
      mostrar: true
    }
  },

  created() {
    this.$http.get('lista/carrinho')
      .then(resp => {
        this.carrinhoQuantidade = resp.data
      }),
      this.$http.get('lista/produtos')
        .then(resp => {
          this.produtoCarrinho = resp.data
        })
  },

  methods: {

    valorTotal() {
      var soma = 0;
      this.produtoCarrinho.forEach(function (item, index) {
        soma+= (item.preco * item.quantidade)
      })
      return soma;
    },

    valorPeso() {
      var peso = 0;
      this.produtoCarrinho.forEach(function (item, index) {
        peso+= item.peso;
      })
      return peso;
    },

    calculoDistancia() {
      if(this.checkout.distancia > 100) {
        return (this.valorPeso() * this.checkout.distancia) /100
      }else{
        return 0;
      }
    },

    storeCheckout() {
      this.$http.post('fecha', this.checkout)
        .then(resp => {
          this.mostrar = false
        })
    }
  }
}
</script>

<style>

* {
  box-sizing: border-box;
}

.texto-cortado {
  text-decoration: line-through;
}
.row {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
  margin: 0 -16px;
}

.col-25 {
  -ms-flex: 25%; /* IE10 */
  flex: 25%;
}

.col-50 {
  -ms-flex: 50%; /* IE10 */
  flex: 50%;
}

.col-75 {
  -ms-flex: 75%; /* IE10 */
  flex: 75%;
}

.col-25,
.col-50,
.col-75 {
  padding: 0 16px;
}

.container {
  background-color: #f2f2f2;
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgrey;
  border-radius: 3px;
}

input[type=text] {
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

label {
  margin-bottom: 10px;
  display: block;
}

.icon-container {
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 24px;
}

.btn {
  background-color: #4CAF50;
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
}

.btn:hover {
  background-color: #45a049;
}

a {
  color: #2196F3;
}

hr {
  border: 1px solid lightgrey;
}

span.price {
  float: right;
  color: grey;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (also change the direction - make the "cart" column go on top) */
@media (max-width: 800px) {
  .row {
    flex-direction: column-reverse;
  }
  .col-25 {
    margin-bottom: 20px;
  }
}
table, th, td {
  border: 1px solid black;
  width: 100%;
}

</style>
