<template>
	<view>
		<!-- <cu-custom class="pos"  :isBack="true"><block slot="backText">返回</block><block slot="content">用户名</block></cu-custom> -->
		<cu-custom isBack bgColor="g-bg-theme">
			<block slot="backText">返回</block>
			<block slot="content">{{chatWith.userName}}</block>
		</cu-custom>


		<!-- 加载条 -->
		<view class="cu-load" :class="{'loading': loadingMsg,'over': msgOver}"></view>

		<!-- 消息 -->
		<view class="cu-chat">
			<block v-for="(item,index) in msgLi" :key="item.createTime">

				<!-- 对方消息 -->
				<view v-if="item.fromUser == chatWith.id" class="cu-item">
					<view @click="onDetail()" class="cu-avatar radius" :style="'background-image:url('+ chatWith.pictureUrl +');'"></view>
					<view class="main">
						<view class="content shadow">
							<text user-select>{{item.message}}</text>
						</view>
					</view>
				</view>

				<!-- 自己消息 -->
				<view v-else class="cu-item self">
					<view class="main">
						<view class="action">
							<text @click="onSendErr" v-if="item.err" style="font-size: 44rpx;" class="cuIcon-warnfill text-orange"></text>
						</view>
						<view class="content bg-green shadow">
							<text user-select>{{item.message}}</text>
						</view>
					</view>
					<view class="radius" style="width: 80rpx;height: 80rpx;">
						<open-data type="userAvatarUrl"></open-data>
					</view>
				</view>

			</block>


		</view>

		<!-- 底栏 -->
		<!-- 这个form这样放，以后布局可能会出问题，暂时没事这样放先 -->
		<form v-if="showInput" @submit="onSendMsg">
			<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
				<view @click="onOpenLater" class="action">
					<text class="cuIcon-sound text-grey"></text>
				</view>
				<textarea @input="onInputting" @focus="onInputFocus" @blur="onInputBlur" :value="inputVal" name="msg" auto-height
				 :show-confirm-bar="false" class="solid-bottom inputer" :adjust-position="false" :focus="false" maxlength="300"
				 cursor-spacing="10"></textarea>
				<view @click="onOpenLater" class="action margin-right-sm">
					<text class="cuIcon-emojifill text-grey"></text>
				</view>
				<button form-type="submit" class="cu-btn g-bg-theme shadow">发送</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chatWith: this.globalData.chatWith,
				msgLi: [],
				loadingMsg: false,
				msgOver: false,
				showInput: true,
				inputVal: '',
				InputBottom: 0,
			}
		},

		onLoad() {
			this._updateMsg(true)
			this.onRead()
			
			// 接收消息
			uni.$on('onSocketMsg', res => {
				if(res.fromUser == this.chatWith.id)
					this._updateMsg(true)
			})
		},
		
		onUnload() {
			this.globalData.chatWith = {}
		},

		methods: {

			// 更新消息
			_updateMsg(toBottom = false) {
				this.request({
					url: '/chat/selectHistory',
					method: 'POST',
					data: {
						uid: this.chatWith.id
					}
				}).then(res => {
					this.msgLi = res.data.reverse()
					if (toBottom) {
						setTimeout(() => {
							uni.pageScrollTo({
								scrollTop: 10000000
							})
						}, 200);
					}
				})
			},

			// 标为已读
			onRead() {
				// 消除未读消息
				if (this.chatWith.unReadNum > 0) {
					// 远端消除
					this.request({
						url: '/chat/changeAllRead',
						method: 'POST',
						data: {
							uid: this.chatWith.id,
						}
					})

					// 本地消除 没有unReadNum
					this.globalData.unReadMsgCount -= this.chatWith.unReadNum
					this.chatWith.unReadNum = 0
					const pages = getCurrentPages()
					const prePage = pages[pages.length - 2]
					console.log(prePage.$vm.MessageList)
					for(let i = 0; i<prePage.$vm.MessageList.length; i++){
						if(prePage.$vm.MessageList[i].id == this.chatWith.id)
						prePage.$vm.MessageList[i].unReadNum = 0
					}
				}
			},

			/**发送消息 */
			onSendMsg(e) {
				const msg = e.detail.value.msg
				if (!msg) {
					uni.showToast({
						title: '内容不能为空',
						icon: 'none'
					})
					return
				}

				this._sendSocketMsg(msg)
					.then((res) => {
						if (res[0] === null) {
							this._setLocalMsg(msg)
							this.inputVal = ''}
					})
			},

			/**发送本地消息 */
			_setLocalMsg(msg) {
				this.msgLi = this.msgLi.concat({
					message: msg,
					fromUser: this.globalData.settings.wxInfo.id
				})
				// this.inputVal == ' '
				this.inputVal == ''

				// 使页面滚动到底部
				setTimeout(() => {
					uni.pageScrollTo({
						scrollTop: 10000000
					})
				}, 100);
			},

			onInputting(e) {
				this.inputVal = e.detail.value
			},

			/**聚焦调高度 */
			onInputFocus(e) {
				this.InputBottom = e.detail.height
			},

			/**失焦调高度 */
			onInputBlur(e) {
				this.InputBottom = 0
			},

			/**稍后开放 */
			onOpenLater() {
				uni.showToast({
					title: '稍后开放',
					icon: 'none'
				})
			},

			/**发送网络消息 */
			_sendSocketMsg(msg) {
				return uni.sendSocketMessage({
					data: JSON.stringify({
						message: msg,
						toUser: this.chatWith.id,
						// 测试给自己发消息
						// toUser: 1
					})
				}).then(res => {
					console.log(res[1])
					return res
				})
			}
		}
	}
</script>

<style>
	page {
		padding-bottom: 100rpx;
		background-color: #f1f1f1;
	}

	.order {
		position: sticky;
		z-index: 9999;
		background-color: #FFFFFF;
		margin: 30rpx;
		padding: 20rpx;
		border: 6rpx;

	}

	.cu-item {
		padding: 30rpx !important;

	}

	.inputer {
		flex: 1;
		line-height: 56rpx;
	}
</style>
