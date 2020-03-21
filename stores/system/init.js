/*
 * @Author: czy0729
 * @Date: 2019-07-13 14:00:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-21 17:37:43
 */
import { IOS, VERSION_GITHUB_RELEASE } from '@constants'
import {
  MODEL_SETTING_QUALITY,
  MODEL_SETTING_TRANSITION,
  MODEL_INITIAL_PAGE
} from '@constants/model'

export const NAMESPACE = 'System'

// -------------------- init --------------------
export const INIT_SETTING = {
  quality: MODEL_SETTING_QUALITY.getValue('默认'), // 图片质量
  cnFirst: true, // 是否中文优先
  // autoFetch: true, // 切换页面自动请求
  speech: true, // Bangumi娘话语
  tinygrail: !IOS, // 小圣杯是否开启 (安卓默认开, iOS因为审核问题默认不开)
  avatarRound: true, // 头像是否圆形
  heatMap: true, // 章节热力图
  ripple: false, // 点击水纹效果
  imageTransition: true, // 图片渐出
  iosMenu: false, // iOS风格弹出菜单
  hideScore: false, // 隐藏他人评分
  cdn: true, // CDN加速
  transition: MODEL_SETTING_TRANSITION.getValue('水平'), // 切页动画
  initialPage: MODEL_INITIAL_PAGE.getValue('进度') // 启动页
}

export const INIT_RELEASE = {
  name: VERSION_GITHUB_RELEASE,
  downloadUrl: ''
}

export const INIT_IMAGE_VIEWER = {
  visible: false,
  imageUrls: []
}
