/*
 * @Author: czy0729
 * @Date: 2026-07-10 06:41:32
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-07-10 06:41:32
 */
import { systemStore } from '@stores'
import { REG_AVATAR, REG_BG, REG_FIXED } from './ds'

/** 将 sign 中的镜像站域名替换为主站域名 */
export function normalizeSign(sign: string): string {
  const { workerProxyDisabled, workerProxy } = systemStore.setting
  if (workerProxyDisabled || !workerProxy) return sign

  const hostname = workerProxy.replace(/https?:\/\//, '').replace(/\/.*$/, '')
  return sign.replace(new RegExp(hostname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), 'bgm.tv')
}

/** 在个人签名中替换或追加 avatar / bg 标签 */
export function buildSign(sign: string, avatar: string, bg: string) {
  let newbio = normalizeSign(sign)

  if (newbio.match(REG_AVATAR)) {
    newbio = newbio.replace(REG_AVATAR, `[avatar]${avatar || ''}[/avatar]`)
  } else {
    newbio += `[color=#444444][size=0][avatar]${avatar || ''}[/avatar][/size][/color]`
  }

  let savedBg = bg || ''
  if (typeof savedBg === 'string' && savedBg.includes('i.pixiv.re')) {
    savedBg = savedBg.replace('/c/540x540_70', '')
  }

  if (newbio.match(REG_BG)) {
    newbio = newbio.replace(REG_BG, `[bg]${savedBg}[/bg]`)
  } else {
    newbio += `[color=#444444][size=0][bg]${savedBg}[/bg][/size][/color]`
  }

  newbio = newbio.replace(REG_FIXED, '')

  // 给没有 [color=#444444] 包裹的 [size=0] 块加上
  newbio = newbio.replace(
    /(?<!\[color=#444444\])\[size=0\]\[(avatar|bg)\][^]*?\[\/\1\]\[\/size\]/g,
    '[color=#444444]$&[/color]'
  )

  return { newbio, bg: savedBg }
}
