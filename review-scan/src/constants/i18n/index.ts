/*
 * i18n 初期设计
 * @Author: czy0729
 * @Date: 2022-04-28 14:23:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-14 15:48:52
 */
import { t } from './utils'

/** https://github.com/czy0729/Bangumi/issues/60 */
export default {
  contact: () => t('联系', '聯絡'),
  login: () => t('登录', '登入'),
  logout: () => t('退出登录', '登出'),
  setting: () => t('设置', '設定'),
  cache: () => t('缓存', '快取'),
  initial: () => t('默认', '預設')
}
