'use strict'
module.exports = {
  production :{
  	a:1,
  	assetsPublicPath : '"/"'
  },
  testing : {
  	a : 1,
  	// assetsPublicPath : '"http://ued.beta.scloud.letv.cn:8888/le_h5/worldcup/"'
    assetsPublicPath : '"http://static2-scloud.cp21.ott.cibntv.net/le_h5/worldcup/"'
  },
  development : {
  	"apiRoot" :'"http://ued.beta.scloud.letv.cn:8181/"',
  	getApi:function(url){
  		return this.apiRoot + url
  	},
  	assetsPublicPath : '"/"'
  }
}
