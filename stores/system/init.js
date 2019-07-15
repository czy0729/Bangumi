/*
 * @Author: czy0729
 * @Date: 2019-07-13 14:00:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-15 11:07:14
 */
import { GITHUB_RELEASE_VERSION } from '@constants'
import { MODEL_SETTING_QUALITY } from '@constants/model'

export const NAMESPACE = 'System'

// -------------------- init --------------------
export const INIT_SETTING = {
  quality: MODEL_SETTING_QUALITY.getValue('默认'), // 图片质量
  cnFirst: true, // 是否中文优先
  autoFetch: true, // 切换页面自动请求
  quote: true, // 帖子展开引用
  speech: true // Bangumi娘话语
}

export const INIT_RELEASE = {
  name: GITHUB_RELEASE_VERSION,
  downloadUrl: ''
}

export const INIT_IMAGE_VIEWER = {
  visible: false,
  imageUrls: []
}
