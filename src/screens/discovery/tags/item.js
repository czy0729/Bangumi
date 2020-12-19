/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:46:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-18 16:41:32
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Text, Flex, Heatmap } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'

const width = _.window.contentWidth * 0.2
const marginLeft = (_.window.contentWidth - 4 * width) / 5

function Item({ type, name, nums, index }, { navigation }) {
  const styles = memoStyles()
  let numsText = nums
  if (nums > 1000) {
    numsText = `${formatNumber(nums / 1000, 1)}K`
  }
  const tag = HTMLDecode(name)
  return (
    <Touchable
      style={styles.container}
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

Item.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Item)

const memoStyles = _.memoStyles(_ => ({
  container: {
    marginTop: _.space,
    marginLeft
  },
  item: {
    width,
    height: width,
    backgroundColor: _.colorPlain,
    borderRadius: _.radiusXs,
    borderWidth: _.hairlineWidth,
    borderColor: _.colorBorder
  }
}))
