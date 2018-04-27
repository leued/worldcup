import {baseData  as  $c  } from './le/basedata.js'

import $http from './le/axios.js'




const le = {};

le.install =function(Vue) {

  // Vue.prototype.$c = $c;
  Vue.$c = $c;

  Object.assign(Vue,$http)
}

export default le;

