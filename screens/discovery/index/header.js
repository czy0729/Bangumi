/*
 * @Author: czy0729
 * @Date: 2019-08-10 17:53:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-03 10:49:00
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { StatusBarPlaceholder } from '@screens/_'
import { _ } from '@stores'
import Award from './award'
import Menu from './menu'

function Header(props, { $ }) {
  const { today } = $.home
  return (
    <>
      <StatusBarPlaceholder
        style={{
          backgroundColor: _.colorBg
        }}
      />
      <Award />
      <Menu />
      <View style={[_.container.wind, _.mt.lg]}>
        <Text align='right' size={12}>
          {today}
        </Text>
      </View>
    </>
  )
}

Header.contextTypes = {
  $: PropTypes.object
}

export default observer(Header)
