<template>
  <div>
    <leheader class="le_header"></leheader>
    <div class="le_main">
      <router-view ></router-view>
    </div>
    <lefooter class="le_footer"></lefooter>
  </div>
</template>
<script>
import leheader from "./header.vue"
import lefooter from "./footer.vue"
export default {
  data() {
    return {

    }
  },
  components: {
    leheader,
    lefooter
    
  }
}
</script>
<style type="text/css">
.le_header,.le_footer{
  background: #c00;
  color: #fff;
  text-align: center;
  position: fixed;
  left: 0;
  
  width: 100%;
  height: 30px;

}
.le_footer{
  bottom: 0
}
.le_main{
  padding: 40px;
}
</style>

