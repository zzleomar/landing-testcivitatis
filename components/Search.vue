<template>
  <div class="search">
    <a-form :form="form" layout="vertical" @submit="handleSubmit">
      <a-form-item label="Fecha">
        <a-date-picker
          v-decorator="[
            'date',
            {
              rules: [
                {
                  type: 'object',
                  required: true,
                  message: 'Seleccione una fecha',
                },
              ],
              initialValue: $moment(),
            },
          ]"
          format="YYYY-MM-DD"
          :disabled-date="disabledDate"
        />
      </a-form-item>
      <a-form-item label="Número de personas">
        <a-input-number
          v-decorator="[
            'quantity',
            {
              rules: [{ required: true }],
              initialValue: 1,
              message: 'El número de personas es requerido',
            },
          ]"
          :min="1"
          :max="100000"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit"> Buscar </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { showNotification, mapCatch } from '@/assets/core/errors'
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
    }
  },
  methods: {
    ...mapActions('activity', ['loadActivities', 'toggleSpinning']),
    disabledDate(current) {
      return current && current < this.$moment().add(-1, 'day')
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const payload = { ...values, date: values.date.format('YYYY-MM-DD') }
          const self = this
          self
            .loadActivities({ payload, self })
            .then((response) => {
              showNotification({
                self,
                type: 'success',
                menssage:
                  response.length > 0
                    ? 'Actividades cargadas'
                    : 'No se encuentran resultados',
                title: 'Success!',
              })
              self.toggleSpinning(false)
            })
            .catch((err2) => {
              mapCatch(err2, self)
              self.toggleSpinning(false)
            })
        }
      })
    },
  },
}
</script>