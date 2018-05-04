<template>
  	<div>
		<div domIndex="0" class="time" :class="{domOn:domIndex==0}"><span>猜胜负</span></div>
		<div>
			<game :configData="configData"></game>
		<!-- 	<champion></champion>
			<score></score> -->
		</div>
		
  	</div>
</template>

<script>
import Vue from 'vue';
import game from './com/game';
import champion from './com/champion';
import score from './com/score';

export default {
  name: 'index',
  data () {
    return {
		configData:configData,
		domIndex:0,          //页面元素索引
    }
  },
  components:{game,champion,score},
  computed:{

  },
  methods: {
		move(){
			let me  = this;
			document.onkeydown=function(e){
	  			e=window.event||e;
			  	switch(e.keyCode){
				  	case 13:
				  		me.enterPlay();
				  		break;
				    case 37: //左键
				      	me.setX("left");
				     	break;
				    case 38: //向上键
				    	me.setDomY("up")
				      break;
				    case 39: //右键
			      		me.setX("right");
				      	break;
				    case 40: //向下键
				    	me.setDomY("down")
				      	break;
				    default:
				      	break;
			  	}
			}
		},


  },
  mounted(){
	 this.move();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
	.g-flexbox{
		display:-moz-flex; /* Firefox */
		display:-webkit-flex; /* Safari and Chrome */
		display:-ms-flexbox; /* Internet Explorer 10 */
		display:flex;
	}
	.g-flex{
		-moz-flex:1.0; /* Firefox */
		-webkit-flex:1.0; /* Safari and Chrome */
		-ms-flex:1.0; /* Internet Explorer 10 */
		flex:1.0;
	}
	.domOn{
		border: 1px solid red;
	}
	.time{
		width: 400px;
		margin: 0 auto;	
	}
	.player{
		//height: 200px;
		overflow-y:auto;
	}
	.wrapbox{
		width: 400px;
		height: 30px;
		margin: 20px auto;
		line-height: 30px;
		padding: 40px;
	}
	.wrapbox.current{
		border: 1px solid blue;
	}
	.box{
		margin: 0 10px;
		border: 1px solid blue;
		text-align: center;
		font-size: 14px;
		span{
			color: red;
		}
	}
	.box_2{
		border: none;
	}
	.box_2  span{
		display:inline-block;
		width: 50px;
	}
	.box_2  span.on2{
		background: red;
		color: #fff;
	}
	.box_2  span.on{
		background: red;
		color: #fff;
	}
</style>
