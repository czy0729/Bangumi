/*
 * 年鉴样式
 * @Author: czy0729
 * @Date: 2019-08-18 22:44:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-21 10:44:19
 */
import _ from '@styles'

const widthSubject = parseInt((_.window.width - 24) / 3)
const widthMono = parseInt((_.window.width - 48) / 4)
const heightMono = widthMono * 1.32
const hiddenStyle = `
  /* 隐藏 */
  .shareBtn,
  #headerNeue2,
  #personalStatsWrapper,
  #personalTabStats,
  #main,
  #dock {
    display: none;
  }
`

/**
 * 样式遍历加上important
 * @param {*} style
 */
function important(style) {
  return style.replace(/;/g, ' !important;')
}

/**
 * 为了美观
 * 1. 修改条目宽度, 每行达到3个
 * 2. 修改人物宽度, 每行达到4个
 * 3. 隐藏部分样式, 使页面更沉浸
 */
export default {
  2018: important(`
    /* 频道 */
    .channelStatsWrapper .columnGrid ul.grid li span.cover,
    .channelStatsWrapper .columnGrid ul.grid li span.cover span.overlay {
      width: ${widthSubject}px;
      height: ${widthSubject}px;
      background-size: ${widthSubject}px;
    }

    /* 人物 */
    .columnGrid ul.grid li.avatar {
      width: ${widthMono}px;
      height: ${heightMono}px;
    }

    /* 标签 */
    #chl_crt span.tags,
    #chl_community span.tags {
      display: block;
      padding: 0 8px;
    }

    ${hiddenStyle}
  `),

  2017: important(`
    /* 频道 */
    .channelStatsWrapper .columnGrid ul.grid li span.cover,
    .channelStatsWrapper .columnGrid ul.grid li span.cover span.overlay {
      width: ${widthSubject - 4}px;
      height: ${widthSubject - 4}px;
      background-size: ${widthSubject - 4}px;
    }

    /* 人物 */
    .columnGrid ul.grid li.avatar {
      width: ${widthMono - 4}px;
      height: ${heightMono - 4}px;
    }

    ${hiddenStyle}
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
      width: ${widthSubject - 4}px;
      height: ${widthSubject - 4}px;
      background-size: ${widthSubject - 4}px;
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
      width: ${widthMono - 4}px;
      height: ${heightMono - 4}px;
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

    ${hiddenStyle}
  `)
}
