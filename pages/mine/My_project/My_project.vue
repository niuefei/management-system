<template>
	<view v-if="myProject.length!==0" class="">
		<view v-for="item in myProject" :key="item.id" class="cu-form-group" @click="to_Detail(item.id)">
			<view class="title">{{item.pname}}</view>
		</view>
	</view>
	<view v-else class="tips">你暂时没有任何项目哟~</view>
</template>

<script>
	export default {
		data(){
			return{
				myProject:[]
			}
		},
		onLoad: function(options) {
			this.request({
			url:'/user/projects',
			method:'GET'
			}).then(res=>{
				this.myProject=res.data
				// 打印
				console.log(this.myProject);
				console.log("请求成功");
			},error=>{
				console.log(error)
			})
		},
		methods: {
			to_Detail(pid){
				uni.navigateTo({
					url:'../../index/myProject_detail/myProject_detail?pid='+pid
				})
			}
		}

	}
</script>

<style>
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
