/*
 * @Author: czy0729
 * @Date: 2019-07-13 14:00:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-07 15:51:31
 */
import { GITHUB_RELEASE_VERSION } from '@constants'
import { MODEL_SETTING_QUALITY } from '@constants/model'

export const NAMESPACE = 'System'

// -------------------- init --------------------
export const INIT_SETTING = {
  quality: MODEL_SETTING_QUALITY.getValue('默认'), // 图片质量
  cnFirst: true, // 是否中文优先
  autoFetch: true, // 切换页面自动请求
  speech: true, // Bangumi娘话语
  tinygrail: false, // 小圣杯是否开启
  avatarRound: true, // 头像是否圆形
  heatMap: true // 章节热力图
}

export const INIT_RELEASE = {
  name: GITHUB_RELEASE_VERSION,
  downloadUrl: ''
}

export const INIT_IMAGE_VIEWER = {
  visible: false,
  imageUrls: []
}
