<template>
<div>
<b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">CLINIC</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="http://www.clinic.med.br">Home</b-nav-item>
        <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-checkbox size="sm" class="mr-sm-2" v-model="toXML">XML</b-form-checkbox>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Os Número" v-model="serviceOrder"></b-form-input>
          <b-button @click="onSubmit" size="sm" class="my-2 my-sm-0">Buscar OS</b-button>
        </b-nav-form>

        <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown> -->

        <!-- <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown> -->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <div>
    <pre lang="xml">{{ dispatchedOrders | pretty }}</pre>
  </div>  
</div>
</template>

<script>
  export default {
    data() {
      return {
        serviceOrder: 13364,
        dispatchedOrders: null,
        toXML: true
      }
    },
    methods: {
      onSubmit() {
        const config = {
          params: {
            serviceOrder: this.serviceOrder,
            toXML: this.toXML
          }
        }

        this.$http.get('/exams-requested/get', config)
            .then((result) => {
                this.dispatchedOrders = result.data
            })
            .catch(error => console.log(error))
      }
    }
  }
</script>