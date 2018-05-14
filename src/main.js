(function (doc, win) {
    var resizeEvt;
	var recalc = function () {
		var docEl = document.getElementsByTagName("html")[0];
		var bodyEl = document.getElementsByTagName("body")[0];
		var obj = { 320:1, 360:1, 375:1, 400:1, 414:1, 440:1, 480:1
				, 520:1, 560:1, 600:1, 640:1, 680:1, 720:1
				, 760:1, 800:1, 960:1, 1440:1
			  }

		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
		var clientWidth = docEl.clientWidth;
		if (!clientWidth) {return;}
	    docEl.style.fontSize =  clientWidth/10 + 'px';
	    bodyEl.style.maxWidth =  clientWidth + 'px';
	};
	recalc();
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $le from './utils/le.js'
import './assets/style/main.less'

Vue.config.productionTip = false
Vue.use($le);

router.beforeEach((to, from, next) => {
    // Vue.prototype.$showLoading()
    next()
})

router.afterEach((to, from) => {
   // Vue.prototype.$closeLoading()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
