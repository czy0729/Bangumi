/*
 * @Author: czy0729
 * @Date: 2025-06-27 23:52:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-28 01:25:19
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { monoStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import styles from './styles'

function IconPic() {
  const { $, navigation } = useStore<Ctx>()

  const picTotals = $.subjectKeywords.map(item => monoStore.picTotal(item) || 0)
  const maxIndex = findMaxIndex(picTotals)
  let keyword = ''
  let max = 0
  if (maxIndex !== -1) {
    keyword = $.subjectKeywords[maxIndex]
    max = picTotals[maxIndex]
  }

  if (!keyword) {
    const crtPicTotals = $.crtKeywords.map(item => monoStore.picTotal(item) || 0)
    const maxIndex = findMaxIndex(crtPicTotals)
    if (maxIndex !== -1) {
      keyword = $.crtKeywords[maxIndex]
      max = crtPicTotals[maxIndex]
    }
  }

  if (!keyword) {
    const { length } = $.status
    if ($.status?.[length - 1]?.sum >= 3000) keyword = $.cn || $.jp
  }

  if (!keyword) return null

  return (
    <Touchable
      style={styles.touch}
      onPress={() => {
        navigation.push('Pic', {
          name: keyword,
          keywords: [$.cn, $.jp]
        })
      }}
    >
      <Flex>
        <Text type='sub' size={12}>
          图集{max ? ` (${max > 99 ? '99+' : max})` : ''}
        </Text>
        <Iconfont name='md-navigate-next' />
      </Flex>
    </Touchable>
  )
}

export default ob(IconPic)

function findMaxIndex(arr: number[]) {
  if (arr.length === 0 || arr.every(num => num === 0)) return -1

  return arr.indexOf(Math.max(...arr))
}
