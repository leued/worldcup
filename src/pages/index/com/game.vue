<template>
  	<div>
  	    <div class="line">
  	    	<hr>
  	    	<em></em><em></em><em></em><em></em>
  	    </div>
		<div class="time">
		    <i class="left"  v-bind:class="{'on focusleft':setLight(1,0),'unable':setUnable(0)}"></i>
			<span v-if="setCurrent(item)" v-for="item,index in configData.date">{{parsedate(item)}}</span>
			<i class="right" v-bind:class="{'on focus':setLight(1,1),'unable':setUnable(1)}"></i>
		</div>
		<div class="player">
			<div class="g-flexbox wrapbox" v-for="(i,index) in gamelist">
			    <div class="info">
			    	<span>{{i.starttime}}</span>
			    	<em>{{i.score?i.score:'-:-'}}</em>
			    </div>
				<div class="game box">{{configData.teamlist[i.left]}}
				  <img :src="imgroute+i.left+'.png'" alt="">
				</div>
				<div class="box box_2">
					<span v-bind:class="{'on focus':setLight(2,0,index),'chosen':setChosen(index,3),'result':setRight(index,3),'wrong':setWrong(index,3)}"><i v-if="setI(index,3)"></i>胜</span>
					<span v-bind:class="{'on focus':setLight(2,1,index),'chosen':setChosen(index,1),'result':setRight(index,1),'wrong':setWrong(index,1)}"><i v-if="setI(index,1)"></i>平</span>	
					<span v-bind:class="{'on focus':setLight(2,2,index),'chosen':setChosen(index,0),'result':setRight(index,0),'wrong':setWrong(index,0)}"><i v-if="setI(index,0)"></i>负</span>
				</div>
				<div class="game box">{{configData.teamlist[i.right]}}
					<img :src="imgroute+i.right+'.png'" alt="">
				</div>
  			</div>
		</div>
		<div class="submit gamesubmit" v-bind:class="{'focus':setLight(3),'on':checkStatus()}">提交竞猜</div>
		<div class="explain">
			<span>规则说明</span>
			<p>1、点击预测的结果，然后提交竞猜即可，提交后不可修改。</p>
			<p>2、各比赛阶段获得积分：小组赛150分/场，淘汰赛300分/场，八强赛500分/场，四强赛750分/场。</p>
		</div>
		<div v-if="showDialog" class="dialog">
			<div class="dialogbox">
				<h2>提示</h2>
				<p>提交竞猜结果后不可修改，您确认提交{{parsedate(configData.currentdate)}}的竞猜结果吗？</p>
				<div>
					<span v-bind:class="{'confirm':dialogbtn==0}">确认</span>
					<span v-bind:class="{'confirm':dialogbtn==1}">取消</span>
				</div>	
			</div>
		</div>
        <transition name="fade">
			<div v-show="showTip" class="dialog">
				<div class="tips">
					{{tips}}
				</div>
			</div>
		</transition>

  	</div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'game',
  props:["psection","dateindex"],
  data () {
    return {
		configData:configData,
		imgroute:$C.imgroute,
		game:{
			x:0,
			y:0
		},//比赛列表中x,y方向的位置
		section1x:1,//时间模块，也即是第一个section在x轴上的位置标志
		section:0, //猜单场分为三个模块，默认进入是第一个模块
		gameindex:null,
		showDialog:false,
		showTip:false,
		tips:"您已成功提交，自动切换至下一日",
		dialogbtn:0
    }
  },
  computed:{
  	gamelist(){
  		var gamelist =[];
  		// console.log(this.configData.gamelist,this.configData.currentdate)
  		for(let i=0;i<this.configData.gamelist.length;i++){
  			if(this.configData.gamelist[i].time == this.configData.currentdate){
  				gamelist = this.configData.gamelist[i].data;
  				this.gameindex = i;
  				if(typeof(this.configData.gamelist[i].status)=="undefined"){
					if(gamelist[0].chosen!=null||gamelist[0].result!=null){
						this.configData.gamelist[i].status = false
					}else{
						this.configData.gamelist[i].status = true
					}
				}
  				break
  			}
  		}
  		return gamelist
  	}
  },
  methods: {
		setLight(section,x=null,y=null){
			switch(section){
				case 1:
				return x == this.section1x  && this.psection==1 && this.section == section;
				break;
				case 2:
				return this.section == section && this.game.x==x && this.game.y==y && this.psection==1
				break;
				case 3:
				return this.section == section && this.psection==1
				break;
				default:
				return false
				break;
			}
		},
		setCurrent(time){
			if(time == this.configData.currentdate){
				return true
			}
		},
		setOn(){
			const me = this;
			//校验是不是该页的比赛都选择了
			for(let i=0;i<me.gamelist.length;i++){
				if(me.gamelist[i].chosen==null){
					return false
				}
			}
			return true
		},
		setUnable(i){
			if(i==0 && this.dateindex == 0){
				return true
			}else if(i==1 && this.dateindex == this.configData.date.length-1){
				return true
			}
		},
		parsedate(time){
			var month = time.toString().slice(5,6);
			var day = time.toString().slice(6);
			return month+"月"+day+"日"
		},
		setChosen(index,num){
			return this.gamelist[index].chosen == num
		},
		setResult(index,num){
			return this.gamelist[index].result == num
		},
		setWrong(index,num){
			return this.gamelist[index].result!=null && !this.setResult(index,num)&&this.setChosen(index,num)
		},
		setRight(index,num){
			return this.gamelist[index].chosen!=null &&this.setResult(index,num)&&(this.setChosen(index,num)||this.gamelist[index].chosen==null)
		},
		setI(index,num){
			if(this.gamelist[index].result!=null){
				if(this.gamelist[index].chosen==this.gamelist[index].result){
					return this.setResult(index,num)
				}else{
					return this.setChosen(index,num)
				}
			}
			
		},
		checkStatus(){
			// for(let i=0;i<this.gamelist.length;i++){
			// 	if(this.gamelist.status){
			// 		return false
			// 	}
			// }
			// console.log(this.configData.gamelist[this.gameindex],this.gameindex)
			return this.configData.gamelist[this.gameindex].status
		},
		handleUp(){
		  	const me = this;
		  	switch(me.section){
		  		case 1:
		  		me.section --
		  		break;
		  		case 2:
		  		if(me.game.y!=0){
		  			me.game.y--
		  		}else{
		  			me.section --
		  		}
		  		break;
		  		case 3:
		  		if(this.showDialog){
					return
				}
		  		me.section --
		  		break;
		  	}
		 },
		handleDown(){
		  	const me = this;
		  	switch(me.section){
		  		case 0:
		  		me.section ++
		  		break;
		  		case 1:
		  		if(me.checkStatus()){
		  			me.section ++
		  		}
		  		break;
		  		case 2:
		  		if(me.game.y!=me.gamelist.length-1){
		  			me.game.y++;
		  		}else{
		  			me.section ++
		  		}
		  		break;
		  	}
		},
		handleLeft(){
			switch(this.section){
				case 1:
				if(this.section1x==1 && this.dateindex!=0){
					this.section1x = 0;
					// this.$bus.$emit("dateChange",this.section1x)
				}
				break;
				case 2:
				if(this.game.x!=0){
					this.game.x--
				}
				break;
				case 3:
				if(this.showDialog){
					this.dialogbtn = 0;
				}
				break;
			}
		},
		handleRight(){
			switch(this.section){
				case 1:
				if(this.section1x==0 && this.dateindex!=this.configData.date.length-1){
					this.section1x = 1;
					// this.$bus.$emit("dateChange",this.section1x)
				}
				break;
				case 2:
				if(this.game.x!=2){
					this.game.x++
				}else{
					this.$bus.$emit('tabToggle',1)
				}
				break;
				case 3:
				if(this.showDialog){
					this.dialogbtn = 1;
				}
				break;
			}
		},
		maps(i){
			const map = {
				"0":3,
				"1":1,
				"2":0
			}
			return map[i]
		},
		beforeconfirm(){
			const me = this;
			//校验是不是该页的比赛都选择了
			for(let i=0;i<me.gamelist.length;i++){
				if(me.gamelist[i].chosen==null){
					// alert("请选择全部竞猜结果后，再提交")
					me.$bus.$emit("alert","请选择全部竞猜结果后，再提交");
					return
				}
			}
			this.dialogbtn = 0;
			this.showDialog = true;
		},
		save(){
			if(this.dialogbtn ==1){
				this.showDialog = false;
				return
			}
			const me = this;
			var value =[];
			for(let i=0;i<me.gamelist.length;i++){
				value.push({
			        id:me.gamelist[i].id,
			        chosen:me.gamelist[i].chosen
			    })
			}
			me.$bus.$emit('showloading',true);
			Vue.axios({
				url:$C.getApi('h5/home/add'),
				method:"post",
			    headers:{
			        'Content-type': 'application/x-www-form-urlencoded'
			    },
			    data:{
			    	uid:UID,
			  		date:me.configData.currentdate,
			  		value:JSON.stringify(value)
			    }
			}).then(function(r){
				if(!r.data.errno==10000){
					// alert(r.data.errmsg)
					me.$bus.$emit("alert",r.data.errmsg);
					me.$bus.$emit('showloading',false);
					me.showTip = false;
					return
				}
				me.showDialog = false;
				me.configData.gamelist[me.gameindex].status = false;
				me.$bus.$emit('showloading',false);
				if(me.dateindex==me.configData.date.length-1){
					me.tips="您已完成全部赛事竞猜！祝您赢得大奖！";
				}else{
					me.tips="您已提交"+me.parsedate(me.configData.currentdate)+"竞猜结果，为您自动切换至下一日。";
				}
				me.showTip = true;
				setTimeout(function(){
					me.showTip = false;
					me.$bus.$emit("dateChange","right");
					if(me.checkStatus){
						me.section=2;
						me.game.x=0;
						me.game.y=0;
					}else{
						me.section=1;
					}
					
				},2000)				
			})
		}
  },
  mounted(){
  	const me = this;
  	this.$bus.$on('move0',function(direction){
  		switch(direction){
  			case "up":
  			me.handleUp();
  			break;
  			case "down":
  			me.handleDown()
  			break;
  			case "left":
  			me.handleLeft();
  			break;
  			case "right":
  			me.handleRight();
  			break;
  		}
  	})
  	this.$bus.$on("comfirm0",function(){
  		if(me.showTip){
  			me.showTip = false;
  			return
  		}
  		switch(me.section){
  			case 1:
  			if(me.section1x==0){
  				this.$bus.$emit("dateChange","left")
  				if(me.dateindex==1){
  					me.section1x = 1;
  				}
  			}else{
  				if(me.dateindex==me.configData.date.length-2){
  					me.section1x = 0;
  				}
  				this.$bus.$emit("dateChange","right")
  			}
  			break;
  			case 2:
  			//此处逻辑待优化
  			me.configData.gamelist[me.gameindex].data[me.game.y].chosen = me.maps(me.game.x);
  			break;
  			case 3:
  			if(me.showDialog){
  				me.save()
  			}else{
  				me.beforeconfirm();
  			}
  			break;
  		}
  	});
  }
}
</script>

<style lang="less" >
	
</style>