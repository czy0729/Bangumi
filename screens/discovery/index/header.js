/*
 * @Author: czy0729
 * @Date: 2019-08-10 17:53:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-01 22:39:17
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
  const { online } = $.state
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
        {!!online && (
          <Text style={_.mt.xs} align='right' size={12}>
            {online}
          </Text>
        )}
      </View>
    </>
  )
}

Header.contextTypes = {
  $: PropTypes.object
}

export default observer(Header)
