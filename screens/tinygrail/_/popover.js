/*
 * @Author: czy0729
 * @Date: 2019-11-17 21:04:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-09 21:52:34
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Iconfont } from '@components'
import { Popover as CompPopover } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'

function Popover({ id }, { navigation }) {
  return (
    <CompPopover
      contentStyle={{
        borderTopRightRadius: 0
      }}
      data={['K线', '买入', '卖出', '资产重组']}
      onSelect={title => {
        switch (title) {
          case 'K线':
            navigation.push('TinygrailTrade', {
              monoId: `character/${id}`
            })
            break
          case '买入':
            navigation.push('TinygrailDeal', {
              monoId: `character/${id}`,
              type: 'bid'
            })
            break
          case '卖出':
            navigation.push('TinygrailDeal', {
              monoId: `character/${id}`,
              type: 'ask'
            })
            break
          case '资产重组':
            navigation.push('TinygrailSacrifice', {
              monoId: `character/${id}`
            })
            break
          default:
            break
        }
      }}
    >
      <Iconfont
        style={styles.extra}
        name='extra'
        color={_.colorTinygrailText}
      />
    </CompPopover>
  )
}

Popover.contextTypes = {
  navigation: PropTypes.object
}

export default observer(Popover)

const styles = StyleSheet.create({
  extra: {
    height: 56,
    paddingVertical: _.md,
    paddingHorizontal: _.sm
  }
})
