<template>
    <div>
    	<rule v-if="showrule"></rule>
        <div v-if="!showrule">
	        <div class="ad"></div>
			<div class="title"></div>
		  	<div class="main">
				<div class="tab">
					<span v-bind:class="{'tabon':setLight(0),'tabfocus':setFocus(0)}">猜胜负</span>
					<span v-bind:class="{'tabon':setLight(1),'tabfocus':setFocus(1)}">猜冠军</span>
					<span v-bind:class="{'tabon':setLight(2),'tabfocus':setFocus(2)}">积分榜</span>
					<span v-bind:class="{'tabon':setLight(3),'tabfocus':setFocus(3)}">领福利</span>
				</div>
				<div>
					<game v-show="tabIndex==0" :psection="section" :dateindex="dateindex"></game>
					<champion v-show="tabIndex==1" :psection="section"></champion>
					<score v-show="tabIndex==2" :psection="section"></score>
					<bonus v-show="tabIndex==3" :psection="section"></bonus>
				</div>
		  	</div>
		  </div>
	  	<div v-if="showloading" class="loading"><span></span></div>
	  	<transition name="fade">
		  	<div v-if="showDialog" class="dialog">
					<div class="tips">
						{{message}}
					</div>
			</div>
		</transition>
  	</div>
</template>

<script>

import Vue from 'vue';
import game from './com/game';
import champion from './com/champion';
import score from './com/score';
import rule from './com/rule';
import bonus from './com/bonus';

export default {
  name: 'index',
  data () {
  	var dateindex = 0;
  	for(let i=0;i<configData.date.length;i++){
  		if(configData.date[i] == configData.currentdate){
  			dateindex = i;
  			break;
  		}
  	}
    return {
		configData:configData,
		section:0,//页面的section划分，主页共两个
		tabIndex:0,
		dateindex:dateindex,
		uid:window.UID,
		showloading:false,
		showDialog:false,
		message:"",
		showrule:true
    }
  },
  components:{game,champion,score,rule,bonus},
  computed:{},
  methods: {
		move(){
			let me  = this;
			// this.forEachPlayer();
			window.OnReceiveKeyEvent = function(keyCode,action){
				if(action==0){
					switch(keyCode){
						case 5:
						if(me.showrule){
					  	   	me.showrule=false;
					  	   	return
					  	   }
					  	me.comfirm();
				  		break;
				  		case 4: //左键
					      	me.setLeft();
					     	break;
					    case 1: //向上键
					    	me.setUp()
					      break;
					    case 2: //右键
				      		me.setRight();
					      	break;
					    case 3: //向下键
					    	me.setDown()
					      	break;
					    default:
					      	break;
					}
				}
			}

			document.onkeydown=function(e){
	  			e=window.event||e;
			  	switch(e.keyCode){
				  	case 13:
				  	   if(me.showrule){
				  	   	me.showrule=false;
				  	   	return
				  	   }
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
			if(this.showDialog){
				// this.showDialog = false;
				return
			}
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
				if(this.tabIndex<3){
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
			this.$bus.$emit("move"+this.tabIndex,"up");
		},
		setDown(){
			switch(this.section){
				case 0:
				if(this.tabIndex!=2&& this.tabIndex!=3){
					this.section++;
				}
				break;
			}
			this.$bus.$emit("move"+this.tabIndex,"down")
		},
		setLight(index){
			return this.tabIndex==index
		},
		setFocus(index){
			return this.tabIndex==index && this.section ==0;
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
	this.$bus.$on('tabToggle',function(index){
		// if(index==2){
		// 	me.section=0;
		// }
		// me.tabIndex = index;
	})
	this.$bus.$on('showloading',function(o){
		me.showloading = o;
	})
	this.$bus.$on("alert",function(o){
		me.message=o;
		me.showDialog = true;
		setTimeout(function(){
			me.showDialog = false
		},1500)
	});
  },
  beforeRouteEnter(to,from,next){
		function getdata(){
		  	Vue.axios.get($C.getApi('h5/home/GetJsonStrByUid'),{
		  		params:{
		  			uid:UID
		  		}
		  	}).then(function(response){
		  		if(response.data.errno==10000){
		  			configData = response.data.data;
		  		}else{
		  			alert(response.data.errmsg)
		  		}
				next()
			})
		}

		function relogin(){
			var a = document.createElement("div");
		    a.setAttribute('class','dialog');
		    var b = document.createElement("div");
		    b.setAttribute('class','tips');
		    b.innerHTML="请退出后重新登录";
		    a.appendChild(b)
		 	document.body.appendChild(a);
		}

/*登录模块*/

	 var getUrlParam = function(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	    var r = window.location.search.substr(1).match(reg); //匹配目标参数
	    if (r != null) return unescape(r[2]);
	    return null; //返回参数值
	 };
	  if (getUrlParam("uid")) {
	    window.UID = getUrlParam("uid");
	  	getdata();
	 }


	(function(){
		function goLogin(){
			var api = {"action":"com.stv.t2.account","extra":{"type":1,"value":"{\"go_record\":\"true\",\"go_account_center\":\"false\",\"status_code\":\"0\"}","from":"com.stv.ucenter"}};
	    	window.LetvFish && window.LetvFish.startIntentWithParms(JSON.stringify(api));
		}
		if(window.LetvFish && window.LetvFish.getDeviceUid()){
			window.UID = window.LetvFish && window.LetvFish.getDeviceUid();
			getdata();
	    }else{
	        goLogin();
	    }
	    window.OnStvBrowserResume = function(){
	    	window.UID = window.LetvFish && window.LetvFish.getDeviceUid() || '';
	    	if(!window.UID){
	    		relogin()
	    	}else{
	    		getdata();
	    	}
	    	
	    }
	})();


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >

</style>
