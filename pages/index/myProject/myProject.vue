<template>
	<view>
		<view class="cu-form-group margin-top pj">
			<view class="pj-list">
				<navigator v-for="item in pjList" :url="'../myProject_detail/myProject_detail?pid='+ item.id" :key="item.key" open-type="navigate" class="pj-item">{{item.pname}}</navigator>
				<navigator url="../myProject_detail/myProject_detail" open-type="navigate" class="pj-item">项目名称</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pjList:[]
			}
		},
		methods: {
			getPjList(){
				this.request({
					url:'/user/projects'
				}).then(res=>{
					this.pjList = res.data
				},err=>{
					console.log('失败',err)
				})
			}
		},
		onLoad(){
			this.getPjList()	
		}
	}
</script>

<style lang="scss" scoped>
.pj{
	.pj-list{
		width: 100%;
		.pj-item{
			height: 120rpx;
			font-size: 32rpx;
			font-weight: bold;
			border-bottom: 1rpx solid #F0F0F0;
			padding-top: 34rpx;
		}
	}
}
</style>
