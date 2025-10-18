/*
 * @Author: czy0729
 * @Date: 2025-06-27 23:52:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-28 01:25:19
 */
import React from 'react'
import { Flex, Iconfont, Link, Text } from '@components'
import { monoStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import styles from './styles'

import type { Ctx } from '../../types'

function IconPic() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const picTotals = $.subjectKeywords.map(item => monoStore.picTotal(item) || 0)
    let maxIndex = findMaxIndex(picTotals)
    let keyword = ''
    let max = 0

    if (maxIndex !== -1) {
      keyword = $.subjectKeywords[maxIndex]
      max = picTotals[maxIndex]
    }

    if (!keyword) {
      const crtPicTotals = $.crtKeywords.map(item => monoStore.picTotal(item) || 0)
      maxIndex = findMaxIndex(crtPicTotals)
      if (maxIndex !== -1) {
        keyword = $.crtKeywords[maxIndex]
        max = crtPicTotals[maxIndex]
      }
    }

    if (!keyword) {
      const lastStatus = $.status?.[$.status.length - 1]
      if (lastStatus?.sum >= 3000) keyword = $.cn || $.jp
    }

    if (!keyword) return null

    return (
      <Link
        style={styles.touch}
        path='Pic'
        params={{
          name: keyword,
          keywords: [$.cn, $.jp, ...$.crt.map(item => item.name || item.nameJP).slice(0, 5)]
        }}
      >
        <Flex>
          <Text type='sub' size={12}>
            图集{max ? ` (${max > 99 ? '99+' : max})` : ''}
          </Text>
          <Iconfont name='md-navigate-next' />
        </Flex>
      </Link>
    )
  })
}

export default IconPic

function findMaxIndex(arr: number[]) {
  if (!arr.length || arr.every(num => num === 0)) return -1
  return arr.indexOf(Math.max(...arr))
}
