<template>
	<view>
		<view class="cu-form-group1">
			<image src="https://img0.baidu.com/it/u=1514002029,2035215441&fm=26&fmt=auto&gp=0.jpg" name="img"></image>
			<view class="title">活动名称</view>
		</view>
		<view class="cu-form-group2">
			<view class="title1">管理员</view>
			<view class="title2">添加/删除管理人员</view>
			<view class="cu-bar search bg-white">
				<view class="search-form radius">
					<text class="cuIcon-search"></text>
					<input  v-model="inputValue" :adjust-position="false" type="text" placeholder="" confirm-type="search"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-blue1 shadow-blur radius" @click="search">查找</button>
				</view>
			</view>
			<view class="tips">未找到该人员</view>
			<view class="mem-list">
				<view class="mem-item">
					<view class="cu-avatar xl round margin-left Img" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
					<view class="tx">周杰伦</view>
					<button class="cu-btn bg-blue1 margin-tb-sm" @click="addMem(1)">添加</button>
				</view>
				<view class="mem-item">
					<view class="cu-avatar xl round margin-left Img" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
					<view class="tx">周杰伦</view>
					<button class="cu-btn bg-red margin-tb-sm" @click="DeleteMem(1)">删除</button>
				</view>
				<view class="mem-item">
					<view class="cu-avatar xl round margin-left Img" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
					<view class="tx">周杰伦</view>
					<button class="cu-btn bg-red margin-tb-sm" @click="DeleteMem(1)">删除</button>
				</view>
			</view>
		</view>
		<view class="cu-form-group2">
			<view class="title1">报名人员</view>
			<view class="mem-list1">
				<view class="mem-item1" v-for=" (item,index) in searchList" :key="item.id">
					<view class="cu-avatar xl round margin-left Img" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
					<text class="tx1">{{item.name}}</text>
					<button class="cu-btn bg-red margin-tb-sm" @click="reject(1)">驳回</button>
					<button class="cu-btn bg-blue1 margin-tb-sm" @click="pass(1)">通过</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue:'',
				memberList:[],
				searchList:[
					{
						id:0,
						name:'周杰伦',
						
					},{
						id:1,
						name:'周杰伦',
						
					},{
						id:2,
						name:'周杰伦',
						
					},{
						id:3,
						name:'周杰伦',
						
					}
				]
			}
		},
		methods: {
			search(){
				const searchValue = this.inputValue;
				// this.request({
				// 	url:'',
				// 	methods:'',
				// 	data:{searchValue},
				// 	contentType:'application/x-www-form-urlencoded'
				// }).then(res=>{
				// 	this.memberList = res.data;
				// })
				uni.showModal({
					content:'接口暂未开放'
				})
			},
			addMem(id){
				uni.showModal({
					content:'确定将其添加成管理员吗？',
					success:(res)=>{
						this.request({
							url:'/event/addCtrl2Event',
							methods:'POST',
							data:{eid:1,uid:1},
							contentType:'application/x-www-form-urlencoded'
						}).then(res=>{
							console.log(res)
							uni.showToast({
								title:'添加成功！',
								icon:'none'
							})
						},err=>{
							uni.showToast({
								title:'信息虚拟，添加失败！',
								icon:'none'
							})
						})
					}
				})
				
			},
			DeleteMem(id){
				uni.showModal({
					content:'确定要删除该管理员吗?',
					success:(res)=>{
						if(res.confirm){
							uni.showModal({
								content:'接口暂未开放'
							})
						}
					}
				})
			},
			reject(id){
				uni.showModal({
					content:'确定驳回申请吗？',
					success:(res)=>{
						if(res.confirm){
							uni.showModal({
								content:'接口暂未开放'
							})
						}
					}
					
				})
			},
			pass(id){
				uni.showModal({
					content:'确定通过申请吗？',
					success:(res)=>{
						if(res.confirm){
							uni.showModal({
								content:'接口暂未开放'
							})
						}
					}
					
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	image{
		margin: 20rpx 30rpx;
		height: 60px;
		width: 60px;
	}
	.cu-form-group1{
		display: flex;
		border-bottom: 1rpx solid #F0F0F0;
	}
	.title{
		margin-top: 60rpx;
		font-size: 36rpx;
		font-weight: bold;
	}
	.title1{
		font-size: 32rpx;
		width: 100%;
		line-height: 80rpx;
		margin:0 30rpx ;
	}
	.title2{
		font-size: 24rpx;
		margin:0 30rpx ;
	}
	.tips{
		color: red;
		font-size: 24rpx;
		line-height: 32rpx;
		margin: 0 30rpx;
	}
	.mem-list{
		display: flex;
		margin-left: 30rpx;
		flex-wrap: wrap;
		.mem-item{
			margin-top: 30rpx;
			width: 30%;
			justify-content: center;
			align-items: center;
			text-align: center;
			.tx{
				font-size: 34rpx;
				padding-left: 10rpx;
				line-height: 80rpx;
				font-weight: bold;
			}
			
		}
	}
	.bg-blue1{
		background-color: #4c96cb;
		color:#fff;
	}
	.mem-list1{
		padding:10rpx 0;
		.mem-item1{
			border-bottom: 1rpx solid #F0F0F0;
			clear: both;//清楚浮动
			padding: 10rpx 30rpx;
			.Img{
				width: 50px;
				height: 50px;
				margin: 0 30rpx;
			}
			.tx1{
				font-size: 24rpx;
			}
			button{
				margin-right: 20rpx;
				float: right;
			}
		}
	}
	
	
</style>
