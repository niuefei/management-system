<template>
	<view>
		<view v-if="myTeam">
			<view class="team_content" v-for="item in myTeam" :key="item.id"  @click="to_T_detail(item.id)">
				<view class="img_content" >
					<image :src="item.logoUrl"></image>
				</view>
				<view class="Team_name">{{item.teamName}}</view>
			</view>
		</view>
		<view v-else class="tips">你暂时没有加入任何团队哟~</view>
		<view class="cu-bar btn-group">
			<button class="cu-btn bg-green shadow-blur round1">解散团队</button>
			<button class="cu-btn bg-blue shadow-blur round2"  @click="to_Createteam" >创建团队</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				myTeam:[]
			}
		},
		methods:{
			to_T_detail(id){
				uni.navigateTo({
					url: '../T_detail/T_detail?tid='+id,
				});
			},
			to_Createteam() {
					uni.navigateTo({
						url: '../Create_team/Create_team',
					});
				}
		},
		onLoad: function() {
			this.request({
			url:'/user/teams',
			method:'GET'
			}).then(res=>{
				console.log(res)
				this.myTeam = res.data
			},error=>{
				console.log(error)
			})
		}
	}
</script>

<style>
	.team_content {
		width: 100%;
		height: 160rpx;
		display: flex;
		margin-top:20rpx;
		border-bottom: 1rpx solid #F0F0F0;
	}
	.img_content {
		width: 140rpx;
		height: 140rpx;
		margin-left: 15px;
	}
	.img_content image{
		width: 60px;
		height: 60px;
	}

	.image {
		width: 60px;
		height: 60px;
	}

	.Team_name {
		opacity: 1;
		font-size: 30rpx;
		font-weight: bold;
		text-align: left;
		margin-top: 30px;
		margin-left: 10px;
	}
	.tips{
		color:#DDDDDD;
		text-align: center;
		font-size: 40rpx;
		margin-top: 30rpx;
	}
	
</style>
