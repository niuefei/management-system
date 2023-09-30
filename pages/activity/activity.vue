<template>
	<view>
		<view class="active">
			<view class="activity_card" v-for="item in activityList" :key="item.id" @click="goDetail(item.id)">
				<view class="active_img cu-avatar round xl" :style="'background-image:url(' + item.logoUrl+');'">
				</view>
				<view class="active_message">
					<view style="font-size: 36rpx;font-weight: bold;">{{item.name}}</view>
					<view>
						<view style="font-size: small;margin-top: 20rpx;">主办方：{{item.host}}</view>
						<view style="font-size: small;">时间：{{item.createTime | formatDate('-') }}</view>
					</view>
					<view style="font-size: small;color: #7f7f7f;margin-top: 20rpx;">{{item.number}}人已参加</view><!-- 新增一个字段人数 -->
				</view>
				<view style="margin-top: -190rpx;">
					<view class='sellout' :style="{'border-color':(item.status== 0 ?'transparent transparent #F59A23' : item.status==1 ? 'transparent transparent #4C96CB':'transparent transparent #AAAAAA' )}">
						<template v-if="item.status==0">未参加</template>
						<template v-else="item.status==1">已参加</template>
						<template v-else="item.status==2">已过期</template><!-- 这里后台新增一个字段2 -->
					</view>
				</view>

			</view>
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
				active_message: [{
					name: '活动1',
					Sponsor: '广东工业大学',
					time: '20-11-10',
					number: '200',
					action: '未参加',
					avatarUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					name: '活动1',
					Sponsor: '广东工业大学',
					time: '20-11-10',
					number: '200',
					action: '已参加',
					avatarUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				},{
					name: '活动1',
					Sponsor: '广东工业大学',
					time: '20-11-10',
					number: '200',
					action: '已过期',
					avatarUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}],
				activityList:[]
			};
		},
		methods: {
			goDetail(id) {
				uni.navigateTo({
					url: './activity_detail/activity_detail?eId='+id,
				});
			},
			getActivityList(){
				this.request({
					url:'/event/hotEvents',
					method:'GET'
				}).then(res=>{
					this.activityList = res.data
				},err=>{
					console.log('热门活动请求失败',err)
				})
			}
		},
		filters:{
			formatDate: function(value,spe='/') {
			   let data= new Date(value);
			   let year = data.getFullYear();
			   let month = data.getMonth() + 1;
			   let day = data.getDate();
			   month = month >= 10 ? month : "0" + month;
			   day = day >= 10 ? day : "0" + day;
			   return `${year}${spe}${month}${spe}${day}`;
			}
		},
		onLoad(){
			this.getActivityList()
		}
	}
</script>

<style lang="scss">
	.active {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.activity_card {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 700rpx;
		height: 240rpx;
		border-radius: 10rpx;
		box-shadow: 0px 0px 2px 0px #797979;
		// border: 1px solid #797979;
		margin: 20rpx 24rpx;

		.active_img {
			width: 200rpx;
			height: 200rpx;
			margin-left: 32rpx;
		}

		.active_message {
			margin-left: 32rpx;
		}
	}

	.sellout_box {
		width: 30%;
		background-color: white;
		overflow: hidden;
		position: relative;
		margin-left: auto;
	}

	.sellout {
		color: white;
		font-size: 28rpx;
		width: 170rpx;
		height: 0;
		text-align: center;
		position: absolute;
		right: -14rpx;
		transform: rotate(45deg);
		border-width: 0 40rpx 40rpx 40rpx;
		border-style: none solid solid;
	}

</style>
