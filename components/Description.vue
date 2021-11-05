<template>
  <div>
    <transition name="page" mode="in-out">
      <div v-if="activity !== null">
        <a-descriptions title="Información de la actividad">
          <a-descriptions-item label="Nombre" span="3">
            {{ activity.title }}
          </a-descriptions-item>
          <a-descriptions-item label="Inicio">
            {{ activity.startAvailableDate }}
          </a-descriptions-item>
          <a-descriptions-item label="Final">
            {{ activity.endAvailableDate }}
          </a-descriptions-item>
          <a-descriptions-item label="Precio">
            {{ activity.price }}
          </a-descriptions-item>
          <a-descriptions-item label="Descripción" span="3">
            {{ activity.description }}
          </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="Información de la compra">
          <a-descriptions-item label="Personas">
            {{ quantity }}
          </a-descriptions-item>
          <a-descriptions-item label="Fecha"> {{ date }} </a-descriptions-item>
          <a-descriptions-item label="Precio total">
            {{ activity.price * quantity }}
          </a-descriptions-item>
        </a-descriptions>
        <div class="container-btn">
          <a-space align="center">
            <a-button type="primary" @click="handleSell()"> Comprar </a-button>
          </a-space>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { showNotification, mapCatch } from '@/assets/core/errors'
export default {
  computed: {
    activity() {
      return this.$store.state.activity.activity
    },
    date() {
      return this.$store.state.activity.date
    },
    quantity() {
      return this.$store.state.activity.quantity
    },
  },
  methods: {
    ...mapActions('activity', ['onSell', 'toggleSpinning', 'toggleModal']),
    handleSell() {
      const self = this
      self
        .onSell({
          payload: {
            date: this.date,
            quantity: this.quantity,
            activityId: this.activity.id,
          },
          self,
        })
        .then((response) => {
          showNotification({
            self,
            type: 'success',
            menssage: 'Actividad reservada',
            title: 'Success!',
          })
          self.toggleModal({ show: false, activity: null })
          self.toggleSpinning(false)
        })
        .catch((err2) => {
          mapCatch(err2, self)
          self.toggleSpinning(false)
        })
    },
  },
}
</script>