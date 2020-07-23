<template>
  <div>6666</div>
</template>
<script>
import Ajax from "@utils/request.js"

export default {
  data () {
    return {

    }
  },
  methods: {

  },
  mounted() {
    Ajax({
      url: '../../static/mock/period-12.json',
    }).then(data => {
      console.log(data)
    })
  }
}
</script>