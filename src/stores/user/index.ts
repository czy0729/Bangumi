/*
 * 用户 (自己视角)
 *  - accessToken 和登录时在 webview 里获取 cookie 是两套登录状态, 暂时只能分开维护
 *  - 一般 cookie 没多久就过期了
 *
 * @Author: czy0729
 * @Date: 2019-02-21 20:40:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-22 16:42:41
 */
import Action from './action'

const userStore = new Action()

export type UserStoreType = typeof userStore

export default userStore
