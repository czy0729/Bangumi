/*
 * i18n 初期设计
 *
 * @Author: czy0729
 * @Date: 2022-04-28 14:23:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-20 10:43:19
 */
import { getSystemStoreAsync } from '@utils/async'

const _ = (s?: string, t?: string): string =>
  getSystemStoreAsync().setting.s2t ? t : s

/**
 * https://github.com/czy0729/Bangumi/issues/60
 */
export default {
  contact: () => _('联系', '聯絡'),
  login: () => _('登录', '登入'),
  logout: () => _('退出登录', '登出'),
  setting: () => _('设置', '設定'),
  cache: () => _('缓存', '快取'),
  initial: () => _('默认', '預設')
}
