/*
 * @Author: czy0729
 * @Date: 2020-01-09 16:41:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-09 18:00:47
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import MenuItem from './menu-item'

function Menus({ navigation }) {
  return (
    <Flex style={styles.section} wrap='wrap'>
      <MenuItem
        style={{
          backgroundColor: _.colorDepthBid
        }}
        navigation={navigation}
        title='卖一推荐'
        pathname='TinygrailAdvanceAsk'
        icon='bid'
      />
      <MenuItem
        style={{
          backgroundColor: _.colorDepthAsk
        }}
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
    </Flex>
  )
}

Menus.contextTypes = {
  $: PropTypes.object
}

export default observer(Menus)

const styles = StyleSheet.create({
  section: {
    paddingVertical: _.wind,
    marginLeft: _.wind
  }
})
