/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:46:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:08:40
 */
import React from 'react'
import { Flex, Heatmap, Highlight, Squircle, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { formatNumber, HTMLDecode, stl } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import { getTyperankNums } from '../../utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Item({ type, name, nums, index }) {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const { width, height } = styles.item

  let numsText = nums
  if ($.state.rec) {
    numsText = getTyperankNums(type, name)
  } else {
    if (nums > 10000) numsText = `${formatNumber(nums / 10000, 1)}w`
  }

  const num = _.num(4)
  const tag = HTMLDecode(name)
  return (
    <Touchable
      style={stl(
        styles.container,
        (_.isPad || _.isLandscape) && !(index % num) && _.container.left
      )}
      animate
      scale={0.85}
      onPress={() => {
        if ($.state.rec && numsText) {
          t('标签索引.跳转', {
            to: 'Typerank',
            type,
            tag
          })
          navigation.push('Typerank', {
            type,
            tag
          })
          return
        }

        navigation.push('Tag', {
          type,
          tag
        })

        t('标签索引.跳转', {
          to: 'Tag',
          type,
          tag
        })
      }}
    >
      <Squircle width={width} height={height} radius>
        <Flex style={styles.item} direction='column' justify='center'>
          <Highlight align='center' size={12} bold numberOfLines={3} value={$.state.filter}>
            {tag}
          </Highlight>
          <Text style={_.mt.xs} type='sub' align='center' size={10}>
            {numsText || '--'}
          </Text>
        </Flex>
        {index === 0 && <Heatmap id='标签索引.跳转' />}
      </Squircle>
    </Touchable>
  )
}

export default ob(Item, COMPONENT)
