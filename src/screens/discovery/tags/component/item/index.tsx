/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:46:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-17 12:55:20
 *
 * 标签条目: 名称高亮 + 条目数/排名
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Highlight, Squircle, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { formatNumber, HTMLDecode, stl } from '@utils'
import { t } from '@utils/fetch'
import { getTyperankNums } from '../../utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Item({ type, name, nums, index }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()
  const { width, height } = styles.item

  const { rec, filter } = $.state
  const num = _.num(4)
  const tag = HTMLDecode(name)

  let numsText: string | number = nums
  if (rec) {
    numsText = getTyperankNums(type, name)
  } else if (Number(nums) > 10000) {
    numsText = `${formatNumber(Number(nums) / 10000, 1)}w`
  }

  const handlePress = useCallback(() => {
    if (rec && numsText) {
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

    t('标签索引.跳转', {
      to: 'Tag',
      type,
      tag
    })

    navigation.push('Tag', {
      type,
      tag
    })
  }, [rec, numsText, navigation, type, tag])

  return (
    <Touchable
      style={stl(
        styles.container,
        (_.isPad || _.isLandscape) && !(index % num) && _.container.left
      )}
      animate
      scale={0.85}
      onPress={handlePress}
    >
      <Squircle width={width} height={height} radius>
        <Flex style={styles.item} direction='column' justify='center'>
          <Highlight align='center' size={12} bold numberOfLines={3} value={filter}>
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

export default observer(Item)
