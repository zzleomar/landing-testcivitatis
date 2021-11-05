<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col span="8">
        <Search />
      </a-col>
      <a-col span="12">
        <Result />
      </a-col>
    </a-row>
    <a-modal v-model="visible" :title="null" :footer="null">
      <Description />
    </a-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Search from '@/components/Search'
import Result from '@/components/Result'
import Description from '@/components/Description'
export default {
  components: {
    Search,
    Result,
    Description,
  },
  computed: {
    visible: {
      set(value, oldvalue) {
        this.toggleModal({ show: false, activity: null })
      },
      get() {
        return this.$store.state.activity.show
      },
    },
  },
  methods: {
    ...mapActions('activity', ['toggleModal']),
  },
}
</script>
