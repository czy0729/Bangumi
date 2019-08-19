/*
 * @Author: czy0729
 * @Date: 2019-08-10 17:53:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-18 21:40:03
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { StatusBarPlaceholder } from '@screens/_'
import _ from '@styles'
import Award from './award'
import Section from './section'
import Section2 from './section2'

function Header(props, { $ }) {
  const { today } = $.home
  return (
    <>
      <StatusBarPlaceholder style={{ backgroundColor: _.colorBg }} />
      <Award />
      <Section />
      <Section2 />
      <View style={[_.container.wind, _.mt.lg]}>
        <Text align='right'>{today}</Text>
      </View>
    </>
  )
}

Header.contextTypes = {
  $: PropTypes.object
}

export default observer(Header)
