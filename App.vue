<script>
	import Vue from 'vue';
	import {
		request,
		debounce
	} from '@/common/utils.js';

	export default {
		onLaunch: function() {
			
			// 兼容苹果finally，勿删，否则iphone无法使用Promise.finally
			// Promise.prototype.finally = function(callback) {
			// 	let P = this.constructor;
			// 	return this.then(
			// 		value => P.resolve(callback()).then(() => value),
			// 		reason =>
			// 		P.resolve(callback()).then(() => {
			// 			throw reason;
			// 		})
			// 	);
			// };

			Vue.prototype.request = request;
			Vue.prototype.debounce = debounce;
			Vue.prototype.globalData = {
				'settings': uni.getStorageSync('settings') || {},
				chatWith: {},
				unReadMsgCount: 0,
				unReadMsgLi: [],
				'userInfo': uni.getStorageSync('userInfo') || {}
			}
			
			// #ifdef MP-WEIXIN
			this._setOpenid()
				.then(() => {
					this._setChat();
				});
			// #endif

			// colorui的获取系统信息
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					}
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					// 自己加的
					Vue.prototype.screenHeight = e.screenHeight;
					Vue.prototype.scaleRpx = 750 / e.windowWidth;

					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			});
			
		},

		onShow: function() {},

		onHide: function() {},
		
		methods: {
			/**自动获取openid */
			_setOpenid() {
				return new Promise((resolve, reject) => {
					uni.login({
						success: res => {
							// 发送请求兑换
							this.request({
								// /user/login/{openid}/{unionid}
								url: '/user/login',
								method: 'POST',
								contentType:'application/x-www-form-urlencoded',
								data: {
									// code: res.code,
									//测试之前都使用固定
									//stuNumber: Vue.prototype.globalData.userInfo.stuNumber,
									//assword: Vue.prototype.globalData.userInfo.password,
									stuNumber: '1114',
									password: '123456'
								}
							}).then(resp => {
								// 保存token
								Vue.prototype.globalData.settings.cookie = resp.cookies[0]
								if (Vue.prototype.globalData.settings.wxInfo === undefined) {
									Vue.prototype.globalData.settings.wxInfo = {}
									Vue.prototype.globalData.settings.wxInfo = resp.data
									// Vue.prototype.globalData.settings.wxInfo.attest = resp.data.data.attest
									// Vue.prototype.globalData.settings.wxInfo.uid = resp.data.data.uid
									// Vue.prototype.globalData.settings.wxInfo.token = resp.data.data.token
									// Vue.prototype.globalData.settings.wxInfo.admin = resp.data.data.admin
								} else {
									Vue.prototype.globalData.settings.wxInfo = resp.data
									// Vue.prototype.globalData.settings.wxInfo.attest = resp.data.data.attest
									// Vue.prototype.globalData.settings.wxInfo.uid = resp.data.data.uid
									// Vue.prototype.globalData.settings.wxInfo.token = resp.data.data.token
									// Vue.prototype.globalData.settings.wxInfo.admin = resp.data.data.admin
								}
								uni.setStorageSync('settings', Vue.prototype.globalData.settings);
								// uni.$emit('getToken')
								this.$isResolve()
								resolve();
							},err=>{
								console.log("err",err)
							});
						}
					});
				});
			},


			/**开启socket聊天相关功能 */
			_setChat() {
				// 开启聊天功能
				const cookie = Vue.prototype.globalData.settings.cookie;
				uni.connectSocket({
					header: {
						cookie
					},
					url: `ws://106.53.116.162:8080/chat`
				}).then(res => {
					//console.log(res,'开启连接')
				});

				// 定时聊天心跳检测
				setInterval(() => {
					// console.log('心跳检测socket')
					uni.sendSocketMessage({
						data: JSON.stringify({
							msg: {
								type: 'heartbeat'
							}
						})
					}).then(res => {
						if (res[0] !== null) {
							console.log(res, 1)
							uni.connectSocket({
								header: {
									cookie: cookie
								},
								url: `ws://106.53.116.162:8080/chat`
							}).then(res => {
								// console.log(res[1],'重连socket');
							});
						}
					});
				}, 40000);


				uni.onSocketClose(() => {
					uni.connectSocket({
						header: {
							cookie
						},
						url: `ws://106.53.116.162:8080/chat`
					}).then(res => {
						// console.log('重连socket', res);
					});
				})

				uni.onSocketMessage(res => {
					Vue.prototype.globalData.unReadMsgCount++
					const resp = JSON.parse(res.data);
					Vue.prototype.globalData.unReadMsgLi.push(resp)
					// 发送全局信号 此时收到消息 resp为消息内容
					uni.$emit('onSocketMsg', resp);
					console.log(resp)
					if (Vue.prototype.globalData.chatWith.id !== resp.fromUser ) {
						uni.showToast({
							title: `用户id为 ${resp.fromUser} 的人发来一条消息`,
							icon: 'none'
						});
						uni.setTabBarBadge({
							index: 2,
							text: Vue.prototype.globalData.unReadMsgCount.toString()
						});
					}

					// // 设置未读消息数
					// if (resp.uid === 'system' && resp.msg.type === 'online') {
					// 	this.globalData.unReadMsgCount = resp.unreadNum;
					// 	if (this.globalData.unReadMsgCount > 0)
					// 		uni.setTabBarBadge({
					// 			index: 3,
					// 			text: this.globalData.unReadMsgCount.toString()
					// 		});
					// }
				});
			}
		}
	};
</script>

<style>
	/*每个页面公共css */
	@import 'colorui/main.css';
	@import 'colorui/icon.css';
	@import 'colorui/animation.css';
	@import '@/common/g-style.scss';
	@import '@/common/iconfont.css';
</style>
