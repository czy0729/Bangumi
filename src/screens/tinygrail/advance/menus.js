/*
 * @Author: czy0729
 * @Date: 2020-01-09 16:41:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:05:06
 */
import React from 'react'
import { Flex } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import MenuItem from './menu-item'

function Menus({ navigation }) {
  const styles = memoStyles()
  return (
    <Flex style={styles.section} wrap='wrap'>
      <MenuItem
        style={styles.bid}
        navigation={navigation}
        title='卖一推荐'
        pathname='TinygrailAdvanceAsk'
        icon='bid'
      />
      <MenuItem
        style={styles.ask}
        navigation={navigation}
        title='买一推荐'
        pathname='TinygrailAdvanceBid'
        icon='ask'
      />
      <MenuItem
        navigation={navigation}
        title='拍卖推荐'
        pathname='TinygrailAdvanceAuction'
        icon='auction'
      />
      <MenuItem
        navigation={navigation}
        title='拍卖推荐 (塔)'
        pathname='TinygrailAdvanceAuction2'
        icon='auction'
      />
      <MenuItem
        navigation={navigation}
        title='献祭推荐'
        pathname='TinygrailAdvanceSacrifice'
        icon='app'
      />
      <MenuItem
        navigation={navigation}
        title='资金分析'
        pathname='TinygrailTree'
        icon='fen-xi'
      />
    </Flex>
  )
}

export default obc(Menus)

const memoStyles = _.memoStyles(_ => ({
  section: {
    paddingVertical: _.space,
    marginLeft: _.wind
  },
  bid: {
    backgroundColor: _.colorDepthBid
  },
  ask: {
    backgroundColor: _.colorDepthAsk
  }
}))
