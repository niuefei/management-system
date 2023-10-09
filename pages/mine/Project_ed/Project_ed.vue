<template>
	<view class="content">

		<navigator v-for="item in myProject" :url="'../Project_detail/Project_detail?pid='+item.id" :key="item.id" class="cu-form-group">
			<view class="title">{{item.pname}}</view>
		</navigator>
		<view class="bt">
			<view class="cu-bar btn-group">
				<button class="cu-btn bg-green shadow-blur round1">解散项目</button>
				<button class="cu-btn bg-blue shadow-blur round2" @click="Create_project">创建项目</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
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
			},error=>{
				console.log(error)
			})		
		},
		methods:{
			Create_project() {
				uni.navigateTo({
					url: '../Create_project/Create_project',
				});
			},
			to_project_Ed(){
				uni.navigateTo({
					url: '../Project_detail/Project_detail',
				});
			},
		}
	}
</script>

<style lang="scss">
	.cu-form-group {
		height: 60px;
		border-bottom-style:solid ;
		border-color: #E4E4E4;
		border-width: 1rpx;
		.title{
			font-weight: bold;
		}

	}
      .cu-bar btn-group{
		margin-bottom: 104px;
	}
/deep/ .cu-btn bg-green shadow-blur round1{
	margin-bottom: 104px;
}
	
</style>
