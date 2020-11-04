<template>
  <div>
    <form @submit.prevent="store()">
      <div>
        <div>
          <label for="nome">Nome completo</label>
        </div>
        <div>
          <input type="text" id="nome" name="nome" placeholder="Nome completo" v-model="user.nome">
        </div>
      </div>
      <div>
        <div>
          <label for="email">E-mail</label>
        </div>
        <div>
          <input type="email" id="email" name="email" placeholder="E-mail" v-model="user.email">
        </div>
      </div>

      <div class="centro">
        <input type="submit" value="Salvar">
      </div>
    </form>
  </div>
</template>

<script>
import User from "../../domain/User";
export default {
  components: {
  },
  data() {
    return {
      user: new User(),
      mensagem: ''
    }
  },

  methods: {
    store() {
        this.$http.post('http://localhost:8000/api/cliente', this.user)
        .then(() => {
          this.user = new User(), err => console.log(err)
          this.$router.push('/distancia')
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

input[type=text], input[type=email]{
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


</style>
