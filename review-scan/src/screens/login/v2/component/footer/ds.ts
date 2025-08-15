/*
 * @Author: czy0729
 * @Date: 2025-03-22 17:21:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-22 20:10:59
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Footer')

export const TEXT_REGISTER =
  `声明: 本客户端的性质为第三方，只提供显示数据和简单的操作，没有修复和改变网站业务的能力。\n
  在移动端浏览器注册会经常遇到验证码错误，碰到错误建议在浏览器里使用 [电脑版UA]，再不行推荐使用电脑Chrome注册。\n
  注册后会有 [激活码] 发到邮箱，经观察过只会发送一次，请务必在激活有效时间内激活，否则这个注册邮箱就废了。\n
  输入激活码前，若下方提示出现文字 [服务不可用] 的请务必等待到浏览器加载条完成再操作，否则可能一直会提示激活码错误。
` as const
