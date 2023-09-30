<template>
	<view v-if="myActivity.length!==0" class="">
		<view v-for="item in myActivity" class="cu-form-group" @click="to_Detail(item.id)">
			<view class="title">{{item.name}}</view>
		</view>
	</view>
	<view v-else class="tips">你暂时没有任何管理的活动哟~</view>
</template>

<script>
	export default {
		data() {
			return {
				myActivity:[]
			}
		},
		methods: {
			getManagerActivity(){
				this.request({
					url:'/user/eventControl1',
					method:'GET'
				}).then(res=>{
					console.log('/user/eventControl1',res)
					this.myActivity = res.data
				},err=>{
					console.log(err)
				})
			},
			to_Detail(id){
				console.log(id)
				uni.navigateTo({
					url:'../Acitivity_creater/Acitivity_creater?id='+id
				})
			}
		},
		onLoad(){
			this.getManagerActivity()
		},
		onShow(){
			this.getManagerActivity()
		}
	}
</script>

<style lang="scss" scoped>
	.cu-form-group{
		border-bottom-style:solid ;
		border-color: #E4E4E4;
		border-width: 1rpx;
	}
	.cu-form-group .title {
		min-width: calc(4em + 18px);
		font-weight: bold;
		
	}
	.tips{
		color:#DDDDDD;
		text-align: center;
		font-size: 40rpx;
		margin-top: 30rpx;
	}
</style>
