<template>
  	<div>
		<div class="time">
			<span v-bind:class="{'on':setLight(0)}">猜胜负</span>
			<span v-bind:class="{'on':setLight(1)}">猜冠军</span>
			<span v-bind:class="{'on':setLight(2)}">积分榜</span>
		</div>
		<div>
			<game v-show="tabIndex==0" :psection="section"></game>
			<champion v-show="tabIndex==1" :psection="section"></champion>
			<score v-show="tabIndex==2" :psection="section"></score>
		</div>
  	</div>
</template>

<script>
/*登录模块*/
(function(){
	function goLogin(){
		var api = {"action":"com.stv.t2.account","extra":{"type":1,"value":"{\"go_record\":\"true\",\"go_account_center\":\"false\",\"status_code\":\"0\"}","from":"com.stv.ucenter"}};
    	window.LetvFish && window.LetvFish.startIntentWithParms(JSON.stringify(api));
	}
	if(window.LetvFish && window.LetvFish.getDeviceUid()){
		window.UID = window.LetvFish && window.LetvFish.getDeviceUid();
    }else{
        goLogin();
    }
    window.OnStvBrowserResume = function(){
    	window.UID = window.LetvFish && window.LetvFish.getDeviceUid() || '';
    }
})();
import Vue from 'vue';
import game from './com/game';
import champion from './com/champion';
import score from './com/score';

export default {
  name: 'index',
  data () {
    return {
		configData:configData,
		section:0,//页面的section划分，主页共两个
		tabIndex:0,
		uid:window.UID
    }
  },
  components:{game,champion,score},
  computed:{},
  methods: {
		move(){
			let me  = this;
			// this.forEachPlayer();
			document.onkeydown=function(e){
	  			e=window.event||e;
			  	switch(e.keyCode){
				  	case 13:
				  		me.comfirm();
				  		break;
				    case 37: //左键
				      	me.setLeft();
				     	break;
				    case 38: //向上键
				    	me.setUp()
				      break;
				    case 39: //右键
			      		me.setRight();
				      	break;
				    case 40: //向下键
				    	me.setDown()
				      	break;
				    default:
				      	break;
			  	}
			}
		},
		comfirm(){
			this.$bus.$emit("comfirm"+this.tabIndex);
		},
		setLeft(){
			switch(this.section){
				case 0:
				if(this.tabIndex>0){
					this.tabIndex--;
				}else{
					this.$bus.$emit("move"+this.tabIndex,"left")
				}
				break;
				case 1:
				this.$bus.$emit("move"+this.tabIndex,"left");
				break
			}
		},
		setRight(){
			switch(this.section){
				case 0:
				if(this.tabIndex<2){
					this.tabIndex++;
				}else{
					this.$bus.$emit("move"+this.tabIndex,"right")
				}
				break;
				case 1:
				this.$bus.$emit("move"+this.tabIndex,"right")
				break
			}
		},
		setUp(){
			switch(this.section){
				case 1:
				if(this.$children[this.tabIndex].section==1){
					this.section = 0;
				}
				break;
			}
			this.$bus.$emit("move"+this.tabIndex,"up")
		},
		setDown(){
			switch(this.section){
				case 0:
				if(this.tabIndex!=2){
					this.section++;
				}
				break;
			}
			this.$bus.$emit("move"+this.tabIndex,"down")
		},
		setLight(index){
			return this.section==0 && this.tabIndex==index
		}

  },
  mounted(){
  	const me = this;
	this.move();
	this.$bus.$on("dateChange",function(index){
		me.configData.currentdate = me.configData.date[index]
	})
  },
  beforeRouteEnter(to,from,next){
  	Vue.axios.get('http://worldcup.beta.scloud.letv.cn/h5/home/GetJsonStrByUid',{
  		params:{
  			uid:2
  		}
  	}).then(function(response){
		configData = response.data.data;
		next()
	})
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
	.box_2  span.chosen{
		background: red;
		color: #fff;
	}

	.on{
		border: 1px solid red;
	}
</style>
