/*
 * 年鉴样式
 * @Author: czy0729
 * @Date: 2019-08-18 22:44:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-20 16:00:40
 */
import _ from '@styles'

const widthSubject = parseInt((_.window.width - 24) / 3)
const widthMono = parseInt((_.window.width - 48) / 4)
const heightMono = widthMono * 1.2

/**
 * 为了美观
 * 1. 修改条目宽度, 每行达到3个
 * 2. 修改人物宽度, 每行达到4个
 * 3. 隐藏部分样式, 使页面更沉浸
 */
export default {
  2018: `
    .channelStatsWrapper .columnGrid ul.grid li span.cover,
    .channelStatsWrapper .columnGrid ul.grid li span.cover span.overlay {
      width: ${widthSubject}px !important;
      height: ${widthSubject}px !important;
      background-size: ${widthSubject}px !important;
    }

    .columnGrid ul.grid li.avatar {
      width: ${widthMono}px !important;
      height:${heightMono}px !important;
    }

    #headerNeue2,
    #personalTabStats,
    .shareBtn,
    #dock {
      display:none !important;
    }
  `,

  2017: `
    .channelStatsWrapper .columnGrid ul.grid li span.cover,
    .channelStatsWrapper .columnGrid ul.grid li span.cover span.overlay {
      width: ${widthSubject - 4}px !important;
      height: ${widthSubject - 4}px !important;
      background-size: ${widthSubject - 4}px !important;
    }

    .columnGrid ul.grid li.avatar {
      width: ${widthMono - 4}px !important;
      height: ${heightMono - 4}px !important;
    }

    #headerNeue2,
    #personalTabStats,
    .shareBtn,
    #dock {
      display:none !important;
    }
  `,

  2016: `

  `
}
