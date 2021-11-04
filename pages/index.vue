<template>
  <a-row type="flex" justify="center">
    <a-col span="8">
      <Search />
    </a-col>
    <a-col span="12">
      <Result />
    </a-col>
  </a-row>
</template>

<script>
import Search from '@/components/Search'
import Result from '@/components/Result'
export default {
  components: {
    Search,
    Result,
  },
}
</script>
