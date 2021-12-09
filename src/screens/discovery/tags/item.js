/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:46:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-09 18:39:21
 */
import React from 'react'
import { Touchable, Text, Flex, Heatmap } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'

function Item({ type, name, nums, num, index }, { navigation }) {
  const styles = memoStyles()
  let numsText = nums
  if (nums > 10000) numsText = `${formatNumber(nums / 10000, 1)}w`

  const tag = HTMLDecode(name)
  return (
    <Touchable
      style={[
        styles.container,
        (_.isPad || _.isLandscape) && !(index % num) && _.container.left
      ]}
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
        <Text align='center' size={12} bold>
          {tag}
        </Text>
        <Text style={_.mt.xs} type='sub' align='center' size={11}>
          {numsText}
        </Text>
      </Flex>
      {index === 0 && <Heatmap id='标签索引.跳转' />}
    </Touchable>
  )
}

export default obc(Item)

const memoStyles = _.memoStyles(() => {
  let num = 4
  if (_.isPad) num += 1
  if (_.isLandscape) num += 1
  const gridStyles = _.grid(num)
  return {
    container: {
      marginTop: _.space,
      marginLeft: gridStyles.marginLeft
    },
    item: {
      width: gridStyles.width,
      height: gridStyles.width,
      backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
      borderRadius: _.radiusXs,
      borderWidth: _.hairlineWidth,
      borderColor: _.colorBorder
    }
  }
})
