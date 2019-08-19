/*
 * 年鉴样式
 * @Author: czy0729
 * @Date: 2019-08-18 22:44:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-18 22:45:26
 */
import _ from '@styles'

const widthSubject = parseInt((_.window.width - 24) / 3)
const widthMono = parseInt((_.window.width - 48) / 4)
const heightMono = widthMono * 1.2

export default {
  2018: {
    subject: `
      .channelStatsWrapper .columnGrid ul.grid li span.cover,
      .channelStatsWrapper .columnGrid ul.grid li span.cover span.overlay {
        width: ${widthSubject}px !important;
        height: ${widthSubject}px !important;
        background-size: ${widthSubject}px !important;
      }`,
    mono: `
      .columnGrid ul.grid li.avatar {
        width: ${widthMono}px !important;
        height:${heightMono}px !important;
      }`,
    hidden: `
      #headerNeue2,
      #personalTabStats,
      .shareBtn,
      #dock {
        display:none !important;
      }`
  },
  2017: {
    subject: `
      .channelStatsWrapper .columnGrid ul.grid li span.cover,
      .channelStatsWrapper .columnGrid ul.grid li span.cover span.overlay {
        width: ${widthSubject - 4}px !important;
        height: ${widthSubject - 4}px !important;
        background-size: ${widthSubject - 4}px !important;
      }`,
    mono: `
      .columnGrid ul.grid li.avatar {
        width: ${widthMono - 4}px !important;
        height: ${heightMono - 4}px !important;
      }`,
    hidden: `
      #headerNeue2,
      #personalTabStats,
      .shareBtn,
      #dock {
        display:none !important;
      }`
  }
}
