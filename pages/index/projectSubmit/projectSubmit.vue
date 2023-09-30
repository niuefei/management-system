<template>
	<view class="container">
		<view class="tabs">
			<view class="tabls_item" v-for="(item,index) in tabs" :key="item.id" :class="item.isActive?'active':''" @click="handleTabe(item.id)">
				{{item.text}}
			</view>
		</view>
		<view class="content">
			<block v-if="tabs[0].isActive">
				<form action="">
					<view class="competition">
						<view class="cu-form-group margin-top floor">
							<view class="title">竞赛类型</view>
							<picker @change="PickerChange"  class="competitionPicker" :value="index" :range="compeTypepicker">
								<view class="picker">
									{{competition.contestType===''?'请选择竞赛类型':competition.contestType}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group floor">
							<view class="title">赛事名称</view>
							<input class="competitionPicker" v-model="competition.contestName" placeholder="请输入赛事名称" />
						</view>
						<view class="cu-form-group floor">
							<view class="title">主办单位</view>
							<input class="competitionPicker" v-model="competition.holdUnit1" placeholder="请输入主办单位" />
						</view>
						<view class="cu-form-group">
							<view class="title">日期选择</view>
							<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
								<view class="picker">
									{{competition.contestTime===''?'请选择日期':competition.contestTime}}
								</view>
							</picker>
						</view>
					</view>
					<view class="pj">
						<view class="cu-form-group margin-top">
							<view class="title">项目名称</view>
							<input v-model="competition.contestProjectName" placeholder="请输入项目名称" />
						</view>
						<view class="cu-form-group">
							<view class="title">指导老师</view>
							<input v-model="competition.teacher" placeholder="请输入指导老师" />
						</view>
						<view class="cu-form-group">
							<view class="title">主办单位</view>
							<input v-model="competition.holdUnit2" placeholder="请输入主办单位" />
						</view>
						<view class="cu-form-group">
							<view class="title">竞赛级别</view>
							<picker @change="compeRankChange" class="competitionPicker" :value="index" :range="compeRank">
								<view class="picker">
									{{competition.contestLevel===''?'请选择竞赛级别':competition.contestLevel}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group">
							<view class="title">竞赛类别</view>
							<picker @change="compeTypeDetailChange" class="competitionPicker" :value="index" :range="compeTypeDetail">
								<view class="picker">
									{{competition.contestTypeDetails===''?'请选择类别细分':competition.contestTypeDetails}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group type">
							<view class="title">参赛类型</view>
							<radio-group @change="participantChange"  class="radiogroup">
								<radio value="personal">个人</radio>
								<radio value="team">团队</radio>
							</radio-group>
						</view>
						<view class="cu-form-group">
							<view class="title">获奖等级</view>
							<picker @change="priceRankChange" class="competitionPicker" :value="index" :range="priceRank">
								<view class="picker">
									{{competition.prizeLevel===''?'请选择获奖等级':competition.prizeLevel}}
								</view>
							</picker>
						</view>
						
					</view>
					<view class="cu-form-group margin-top file" @click="uploadFileComp">
						<image style="width: 50rpx;height: 50rpx;" src="../../../static/index_image/sub.png"></image>
						<view class="title1">附件上传</view>
					</view>
					<view v-for="(item,index) in competitionFile" :key="index" class="cu-form-group file_input" placeholder="file">
						<text class="title margin-right-xs">{{item.name}}</text>
						<text class="cuIcon-roundclosefill text-red dir" @click="deleteFileComp(index)"></text>
					 </view >
					<view class="cu-form-group add">
						<view class="title">说明</view>
						<textarea @blur="InputBlur" style="height: 380rpx;" maxlength="-1" placeholder="请输入内容"></textarea>
						<view class="group" style="display: flex;">
							<view @click="save" data-value="competition" class="button">保存草稿</view>
							<view @click="submit" data-value="competition" class="g-bg-theme button">提交</view>
						</view>
					</view>
					
				</form>
				
			</block>
			<block v-else-if="tabs[1].isActive">
				<form>
					<view class="cu-form-group margin-top floor">
						<view class="title">发明专利名称</view>
						<input class="competitionPicker" v-model="patent.patentName" placeholder="请输入专利名称" />
					</view>
					<view class="cu-form-group floor">
						<view class="title">发明类别</view>
						<picker @change="patentTypeChange" class="competitionPicker" :value="index" :range="patentType">
							<view class="picker">
								{{patent.patentType===''?'请选择发明类别':patent.patentType}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">申请日期</view>
						<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="PatentDateChange">
							<view class="picker">
								{{patent.patentDeclareTime===''?'请选择申请日期':patent.patentDeclareTime}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group floor">
						<view class="title">专利(授权)号</view>
						<input class="competitionPicker" v-model="patent.patentNumbers" placeholder="请输入专利(授权)号" />
					</view>
					<view class="cu-form-group floor1">
						<view class="item">
							<view class="title">所有作者</view>
							<input class="competitionPicker" v-model="patent.patentAuthors" placeholder="按Enter键确认" />
						</view>
						<view class="tips">请按排名顺序填写，如为老师，需在姓名后备注"(师)</view>
					</view>
					
					<view class="cu-form-group floor">
						<view class="title">个人排名</view>
						<input type="number" v-model="patent.ranking" placeholder="请输入1-9的数字" />
					</view>
					<view class="cu-form-group">
						<view class="title">获得日期</view>
						<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="reciDateChange">
							<view class="picker">
								{{patent.patentGetTime===''?'请选择获得日期':patent.patentGetTime}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group floor">
						<view class="title">指导老师</view>
						<input class="competitionPicker" v-model="patent.teacher" placeholder="请输入指导老师" />
					</view>
					<view class="cu-form-group floor">
						<view class="title">文献被引用格式内容</view>
						<input class="competitionPicker" v-model="patent.content" placeholder="请输入文献被引用格式内容" />
					</view>
					<view class="cu-form-group margin-top file" data-value="patent" @click="uploadFilePatent">
						<image style="width: 50rpx;height: 50rpx;" src="../../../static/index_image/sub.png"></image>
						<view class="title1">附件上传</view>
					</view>
					<view v-for="(item,index) in patentFile" :key="index" class="cu-form-group file_input" placeholder="file">
						<text class="title margin-right-xs">{{item.name}}</text>
						<text @click="deleteFilePatent(index)" class="cuIcon-roundclosefill text-red dir"></text>
					 </view >
					<view class="cu-form-group add">
						<view class="title">说明</view>
						<textarea @blur="InputBlur" style="height: 380rpx;" maxlength="-1" placeholder="请输入内容"></textarea>
						<view class="group" style="display: flex;">
							<view @click="save" data-value="patent" class="button">保存草稿</view>
							<view @click="submit"  data-value="patent"  class="g-bg-theme button">提交</view>
						</view>
					</view>
				</form>
			</block>
			<block v-else-if="tabs[2].isActive">
				<form>
					<view class="cu-form-group margin-top floor">
						<view class="title">论文标题</view>
						<input v-model="paper.thesisTitle" placeholder="请输入论文标题" />
					</view>
					<view class="cu-form-group floor">
						<view class="title">发表类型</view>
						<picker @change="paperTypeChange" class="competitionPicker" :value="index" :range="paperType">
							<view class="picker">
								{{paper.thesisType===''?'请选择发表类型':paper.thesisType}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">类型细分</view>
						<input v-model="paper.thesisTypeDetails" placeholder="请输入发表类型细分" />
					</view>
					<view class="cu-form-group margin-top floor">
						<view class="title">发表刊物/论文集</view>
						<input v-model="paper.publicationName" placeholder="请输入发表刊物/论文集" />
					</view>
					<view class="cu-form-group">
						<view class="title">发表日期</view>
						<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="PaperDateChange">
							<view class="picker">
								{{paper.publicationTime===''?'请选择发表':paper.publicationTime}}
							</view>
						</picker>
					</view>

					<view class="cu-form-group floor">
						<view class="title">期刊号</view>
						<input v-model="paper.publicationNumbers" class="competitionPicker" placeholder="请输入期刊号" />
					</view>
					<view class="cu-form-group floor">
						<view class="title">页码</view>
						<input v-model="paper.publicationPage" type="number" placeholder="输入如:23-27" />
					</view>
					<view class="cu-form-group">
						<view class="title">成果状态</view>
						<picker @change="reciverChange" class="competitionPicker" :value="index" :range="reciver">
							<view class="picker">
								{{paper.publicationState===''?'请选择成果状态':paper.publicationState}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group floor">
						<view class="title">指导老师</view>
						<input v-model="paper.teacher" class="competitionPicker" placeholder="请输入指导老师" />
					</view>
					<view class="cu-form-group floor1">
						<view class="item">
							<view class="title">所有作者</view>
							<input v-model="paper.publicationAuthors" class="competitionPicker" placeholder="按Enter键确认" />
						</view>
						<view class="tips">请按排名顺序填写，如为老师，需在姓名后备注"(师)</view>
					</view>
					<view class="cu-form-group floor">
						<view class="title">本人排名</view>
						<input type="number" v-model="paper.ranking" placeholder="请输入1-9的数字" />
					</view>
					<view class="cu-form-group">
						<view class="title">选择被被转载/刊载情况</view>
						<picker @change="otherQuoteChange" class="competitionPicker" :value="index" :range="otherQuote">
							<view class="picker">
								{{paper.publicationReprint===''?'选择被被转载/刊载情况':paper.publicationReprint}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group floor">
						<view class="title">文献被引用格式内容</view>
						<input v-model="paper.publicationQuoted" class="competitionPicker" placeholder="请输入文献被引用格式内容" />
					</view>
					<view class="cu-form-group margin-top file" data-value="paper" @click="uploadFilePaper">
						<image style="width: 50rpx;height: 50rpx;" src="../../../static/index_image/sub.png"></image>
						<view class="title1">附件上传</view>
					</view>
					<view v-for="(item,index) in paperFile" :key="index" class="cu-form-group file_input" placeholder="file">
						<text class="title margin-right-xs">{{item.name}}</text>
						<text @click="deleteFilePaper(index)" class="cuIcon-roundclosefill text-red dir"></text>
					 </view >
					<view class="cu-form-group add">
						<view class="title">说明</view>
						<textarea @blur="InputBlur" style="height: 380rpx;" maxlength="-1" placeholder="请输入内容"></textarea>
						<view class="group" style="display: flex;">
							<view @click="save" data-value="paper" class="button">保存草稿</view>
							<view @click="submit" data-value="paper" class="g-bg-theme button">提交</view>
						</view>
					</view>
				</form>
			</block>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs:[
					{
						id:0,
						text:'竞赛',
						isActive:true
					},{
						id:1,
						text:'专利',
						isActive:false
					},
					{
						id:2,
						text:'论文',
						isActive:false
					}
				],
				// 竞赛字段声明
				compeTypepicker: ['学术竞赛', '创新活动', '文艺活动','体育赛事'],
				compeRank:['学校级','学院级','国家级','省部级','地市级','其他'],
				compeTypeDetail:['一级竞赛','二级竞赛','三级A级竞赛','三级B级竞赛'],
				priceRank:['特等奖','优胜奖','一等奖','二等奖','三等奖','优秀奖','入围奖'],
				competition:{
					id:1,
					contestType:'',
					contestName:'',
					holdUnit1:'',
					contestTime:'',
					contestProjectName:'',
					holdUnit2:'',
					contestLevel:'',
					contestTypeDetails:'',
					personOrTeam:'',
					explainContext:'',
					prizeLevel:'',
					filename:'app.doc',
					display:'0'
				},
				// 专利字段声明
				patentType:['会议论文','国内期刊','国外期刊'],
				patent:{
					id:'1',
					patentName:'',
					patentType:'',
					patentDeclareTime:'',
					patentNumbers:'',
					patentAuthors:'',
					ranking:'',
					patentGetTime:'',
					teacher:'',
					content:'',
					explainContext:'',
					filename:'',
					display:'0'
				},
				// 论文
				paperType:['会议论文','国内期刊','国外期刊'],
				reciver:['已收录','见刊','在线发表'],
				otherQuote:['被《新华文摘》转载论文',"被《中国社会科学文摘》转载论文",'被《新华文摘》论点摘登论文','被《中国社会科学文摘》论点摘登论文','《人大复印资料》全文刊载文章','人民日报理论版发表的理论性文章','光明日报理论版发表的文章'],
				paper:{
					id:1,
					thesisTitle:'',
					thesisType:'',
					thesisTypeDetails:'',
					publicationName:'',
					publicationTime:'',
					publicationNumbers:'',
					publicationPage:'',
					publicationState:'',
					teacher:'',
					publicationAuthors:'',
					ranking:'',
					publicationReprint:'',
					publicationQuoted:'',
					explainContext:'',
					filename:'',
					display:'0'
				},
				competitionFile:[],
				resUrl:'',
				patentFile:[],
				paperFile:[]
			}
		},
		onLoad() {
			// 获取缓存内容 -- 竞赛部分
			const compeTemp = uni.getStorageSync('competition');
			if(compeTemp!=null&&compeTemp!=undefined&&compeTemp!=''){
				this.competition = compeTemp;
			}
			const patentTemp = uni.getStorageSync('patent');
			if(patentTemp!=null&&patentTemp!=undefined&&patentTemp!=''){
				this.patent = patentTemp;
			}
			const paperTemp = uni.getStorageSync('paper');
			if(paperTemp!=null&&paperTemp!=undefined&&paperTemp!=''){
				this.paper = paperTemp;
			}
		},
		methods: {
			handleTabe(id){
				this.tabs.forEach((v,i)=>v.id === id?v.isActive=true:v.isActive=false)
			},
			deleteFileComp(index){
				this.competitionFile.splice(index,1);
			},
			deleteFilePatent(index){
				this.patentFile.splice(index,1);
			},
			deleteFilePaper(index){
				this.paperFile.splice(index,1);
			},
			uploadFileComp(){
				uni.chooseMessageFile({
					count:5,
					type:'file',
					success:(res)=>{
						this.competitionFile = res.tempFiles;
						res.tempFiles.forEach((v,i)=>{
							uni.uploadFile({
								url:'http://106.53.116.162:8080/file',
								filePath:v.path,
								name:'file',
								success:(res1)=>{
									this.competition.filename = res1.data;
									// this.resUrl = this.resUrl +','+res1.data;
								}
							})
						})
					}
				})
			},
			uploadFilePatent(){
				uni.chooseMessageFile({
					count:5,
					type:'file',
					success:(res)=>{
						this.patentFile = res.tempFiles;
						res.tempFiles.forEach((v,i)=>{
							uni.uploadFile({
								url:'http://106.53.116.162:8080/file',
								filePath:v.path,
								name:'file',
								success:(res1)=>{
									this.patent.filename = res1.data;
								}
							})
						})
					}
				})
			},
			uploadFilePaper(){
				uni.chooseMessageFile({
					count:5,
					type:'file',
					success:(res)=>{
						this.paperFile = res.tempFiles;
						res.tempFiles.forEach((v,i)=>{
							uni.uploadFile({
								url:'http://106.53.116.162:8080/file',
								filePath:v.path,
								name:'file',
								success:(res1)=>{
									console.log(res1)
									this.paper.filename = res1.data;
									// this.resUrl = this.resUrl +','+res1.data;
								}
							})
						})
					}
				})
			},
			
			
			/**
			 * 竞赛页表单事件
			 * */
			PickerChange(e){
				const value = e.detail.value;
				console.log(e.detail.value)
				this.competition.contestType = this.compeTypepicker[value];
			},
			DateChange(e) {
				this.competition.contestTime = e.detail.value
			},
			compeRankChange(e){
				const value = e.detail.value;
				this.competition.contestLevel = this.compeRank[value];
			},
			compeTypeDetailChange(e){
				const value = e.detail.value;
				this.competition.contestTypeDetails = this.compeTypeDetail[value];
			},
			priceRankChange(e){
				const value = e.detail.value;
				this.competition.prizeLevel = this.priceRank[value];
			},
			InputBlur(e){
				const value = e.detail.value;
				this.competition.explainContext = value;
			},
			participantChange(e){
				const value = e.detail.value;
				this.competition.personOrTeam = value;//字段personal,team提交表单时更改
			},
			save(e){
				const value = e.currentTarget.dataset.value;
				switch(value){
					case 'competition':
						uni.setStorageSync('competition',this.competition);
						uni.showToast({
							title:'保存成功',
							icon:'success',
							duration:3000
						})
						break;
					case 'patent':
						uni.setStorageSync('patent',this.patent);
						uni.showToast({
							title:'保存成功',
							icon:'success',
							duration:3000
						})
						break;
					case 'paper':
						uni.setStorageSync('paper',this.paper);
						uni.showToast({
							title:'保存成功',
							icon:'success',
							duration:3000
						})
						break;
				}
				
			},
			submit(e){
				const value = e.currentTarget.dataset.value;
				const that = this;
				switch(value){
					case 'competition':
						const competition = this.competition;
						this.request({
							url:'/project/submitContest',
							method:'POST',
							contentType:'application/json;charset=utf-8',
							data:competition
						}).then(res=>{
							if(res.statusCode==200){
								uni.showToast({
									title:'提交成功'
								})
							}else{
								uni.showToast({
									title:'提交失败',
									icon:'none'
								})
							}
						},err=>{
							uni.showToast({
								title:'提交格式错误',
								icon:'none'
							})
						})
						break;
					case 'patent':
					const patent = this.patent;
						this.request({
							url:'/project/submitPatent',
							method:'POST',
							contentType:'application/json;charset=utf-8',
							data:patent
						}).then(res=>{
							if(res.statusCode==200){
								uni.showToast({
									title:'提交成功'
								})
							}else{
								uni.showToast({
									title:'提交失败',
									icon:'none'
								})
							}
						},err=>{
							uni.showToast({
								title:'连接失败',
								icon:'none'
							})
						})
						break;
					case 'paper':
					const paper = this.paper;
						this.request({
							url:'/project/submitThesis',
							method:'POST',
							contentType:'application/json',
							data:paper
						}).then(res=>{
							if(res.statusCode==200){
								uni.showToast({
									title:'提交成功'
								})
							}else{
								uni.showToast({
									title:'提交失败',
									icon:'none'
								})
							}
						},err=>{
							uni.showToast({
								title:'连接失败',
								icon:'none'
							})
						})
						break;
				}
			},
			/**
			 * 专利页表单事件
			 * */
			PatentDateChange(e){
				this.patent.patentDeclareTime = e.detail.value
			},
			reciDateChange(e){
				this.patent.patentGetTime = e.detail.value;
			},
			patentTypeChange(e){
				const value = e.detail.value;
				this.patent.patentType = this.patentType[value];
			},
			/**
			 * 论文表单时间
			 * */
			PaperDateChange(e){
				this.paper.publicationTime = e.detail.value;
			},
			paperTypeChange(e){
				this.paper.thesisType = this.paperType[e.detail.value]
			},
			reciverChange(e){
				this.paper.publicationState = this.reciver[e.detail.value]
			},
			otherQuoteChange(e){
				this.paper.publicationReprint = this.otherQuote[e.detail.value]
			}
		},
		filters:{
			
			fileFormat:function(value){
				if(value!==undefined){
					var index = value.lastIndexOf("\/");
					return value.substring(index + 1, value.length);
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.container{
		background-color: #f2f2f2;
	}
	.tabs{
		background-color: #fff;
		display: flex;
		.tabls_item{
			padding: 20rpx;
			width: 33.3%;
			text-align: center;
			font-size: 32rpx;
			font-weight: bold;
		}
		.active{
			color: #4696CB;
			border-bottom: 4rpx solid #4696CB;
		}
	}
	.competition{
		border-radius: 20rpx;
	}
	.radiogroup{
		radio{
			width: 150rpx;
			height: 50rpx;
			font-size: 32rpx;
			margin: 10rpx;
		}
		
	}
	.title1{
		font-size: 32rpx;
		font-weight: bold;
	}
	.add{
		display: flex;
		flex-direction: column;
		height: 380rpx;
		margin-bottom: 20rpx;
		textarea{
			margin: 0;
			width: 90%;
			height: 200rpx;
			border: 1rpx solid #ddd;
			padding: 20rpx;
		}
	}
	.btn{
		background-color: #fff;
		display: flex;
		height: 300rpx;
		button{
			font-size: 24rpx;
			font-weight: bold;
			width: 200rpx;
			height: 80rpx;
		}
	}
	.floor1{
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		.item{
			display: flex;
		}
		.tips{
			font-size: 24rpx;
			color: red;
		}
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
