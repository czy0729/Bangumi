/*
 * @Author: czy0729
 * @Date: 2024-02-10 13:54:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-11 21:16:04
 */
import { rc } from '@utils/dev'
import { timeDiff } from '../utils'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['sponsor', 'Sponsor'] as const

/** 说明文案 */
export function getInfoTexts() {
  return [
    `生存情况：已存活 ${timeDiff()}`,
    '图表根据支持额按比例划分',
    '点击方格隐藏 1 格，若你为支持者长按可进入空间',
    '除此外还有 50 多个支持者没有留名',
    '@senken 提供的 100 刀 iOS 开发账号',
    '@magma 提供的服务器和 OSS 服务',
    '数据不定期更新，感谢各位的支持！'
  ]
}
