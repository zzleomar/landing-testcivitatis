<template>
  <div class="container-list">
    <p>
      Nro. de resultados <strong> {{ data.length }} </strong>
    </p>
    <a-list
      :loading="loading"
      item-layout="horizontal"
      :data-source="data"
      :pagination="pagination"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a slot="actions" @click="handleSell(item.id)">Comprar</a>
        <a slot="actions">Ver más</a>
        <a-list-item-meta :description="`${item.price * quantity} $`">
          <a slot="title">{{ item.title }}</a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { showNotification, mapCatch } from '@/assets/core/errors'
export default {
  data() {
    return {
      loadingMore: false,
      showLoadingMore: true,
      pagination: {
        pageSize: 5,
      },
    }
  },
  computed: {
    loading() {
      return this.$store.state.activity.load
    },
    quantity() {
      return this.$store.state.activity.quantity
    },
    date() {
      return this.$store.state.activity.date
    },
    data() {
      return this.$store.state.activity.activities
    },
  },
  methods: {
    ...mapActions('activity', ['onSell', 'toggleSpinning']),
    handleSell(id) {
      const self = this
      self
        .onSell({
          payload: { date: this.date, quantity: this.quantity, activityId: id },
          self,
        })
        .then((response) => {
          showNotification({
            self,
            type: 'success',
            menssage: 'Actividad reservada',
            title: 'Success!',
          })
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