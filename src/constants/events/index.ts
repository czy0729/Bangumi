/*
 * 友盟手动埋点配置
 * @Author: czy0729
 * @Date: 2019-12-17 10:27:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-11 04:48:33
 */
import Discovery from './discovery'
import Timeline from './timeline'
import Home from './home'
import Rakuen from './rakuen'
import User from './user'
import Tinygrail from './tinygrail'
import Other from './other'

/**
 * 跳转: { to: 'Subject', from: 'block', ...other }
 */
export default {
  ...Discovery,
  ...Timeline,
  ...Home,
  ...Rakuen,
  ...User,
  ...Tinygrail,
  ...Other
}
