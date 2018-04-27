'use strict'
module.exports = {
  production :{a:1},
  development : {
  	"apiRoot" :'"http://ued.beta.scloud.letv.cn:8181/"',
  	getApi:function(url){
  		return this.apiRoot + url
  	}
  }
}
