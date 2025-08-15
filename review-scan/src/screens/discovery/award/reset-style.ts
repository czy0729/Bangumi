/*
 * 年鉴样式
 * @Author: czy0729
 * @Date: 2019-08-18 22:44:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-12 03:56:18
 */
const W_SUBJECT = '30vw'
const W_SUBJECT_SM = '28vw'
const W_MONO = '20vw'
const H_MONO = `${20 * 1.32}vw`

/** 样式遍历加上important */
function important(style: string) {
  return style.replace(/;/g, ' !important;')
}

/**
 * 为了美观
 *  - 1. 修改条目宽度, 每行达到3个
 *  - 2. 修改人物宽度, 每行达到4个
 *  - 3. 隐藏部分样式, 使页面更沉浸
 */
export default {
  2023: important(`
    #awardWrapper {
      padding-top: 0;
    }
  `),
  2020: important(`
    .pattern_bgm38:before {
      animation: initial;
    }
  `),
  2019: important(`
    /* 频道 */
    .channelStatsWrapper .columnGrid ul.grid li span.cover,
    .channelStatsWrapper .columnGrid ul.grid li span.cover span.overlay {
      width: ${W_SUBJECT};
      height: ${W_SUBJECT};
      background-size: ${W_SUBJECT};
    }

    /* 人物 */
    .columnGrid ul.grid li.avatar {
      width: ${W_MONO};
      height: ${H_MONO};
    }

    /* 标签 */
    #chl_crt span.tags,
    #chl_community span.tags {
      display: block;
      padding: 0 8px;
    }
  `),
  2018: important(`
    /* 频道 */
    .channelStatsWrapper .columnGrid ul.grid li span.cover,
    .channelStatsWrapper .columnGrid ul.grid li span.cover span.overlay {
      width: ${W_SUBJECT};
      height: ${W_SUBJECT};
      background-size: ${W_SUBJECT};
    }
    /* 人物 */
    .columnGrid ul.grid li.avatar {
      width: ${W_MONO};
      height: ${H_MONO};
    }
    /* 标签 */
    #chl_crt span.tags,
    #chl_community span.tags {
      display: block;
      padding: 0 8px;
    }
  `),
  2017: important(`
    /* 频道 */
    .channelStatsWrapper .columnGrid ul.grid li span.cover,
    .channelStatsWrapper .columnGrid ul.grid li span.cover span.overlay {
      width: ${W_SUBJECT};
      height: ${W_SUBJECT};
      background-size: ${W_SUBJECT};
    }
    /* 人物 */
    .columnGrid ul.grid li.avatar {
      width: ${W_MONO};
      height: ${H_MONO};
    }
  `),
  2016: important(`
    /* 文档 */
    html,
    body {
      width: 100%;
      overflow-x: hidden;
    }
    /* 大标题 */
    #headerVertical {
      width: 100%;
    }
    /* 个人 */
    #personalStatsWrapper .columns,
    #personalStatsWrapper .columnStats {
      width: 100%;
    }
    /* 频道 */
    .channelStatsWrapper .columns {
      width: 100%;
    }
    .channelStatsWrapper .columnGrid div.inner {
      margin: 0 0 0 8px;
    }
    .channelStatsWrapper .columnGrid ul.grid li span.cover {
      width: ${W_SUBJECT};
      height: ${W_SUBJECT};
      background-size: ${W_SUBJECT};
    }
    .channelStatsWrapper .columns {
      margin-top: 0;
    }
    .channelStatsWrapper ul.listRank li,
    .channelStatsWrapper ul.listRank li dl dd {
      width: 100%;
    }
    .channelStatsWrapper div.topicRank h3 {
      padding: 0 5px;
    }
    .channelStatsWrapper div.topicRank ul li {
      width: 100%;
      padding-left: 8px;
    }
    .channelStatsWrapper div.topicRank span.tags {
      display: block;
      padding: 0 8px;
    }
    /* 人物 */
    .columnGrid ul.grid li.avatar {
      width: ${W_MONO};
      height: ${H_MONO};
    }
    /* 帖子 */
    .channelStatsWrapper div.topicRank ul li span.cover {
      margin-right: 8px;
    }
    /* 底部 */
    #awardOMT h2.channelSbjTitle {
      padding: 100px 0;
      font-size: 36px;
    }
    #awardFooter .inner {
      padding: 20px 8px;
      width: 100%;
      font-size: 14px;
    }
    #awardSpecial {
      padding: 16px 0 50px 16px;
    }
    #awardSpecial h2.channelSbjTitle {
      padding: 50px 0 0 0;
    }
    #awardSpecial p.bubble {
      width: 80%;
    }
    #awardSpecial p.sign {
      width: 100%;
    }
  `),
  2015: important(`
    /* 文档 */
    html,
    body {
      width: 100%;
      overflow-x: hidden;
    }
    #awardWrapper,
    #chl_community {
      background: #f3f2ee;
    }
    /* 大标题 */
    #headerVertical {
      display: none;
    }
    #headerVertical {
      width: 100%;
    }
    #headerAward h1 {
      width: 100%;
      background-size: contain;
    }
    /* 频道 */
    .channelStatsWrapper {
      padding-top: 20px;
      border: 10px solid #f3f2ee;
    }
    .channelStatsWrapper .columns {
      width: 100%;
      padding: 0;
    }
    h2.channelSbjTitle {
      display: none;
    }
    .channelStatsWrapper .columnGrid div.inner {
      margin: 8px;
    }
    .channelStatsWrapper .columnGrid h3.chl {
      font-size: 28px;
    }
    .channelStatsWrapper .columnGrid ul.grid li span.cover {
      width: ${W_SUBJECT_SM};
      height: ${W_SUBJECT_SM};
      background-size: ${W_SUBJECT_SM};
      border: 0;
    }
    .channelStatsWrapper .columnGrid h3,
    .channelStatsWrapper ul.listRank li dl dt {
      animation: initial;
    }
    /* 章节 */
    .channelStatsWrapper div.topicRank h3 {
      padding: 0 5px;
    }
    .channelStatsWrapper div.topicRank ul li {
      width: 100%;
      padding: 0 8px;
    }
    .channelStatsWrapper div.topicRank ul li span.cover {
      margin-right: 8px;
      border: 0;
    }
    /* 标签 */
    .tags {
      display: block;
      padding: 0 8px;
    }
    /* 人物 */
    .columnGrid ul.grid li.avatar {
      width: ${W_MONO};
      height: ${W_MONO};
    }
    .columnGrid ul.grid li span.avatar {
      width: ${W_MONO};
      height: ${W_MONO};
      background-size: contain;
    }
    .columnGrid ul.grid li.avatar span.title,
    .columnGrid ul.grid li.avatar small.fade {
      width: 100%;
    }
    .columnGrid ul.grid li span.avatar {
      border: 0;
    }
    /* 条目创建 */
    .columnGrid ul.grid li.avatar span.title {
      color: #444;
    }
    #chl_community a,
    #chl_community span.tip_i {
      color: #444;
    }
    // #headerAward div.musume,
    #awardFooter {
      display: none;
    }
  `),
  2014: important(`
    /* 文档 */
    html,
    body {
      width: 100%;
      overflow-x: hidden;
    }
    #headerVertical {
      width: 100%;
      padding: 40px 0;
    }
    /* 章节 */
    .channelStatsWrapper .columns {
      width: 100%;
    }
    h2.channelSbjTitle {
      display: none;
    }
    .channelStatsWrapper .columnGrid div.inner {
      margin: 8px;
    }
    .channelStatsWrapper div.topicRank ul li span.cover {
      margin-right: 8px;
    }
    .channelStatsWrapper .columnGrid ul.grid li span.cover {
      width: ${W_SUBJECT_SM};
      height: ${W_SUBJECT_SM};
      background-size: ${W_SUBJECT_SM};
    }
    /* 关注榜 */
    .channelStatsWrapper ul.listRank li,
    .channelStatsWrapper ul.listRank li dl dd {
      width: 100%;
    }
    /* 年度章节 */
    .channelStatsWrapper div.topicRank h3 {
      padding: 0 8px;
    }
    .channelStatsWrapper div.topicRank ul li {
      width: 100%;
      padding: 0 8px;
    }
    /* 标签 */
    .tags {
      display: block;
      padding: 0 8px;
    }
    /* 人物 */
    .columnGrid ul.grid li.avatar {
      width: ${W_MONO};
      height: ${W_MONO};
    }
    .columnGrid ul.grid li span.avatar {
      width: ${W_MONO};
      height: ${W_MONO};
      background-size: contain;
    }
    .columnGrid ul.grid li.avatar span.title,
    .columnGrid ul.grid li.avatar small.fade {
      width: 100%;
    }
  `),
  2013: important(`
    /* 文档 */
    html,
    body {
      width: 100%;
      overflow-x: hidden;
    }
    /* 章节 */
    .channelStatsWrapper {
      padding-top: 40px;
    }
    .channelStatsWrapper .columns {
      width: 100%;
      padding: 0;
    }
    h2.channelSbjTitle {
      display: none;
    }
    .channelStatsWrapper .columnGrid div.inner {
      margin: 8px;
    }
    .channelStatsWrapper .columnGrid ul.grid li span.cover {
      width: ${W_SUBJECT_SM};
      height: ${W_SUBJECT_SM};
      background-size: ${W_SUBJECT_SM};
      border: 0;
    }
    /* 榜单 */
    .channelStatsWrapper ul.listRank li {
      width: 100%;
    }
    .channelStatsWrapper ul.listRank li dl dd {
      width: 100%;
    }
    /* 标签 */
    .tags {
      display: block;
      padding: 0 8px;
    }
    /* 人物 */
    .columnGrid ul.grid li.avatar {
      width: ${W_MONO};
      height: ${W_MONO};
    }
    .columnGrid ul.grid li span.avatar {
      width: ${W_MONO};
      height: ${W_MONO};
      background-size: contain;
    }
    .columnGrid ul.grid li.avatar span.title,
    .columnGrid ul.grid li.avatar small.fade {
      width: 100%;
    }
    .columnGrid ul.grid li span.avatar {
      border: 0;
    }
  `),
  2012: important(`
    /* 文档 */
    html,
    body {
      width: 100%;
      overflow-x: hidden;
    }
    #headerAward h1 {
      padding: 20px 0;
      background-size: contain;
    }
    #awardNav {
      display: none;
    }
    /* 章节 */
    .channelStatsWrapper .columns {
      width: 100%;
      padding: 0;
    }
    .channelStatsWrapper .columnGrid {
      margin: 8px;
    }
    .channelStatsWrapper .columnGrid ul.grid li span.cover {
      width: ${W_SUBJECT_SM};
      height: ${W_SUBJECT_SM};
      background-size: ${W_SUBJECT_SM};
    }
    /* 榜单 */
    .channelStatsWrapper ul.listRank li {
      width: 100%;
    }
    .channelStatsWrapper ul.listRank li dl dd {
      width: 100%;
    }
    /* 标签 */
    .tags {
      display: block;
      padding: 0 8px;
    }
    /* 人物 */
    .columnGrid ul.grid li.avatar {
      width: ${W_MONO};
      height: ${W_MONO};
    }
    .columnGrid ul.grid li span.avatar {
      width: ${W_MONO};
      height: ${W_MONO};
      background-size: contain;
    }
    .columnGrid ul.grid li.avatar span.title,
    .columnGrid ul.grid li.avatar small.fade {
      width: 100%;
    }
  `),
  2011: important(`
    /* 文档 */
    html,
    body {
      width: 100%;
      overflow-x: hidden;
    }
    /* 榜单 */
    .channelStatsWrapper .columns {
      padding: 0;
      width: 100%;
    }
    .channelStatsWrapper .columnGrid {
      width: 100%;
      margin: 0;
    }
    .channelStatsWrapper .columnGrid h3 {
      margin: 0;
      padding: 8px;
    }
    .channelStatsWrapper .columnGrid ul.grid {
      padding: 0 8px;
    }
    .channelStatsWrapper .columnGrid ul.grid li span.cover {
      width: ${W_SUBJECT_SM};
      height: ${W_SUBJECT_SM};
      background-size: ${W_SUBJECT_SM};
    }
    /* 章节 */
    .channelStatsWrapper ul.listRank li {
      width: 100%;
    }
    .channelStatsWrapper ul.listRank li dl dd {
      width: 100%;
    }
    /* 标签 */
    .tip_i {
      display: block;
      padding: 8px;
    }
    /* 人物 */
    .channelStatsWrapper .columnGrid ul.grid li span.avatar {
      width: ${W_MONO};
      height: ${W_MONO};
      background-size: ${W_MONO};
    }
    .channelStatsWrapper .columnGrid ul.grid li span.avatar span.overlay {
      width: 100%;
      height: 100%;
    }
  `),
  2010: important(`
    /* 文档 */
    html,
    body {
      width: 100%;
      overflow-x: hidden;
    }
    #headerAward div.inner {
      width: 100%;
    }
    /* 榜单 */
    .columnsAward {
      width: 100%;
    }
    #columnChartSubject {
      width: 100%;
      padding: 8px;
    }
    ul.chartTopList li {
      padding-right: 0;
      margin-right: 20px;
    }
    ul.chartTopList li img.cover {
      width: ${W_SUBJECT_SM};
      height: ${W_SUBJECT_SM};
    }
    ul.chartSecList li {
      width: 50%;
    }
    #columnChartSubject a.outerlink {
      display: none;
    }
    /* 章节 */
    #columnChartUser {
      width: 100%;
    }
    /* 标签 */
    .tip_i {
      display: block;
      padding: 8px;
    }
  `)
}
