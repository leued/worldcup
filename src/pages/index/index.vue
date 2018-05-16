<template>
    <div>
        <div class="ad"></div>
		<div class="title">竞猜世界杯</div>
	  	<div class="main">
			<div class="tab">
				<span v-bind:class="{'tabon':setLight(0)}">猜胜负</span>
				<span v-bind:class="{'tabon':setLight(1)}">猜冠军</span>
				<span v-bind:class="{'tabon':setLight(2)}">积分榜</span>
			</div>
			<div>
				<game v-show="tabIndex==0" :psection="section" :dateindex="dateindex"></game>
				<champion v-show="tabIndex==1" :psection="section"></champion>
				<score v-show="tabIndex==2" :psection="section"></score>
			</div>
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
  	var dateindex = 0;
  	for(let i=0;i<configData.date.length;i++){
  		if(configData.date[i] = configData.currentdate){
  			dateindex = i;
  			break;
  		}
  	}
    return {
		configData:configData,
		section:0,//页面的section划分，主页共两个
		tabIndex:0,
		dateindex:dateindex,
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
			return this.tabIndex==index
		}

  },
  mounted(){
  	const me = this;
	this.move();
	this.$bus.$on("dateChange",function(direction){
		if(direction =="left" && me.dateindex!=0){
			me.dateindex--;
		}else if(direction == "right" && me.dateindex != me.configData.date.length-1){
			me.dateindex++;
		}
		me.configData.currentdate = me.configData.date[me.dateindex];
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

</style>
