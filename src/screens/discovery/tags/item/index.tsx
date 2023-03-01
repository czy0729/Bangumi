/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:46:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 13:15:52
 */
import React from 'react'
import { Touchable, Text, Flex, Heatmap } from '@components'
import { _, systemStore } from '@stores'
import { formatNumber, HTMLDecode, stl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Item({ type, name, nums, index }, { navigation }: Ctx) {
  const styles = memoStyles()
  const { coverRadius } = systemStore.setting
  let numsText = nums
  if (nums > 10000) numsText = `${formatNumber(nums / 10000, 1)}w`

  const num = _.num(4)
  const tag = HTMLDecode(name)
  return (
    <Touchable
      style={stl(
        styles.container,
        (_.isPad || _.isLandscape) && !(index % num) && _.container.left,
        {
          borderRadius: coverRadius
        }
      )}
      animate
      scale={0.85}
      onPress={() => {
        t('标签索引.跳转', {
          to: 'Tag',
          type,
          tag
        })
        navigation.push('Tag', {
          type,
          tag
        })
      }}
    >
      <Flex style={styles.item} direction='column' justify='center'>
        <Text align='center' size={12} bold numberOfLines={3}>
          {tag}
        </Text>
        <Text style={_.mt.xs} type='sub' align='center' size={10}>
          {numsText}
        </Text>
      </Flex>
      {index === 0 && <Heatmap id='标签索引.跳转' />}
    </Touchable>
  )
}

export default obc(Item)
