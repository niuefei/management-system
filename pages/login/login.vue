<template>
	<view class="content">
		<view class="text-area flex-direction">
			<text class="title" style="margin-bottom: 200rpx;">欢迎使用项目管理系统</text>
		</view>
		<form  @submit="formSubmit(userInfo)" v-model="userInfo">
			<view class="Item">
				<text class="txt">账号 :</text>
				<input type="text" v-model="userInfo.stuNumber" placeholder="请输入用户名" />
			</view>
			<view class="Item">
				<text class="txt">密码 :</text>
				<input type="password" v-model="userInfo.password" password="" placeholder="请输入密码" />
			</view>
			<view class="flex justify-around align-center" style="margin-top: 80rpx;">
				<button type="primary" form-type="submit" class="login" @click="goIndex">登录</button>
			</view>
		</form>

	</view>
</template>

<script>
	import Vue from 'vue';
	export default {
		data() {
			return {
				title: 'Hello',
				userInfo: {
					stuNumber: '',
					password: '',
				}
			}
		},
		onLoad() {

		},
		methods: {
			formSubmit(e) {
				console.log(e.stuNumber)
				// var that = this
				// Vue.prototype.globalData.stuNumber=e.userName,
				// 	Vue.prototype.globalData.password=e.password
				wx.setStorage({
					key: 'userInfo',
					data: {
						'stuNumber': e.stuNumber,
						'password': e.password
					}
				})
			},
			goIndex() {
				// uni.reLaunch({
				// 	url:'../index/index'
				// })
				var that = this;
				uni.getStorage({
						key: 'userInfo',
						success: function(res) {
							var userInfo = res.data;
						}
					}),
                    
					console.log(this.userInfo.stuNumber)
					this.request({
						url: "/user/login",
						method: 'POST',
						contentType: 'application/x-www-form-urlencoded',
						data: {
							stuNumber: this.userInfo.stuNumber,
							password: this.userInfo.password
						},
						success: (res) => {
							console.log("登录" , res);
							uni.reLaunch({
								url:'../index/index'
							})
						}
					})
			}
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		/* justify-content: center; */
	}
	
	.Item{
		width: 450rpx;
		display: flex;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 32rpx;
		border: 2rpx solid #4696CB;
		margin-bottom: 30rpx;
		padding: 13rpx; 
		border-radius: 10rpx;
		align-items: center;
	}
	.Item input{
		margin-top:4rpx ;
		padding: 5rpx;
		background-color: #FFf;
	}
	.Item text{
		width: 135rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
		margin-top: 100rpx;
	}

	.title {
		font-size: 53rpx;
		font-weight: bold;
		color: #4696CB;
	}

	.login {
		width: 240rpx;
		border-radius: 10rpx;
		background-color: #4696CB;
		margin: 70rpx 30rpx 70rpx 30rpx;
		font-size: 40rpx;
		text-align: center;
		color: #FFFFFF;
	}

	.user_input {
		width: 200rpx;
		background-color: #FFFFFF;
	}
</style>
