			/* Handle any link start with http or https using PhoneGap (Cordova) inAppBrowser
			 * Options you can set data-in-app-browser html attribute to one of the
			 * following options: 
			 * _self - opens in the Cordova WebView if url is in the white-list, else it opens in the InAppBrowser 
			 * _blank - always open in the InAppBrowser 
			 * _system - always open in the system web browse
			 */
			function initInappBrowser() {
			  $(document).on('click', 'a[href^=http], a[href^=https]', function (e) {
			    e.preventDefault();
			    var $this = $(this);
			    var target = '_blank';
			    cordova.InAppBrowser.open($this.attr('href'), target, 'location=no');
			  });
			}