/*
 * @Author: czy0729
 * @Date: 2023-03-12 18:50:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-12 19:23:11
 */
import { toCN, toJP } from '@utils'
import { OnAir } from './types'

/** 云端 onAir 爬虫数据信息补全 */
export function fixedOnAir(onAir: OnAir) {
  for (const subjectId in onAir) {
    if (!Number(subjectId)) continue

    const target = onAir[subjectId] as OnAir[number]
    if (!target || target?.custom) continue

    // 都为空代表并没有找到放送数据, 只有条目项占位
    if (target.timeCN === '' && target.timeJP === '') continue

    // 因信息可能不全, CN 与 JP 的时间进行互相转换补全
    if (target.timeCN === '' && target.timeJP) {
      onAir[subjectId] = {
        ...target,
        ...toCN(target.weekDayJP, target.timeJP)
      }
    } else if (target.timeJP === '' && target.timeCN) {
      onAir[subjectId] = {
        ...target,
        ...toJP(target.weekDayCN, target.timeCN)
      }
    }
  }

  return onAir
}
