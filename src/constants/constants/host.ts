/*
 * @Author: czy0729
 * @Date: 2024-09-02 11:57:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-14 10:47:35
 */

/** 域 */
export const HOST_NAME = 'bgm.tv'

/** 域名 */
export const HOST = `https://${HOST_NAME}` as const

/** 备用域名2 */
export const HOST_2 = 'https://bangumi.tv'

/** 备用域名3 */
export const HOST_3 = 'https://chii.in'

/** Track trending anime with real-time analytics from Bangumi */
export const HOST_NETABA = 'https://netaba.re'

/** jsDelivr */
export const HOST_CDN = 'https://cdn.jsdelivr.net'

/** @deprecated 柠萌瞬间地址 */
export const HOST_NING_MOE = 'https://www.ningmoe.com'

/** @deprecated Anitama api 地址 */
export const HOST_ANITAMA = 'https://app.anitama.net'

/** 动漫之家 */
export const HOST_DMZJ = 'https://mnews.idmzj.com'

/** @deprecated HD 漫画 */
export const HOST_MANGA = 'https://tinygrail.mange.cn/app'

/** 免费图床 */
export const HOST_IMAGE_UPLOAD = 'https://p.sda1.dev'

/** [待废弃] 登录 v1.0 oauth 地址 */
export const URL_OAUTH = `${HOST}/oauth/authorize` as const

/** [待废弃] 登录 v1.0 授权跳转地址 */
export const URL_OAUTH_REDIRECT = `${HOST}/dev/app` as const

/** bgm项目帖子地址 */
export const URL_FEEDBACK = `${HOST}/group/topic/350677` as const

/** 空头像地址 */
export const URL_DEFAULT_AVATAR = '/icon.jpg'

/** 空角色地址 */
export const URL_DEFAULT_MONO = '/info_only.png'

/** 指南 (语雀) */
export const URL_ZHINAN = 'https://www.yuque.com/chenzhenyu-k0epm/znygb4'

/** 关于 */
export const URL_ABOUT = `${URL_ZHINAN}/bw81ax?singleDoc` as const

/** 获取 */
export const URL_RELEASE = `${URL_ZHINAN}/ratl2b?singleDoc` as const

/** 隐私条款 */
export const URL_PRIVACY = `${URL_ZHINAN}/oi3ss2?singleDoc` as const

/** 开发状况 */
export const URL_DEV =
  'https://adaptable-playroom-795.notion.site/2f26b642dc714c4ca4d3e8701072c591?v=fe42d34dbb354e28b5221078780f93bd'

/** 开发问卷 */
export const URL_WENJUAN = 'https://wj.qq.com/s2/9645600/92c2/'

/** APP 网页版 */
export const URL_SPA = 'https://bangumi-app.5t5.top'
