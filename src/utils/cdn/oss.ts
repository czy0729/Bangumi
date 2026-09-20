/*
 * @Author: czy0729
 * @Date: 2022-05-23 07:22:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-21 06:08:05
 *
 * MAGMA CDN
 */
import Crypto from '@utils/thirdParty/crypto'

/** CDN V2 */
let CDN_MAGMA: string

function initCDN() {
  if (!CDN_MAGMA) {
    CDN_MAGMA = Crypto.get(
      'U2FsdGVkX1+8XichzWKyMJq48Ovm7Py40o5JPSjNIH/MqOGILJbEY+ZBXG+d7TM5JHxxP0vuinOgBs4qCt7pyQ=='
    ) as string
  }
  return !!CDN_MAGMA
}

export { CDN_MAGMA }

const REG_COVER = /\/(c|l)\//

/** MAGMA CDN */
export const CDN_OSS_MAGMA_POSTER = <T>(
  src?: T,
  prefix: 'bgm_poster_100' | 'bgm_poster_200' | 'bgm_poster' | string = 'bgm_poster'
): T | string => {
  if (
    typeof src !== 'string' ||
    src === '' ||
    !REG_COVER.test(src) ||
    /\/(photo|user|icon)\/|_(crt|prsn)_/.test(src)
  ) {
    return src as T
  }

  const poster = src.split(REG_COVER)?.[2] || ''
  if (!poster || !initCDN()) return src

  return `${CDN_MAGMA}/pic/cover/l/${poster.split('?')[0]}${prefix ? `/${prefix}` : ''}`
}

/** MAGMA MONO CDN */
export const CDN_OSS_MAGMA_MONO = <T>(src?: T): T | string => {
  if (typeof src !== 'string' || src === '') return src as T

  const mono = (src.split('.jpg')?.[0] || '').split('/pic/')?.[1] || ''
  if (!mono || !initCDN()) return src

  return `${CDN_MAGMA}/pic/${mono.replace('/s/', '/g/')}.jpg`
}

/** MAGMA PIC CDN */
export const CDN_OSS_MAGMA_PIC = <T>(src?: T): T | string => {
  if (typeof src !== 'string' || src === '' || !src.includes('/pic/')) return src as T

  const pic = (src.split('.jpg')?.[0] || '').split('/pic/')?.[1] || ''
  if (!pic || !initCDN()) return src

  return `${CDN_MAGMA}/pic/${pic}.jpg`
}
