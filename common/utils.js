// 域名
let baseUrl = "http://8.134.24.227:9002"

let timeout = null;

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 * 
 * @param {Function} func 要执行的回调函数 
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行 
 * @return null
 */
export function debounce(func, wait = 500, immediate = false) {
	// 清除定时器
	if (timeout !== null) clearTimeout(timeout);
	// 立即执行，此类情况一般用不到
	if (immediate) {
		var callNow = !timeout;
		timeout = setTimeout(function() {
			timeout = null;
		}, wait);
		if (callNow) typeof func === 'function' && func();
	} else {
		// 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
		timeout = setTimeout(function() {
			typeof func === 'function' && func();
		}, wait);
	}
}

/**封装请求函数 */
export function request(options) {
	return new Promise((resolve, reject) => {
		let failAlert = '请求失败，稍后重试仍然失败，请联系客服' // 请求失败返回的信息

		// 补全url
		if (options.url)
			options.url = baseUrl + options.url

		// 调用原生的请求
		let header = {
			// 'content-type': 'application/x-www-form-urlencoded'
			'content-type':options.contentType
			// 'content-type':'application/json'
		}
		// console.log(this.globalData.settings.cookie)
		
        if (this.globalData.settings && this.globalData.settings.cookie) {
            header.cookie = this.globalData.settings.cookie
        }

		uni.request({
			header,
			...options,
			success: res => {
				if (options.success) {
					options.success(res)
					resolve(res)
					return
				}
				// 此处要根据后端的返回值变化
				if (res.statusCode != 200) {
					uni.hideLoading()
					uni.stopPullDownRefresh()
					uni.showToast({
						title: res.data.msg || failAlert,
						icon: 'none'
					})
					console.log('url: ', options.url)
					console.log('data: ', JSON.stringify(options.data))
					console.log('cookie: ', header.cookie ? this.globalData.settings.cookie : '')
					console.log('res: ', res)
					reject(res)
				} else {
					resolve(res)
				}
			},
			fail: err => {
				if (options.fail) {
					options.fail(res)
					// 注意请求失败也是resolve
					resolve(res)
					return
				}
				uni.hideLoading()
				uni.stopPullDownRefresh()
				uni.showToast({
					title: failAlert,
					icon: 'none'
				})
				console.log(options.url, err)
				reject(err)
			}
		})
	})
}
