<template>
 <view>
  <image class="img" :src="Activity.logoUrl"></image>
  <view class="active_name">
   活动：{{Activity.name}}
  </view>
  <view class="active_message">
   <text>活动详情</text>
   <view class="message">活动时间：{{Activity.holdTime}}</view>
   <view class="message">地点：{{Activity.site}}</view>
   <view class="message">主办方：{{Activity.host}}</view>
   <view class="message">更多内容：{{Activity.introduction}}</view>
  </view>
  <view class="g-bg-theme button" @click="toSignUp">我要报名</view>
 </view>
 
</template>

<script>
 export default {
  data() {
   return {
		eId:'',
		Activity:{}
   }
  },
  methods: {
	// /event/signUp
	toSignUp(){
		const eid = this.eId;
		this.request({
			url:'/event/signUp',
			method:'POST',
			data:{eid},
			contentType:'application/x-www-form-urlencoded'
		}).then(res=>{
			if(res.statusCode==200){
				uni.showToast({
					title:'报名成功',
					duration:3000
				})
			}else{
				uni.showToast({
					title:'报名失败',
					duration:3000,
					icon:'none'
				})
			}
			
		},err=>{
			uni.showToast({
				title:'信息虚拟，报名失败',
				duration:3000,
				icon:'none'
			})
		})
	},
	getActivity(){
		const eid = this.eId;
		this.request({
			url:'/event/selectEventByEid',
			method:'POST',
			data:{eid},
			contentType:'application/x-www-form-urlencoded'
		}).then(res=>{
			if(res.statusCode==200){
				this.Activity = res.data
			}else{
				uni.showToast({
					title:'数据请求失败',
					duration:3000,
					icon:'none'
				})
			}
		},err=>{
			uni.showToast({
				title:'数据请求失败',
				duration:3000,
				icon:'none'
			})
		})
	}
	
  },
  onLoad(options) {
	 console.log(options)
  	this.eId = options.eId;
	this.getActivity()
  }
 }
</script>

<style>
 .img {
  width: 100%;
  height: 350rpx;
  opacity: 1;
 }

 .active_name {
  text-align:left; 
  height: 100rpx; 
  font-size: large;
  font-weight: bold;
  padding: 25rpx 45rpx;
 }
 
 .active_message{
  /* height: 800rpx; */
  font-size: 32rpx;
  padding: 25rpx 45rpx;
  background-color: #EEEEEE;
 }
 .active_message text:first-child{
	 font-size: 40rpx;
	 color: rgba(0,0,0,0.9);
 }
 
 .message{
  padding: 25rpx 45rpx;
 }
 
 
 .button {
 	font-weight: bold;
 	height: 80rpx;
 	width: 280rpx;
 	margin: 30rpx auto;
 	line-height: 80rpx;
 	text-align: center;
 	border-radius: 5px;
 }
</style>