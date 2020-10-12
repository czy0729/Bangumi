/*
 * @Author: czy0729
 * @Date: 2019-07-13 14:00:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-12 15:09:21
 */
import { VERSION_GITHUB_RELEASE } from '@constants'
import {
  MODEL_SETTING_QUALITY,
  MODEL_SETTING_TRANSITION,
  MODEL_SETTING_INITIAL_PAGE,
  MODEL_SETTING_HOME_LAYOUT,
  MODEL_SETTING_HOME_SORTING
} from '@constants/model'

export const NAMESPACE = 'System'

// -------------------- init --------------------
export const INIT_SETTING = {
  // autoFetch: true, // 切换页面自动请求 (废弃)
  avatarRound: true, // 头像是否圆形
  cdn: true, // CDN加速
  cnFirst: true, // 是否中文优先
  filter18x: false, // 屏蔽18x条目
  filterDefault: false, // 屏蔽默认头像用户相关信息
  flat: true, // 扁平化
  heatMap: true, // 章节热力图
  hideScore: false, // 隐藏他人评分
  imageTransition: false, // 图片渐出
  iosMenu: false, // iOS风格弹出菜单
  itemShadow: false, // 首页收藏阴影
  katakana: false, // 片假名终结者
  ripple: false, // 点击水纹效果
  speech: true, // Bangumi娘话语
  vibration: true, // 震动反馈
  tinygrail: false, // 小圣杯是否开启
  autoColorScheme: true, // 黑暗模式跟随系统
  coverThings: true, // 封面拟物
  showGame: false, // 首页显示游戏分类
  showThumbs: true, // 条目页面展开预览图
  homeLayout: MODEL_SETTING_HOME_LAYOUT.getValue('列表'), // 首页收藏布局
  homeSorting: MODEL_SETTING_HOME_SORTING.getValue('APP'), // 首页收藏排序
  initialPage: MODEL_SETTING_INITIAL_PAGE.getValue('进度'), // 启动页
  quality: MODEL_SETTING_QUALITY.getValue('默认'), // 图片质量
  transition: MODEL_SETTING_TRANSITION.getValue('水平') // 切页动画
}

export const INIT_RELEASE = {
  name: VERSION_GITHUB_RELEASE,
  downloadUrl: ''
}

export const INIT_IMAGE_VIEWER = {
  visible: false,
  imageUrls: []
}
