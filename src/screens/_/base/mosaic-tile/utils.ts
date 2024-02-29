/*
 * @Author: czy0729
 * @Date: 2022-08-20 15:55:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-20 15:56:51
 */
import { date } from '@utils'

export function getDates(weeks = 52) {
  const stime = +new Date() - (new Date().getDay() + weeks * 7) * 24 * 60 * 60 * 1000
  return new Array((weeks + 1) * 7)
    .fill(0)
    .map((_, i) => date('Y-m-d', +new Date(stime + i * 24 * 60 * 60 * 1000) / 1000))
    .reverse()
}
