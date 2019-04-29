/*
 * 开发调试
 * @Author: czy0729
 * @Date: 2019-03-26 18:37:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-28 05:04:49
 */
import { date } from './index'

/**
 * 字符串填充
 * @version 171011 1.0
 * @param {*} str
 * @param {*} len
 */
export function fill(str, len = 32) {
  let _str = str
  if (_str.length > len) {
    return _str
  }
  for (let i = _str.length; i < len; i += 1) {
    _str += ' '
  }
  return _str
}

/**
 * 测试log
 * @version 171024 0.1
 * @version 181101 1.0 测试环境才显示
 * @param {String} type  消息类型
 * @param {String} key   消息键
 * @param {Any}    value 消息值
 */
export function log(type = '', key = '', value = '', ...other) {
  const res = [type, '\n', key, '\n', fill(value, 12)]
  if (other && other.length) {
    res.push('\n', other)
  }
  res.push('\n', '---------------------------------------------')
  console.info(...res)
}
