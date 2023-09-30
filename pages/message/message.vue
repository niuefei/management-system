<template>
	<view>
		<view class="message_card">
			<view class="cu-list menu-avatar">
				<view class="cu-item" v-for="item in MessageList" :key="item.id" @click="Jump(item)" >
					<view class="cu-avatar round lg" :style="'background-image:url('+ item.pictureUrl +');'">
						<view v-if="item.unReadNum > 0" class="unread">{{item.unReadNum}}</view>
					</view>
					<view class="content">
						<view class="text-grey">{{item.userName}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								{{item.introduction}}
							</view>
						</view>
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
				MessageList: [],
				unReadMsgLi: this.globalData.unReadMsgLi
			};
		},
		
		onLoad() {
			this.getChatList()
			uni.$on('onSocketMsg', res => {
				this.getChatList()
			})
		},
		
		onShow() {
			if (this.globalData.unReadMsgCount > 0) {
				console.log(this.globalData.unReadMsgCount)
				uni.setTabBarBadge({
					index: 2,
					text: this.globalData.unReadMsgCount.toString()
				})
			} else {
				uni.removeTabBarBadge({
					index: 2
				})
			}
		},
		
		methods: {
			Jump(item) {
				this.globalData.chatWith = item
				uni.navigateTo({
					url: './ChatMessage/ChatMessage',
				});
			},
			
			// 获取聊天列表
			getChatList() {
				this.request({
					url: '/chat/selectChater',
					method: 'GET'
				}).then(res => {
					console.log(res)
					this.MessageList = res.data
					// 后端未返回对应未读数
					// for(let it of this.unReadMsgLi){
					// 	this.MessageList.find(function(item){
					// 		if(item.id == it.fromUser)
					// 		return item.unreadNum++
					// 	})
					// }
				})
			}
		}
	}
</script>

<style lang="scss">
		.unread {
			top: 0;
			right: 0;
			background-color: #d43c33;
			color: #FFFFFF;
			border-radius: 200rpx;
			position: absolute;
			font-size: 20rpx;
			padding: 0rpx 10rpx;
			height: 28rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
</style>
