<template>
  	<div>
	  	<div class="champion">
	  		<div class="teambox" v-for="item,index in configData.teamgroup">
	  			<div class="teamitem"  v-bind:class="{'on focus':setLight(index2,1+index),'chsoen':setChosen(index2,1+index)}" v-for="item2,index2 in item">
	  			    <i v-if="setChosen(index2,1+index)"></i>
		  			<img :src="imgroute+item2+'.png'" alt="">
		  			<span>{{configData.teamlist[item2]}}</span>
	  			</div>
	  		</div>
	  	</div>
	  	<div class="submit" v-bind:class="{'on focus':setLight(configData.teamgroup.length+1)}"></div>
	  	<div class="explain">
			<span>规则说明</span>
			<p>1、点击支持的球队，然后提交竞猜即可。</p>
			<p>2、决赛日前可多次提交，以最后一次为准。提交越早，猜中后获得积分越高。</p>
		</div>
		<div v-if="showDialog" class="dialog">
			<div class="dialogbox">
				<h2>支持球队</h2>
				<p>您确认支持{{configData.teamlist[configData.teamgroup[chosen.y-1][chosen.x]]}}对吗？</p>
				<div>
					<span v-bind:class="{'confirm':dialogbtn==0}">确认</span>
					<span v-bind:class="{'confirm':dialogbtn==1}">取消</span>
				</div>	
			</div>
		</div>
  	</div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'champion',
  props:["psection"],
  data () {
  	var x=null,y=null;
  	if(configData.champion.user){
  		for(let i=0;i<configData.teamgroup.length;i++){
  			for(let j =0;j<configData.teamgroup[i].length;j++){
  				if(configData.teamgroup[i][j] == configData.champion.user){
  					x=j;
  					y=i+1;
  					break
  				}
  			}
  		}
  	}
    return {
       configData:configData,
       imgroute:$C.imgroute,
       showDialog:false,
       dialogbtn:0,
       chosen:{
       	x:x,
       	y:y
       },
       section:0,//猜冠军的模块标志，模块个数根据teamgroup来判定
       sectionX:0 //每个section x方向的位置标志
      }
  },
  methods: {
		setLight(x,y=null){
			if(y!=null){
				return this.section == y && this.sectionX==x && this.psection==1
			}else{
				return this.section ==x && this.psection==1
			}
			
		},
		setChosen(x,y){
			// console.log(this.chosen.x,this.chosen.y,x,y)
			return this.chosen.y == y && this.chosen.x==x
		},
		handleUp(){
			const me = this;
			if(this.showDialog){
				return
			}
			me.section !=0 && me.section --
		},
		handleDown(){
			const me = this;
			if(this.showDialog){
				return
			}
			me.section < me.configData.teamgroup.length+1 && me.section ++
		},
		handleLeft(){
			if(this.showDialog){
				this.dialogbtn = 0;
				return
			}
			switch(this.section){
				case 0:
				this.$bus.$emit('tabToggle',0)
				break;
				default:
				if(this.sectionX!=0){
					this.sectionX--
				}else{
					this.$bus.$emit('tabToggle',0)
				}
				break;
			}
		},
		handleRight(){
			if(this.showDialog){
				this.dialogbtn = 1;
				return
			}
			switch(this.section){
				case 0:
				this.$bus.$emit('tabToggle',2);
				break;
				default:
				if(this.sectionX!=this.configData.teamgroup[0].length-1){
					this.sectionX++
				}else{
					this.$bus.$emit('tabToggle',2)
				}
				break;
			}
			
		},
		beforeconfirm(){
			if(!this.chosen.x||!this.chosen.y){
				alert("请选择球队后，再提交")
				return
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
			me.$bus.$emit('showloading',true);
			Vue.axios({
				url:$C.getApi('h5/home/AddUserGuessChampion'),
				method:"post",
			    headers:{
			        'Content-type': 'application/x-www-form-urlencoded'
			    },
			    data:{
			    	uid:UID,
			  		team:me.configData.teamgroup[me.chosen.y-1][me.chosen.x],
			    }
			}).then(function(r){
				if(r.data.errno==10000){
		  			me.showDialog = false;
					me.$bus.$emit('showloading',false);
		  		}else{
		  			alert(r.data.errmsg)
		  		}
			})
		}
  },
  mounted(){
  	const me = this;
  	this.$bus.$on('move1',function(direction){
  		switch(direction){
  			case "up":
  			me.handleUp();
  			break;
  			case "down":
  			me.handleDown();
  			break;
  			case "left":
  			me.handleLeft();
  			break;
  			case "right":
  			me.handleRight();
  			break;
  		}
  	})
  	this.$bus.$on("comfirm1",function(){
  		switch(me.section){
  			case me.configData.teamgroup.length+1:
  			if(me.showDialog){
  				me.save()
  			}else{
  				me.beforeconfirm();
  			}
  			break;
  			default:
  			me.chosen.x = me.sectionX;
  			me.chosen.y = me.section;
  			break;
  		}
  	});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
