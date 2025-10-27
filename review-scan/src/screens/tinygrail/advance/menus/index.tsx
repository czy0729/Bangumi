/*
 * @Author: czy0729
 * @Date: 2020-01-09 16:41:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-20 12:11:07
 */
import React from 'react'
import { Flex } from '@components'
import { ob } from '@utils/decorators'
import { Navigation } from '@types'
import MenuItem from '../menu-item'
import { memoStyles } from './styles'

function Menus({ navigation }: { navigation: Navigation }) {
  const styles = memoStyles()
  return (
    <Flex style={styles.section} wrap='wrap'>
      <MenuItem
        style={styles.bid}
        navigation={navigation}
        title='买入推荐'
        pathname='TinygrailAdvanceAsk'
        icon='md-add-circle-outline'
      />
      <MenuItem
        style={styles.ask}
        navigation={navigation}
        title='卖出推荐'
        pathname='TinygrailAdvanceBid'
        icon='md-remove-circle-outline'
      />
      <MenuItem
        navigation={navigation}
        title='拍卖推荐'
        pathname='TinygrailAdvanceAuction'
        icon='md-gavel'
      />
      <MenuItem
        navigation={navigation}
        title='拍卖推荐 B'
        pathname='TinygrailAdvanceAuction2'
        icon='md-gavel'
      />
      {/* <MenuItem
        navigation={navigation}
        title='献祭推荐'
        pathname='TinygrailAdvanceSacrifice'
        icon='md-workspaces-outline'
      /> */}
      <MenuItem
        navigation={navigation}
        title='低价股'
        pathname='TinygrailAdvanceState'
        icon='md-attach-money'
      />
      <MenuItem
        navigation={navigation}
        title='资金分析'
        pathname='TinygrailTree'
        icon='md-insert-chart-outlined'
      />
    </Flex>
  )
}

export default ob(Menus)
