/*
 * @Author: czy0729
 * @Date: 2019-08-10 17:53:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-01 22:45:27
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
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
      <Flex style={[_.container.wind, _.mt.lg]}>
        {!!online && (
          <Text align='right' size={11}>
            online: {online}
          </Text>
        )}
        <Flex.Item>
          <Text align='right' size={11}>
            {today}
          </Text>
        </Flex.Item>
      </Flex>
    </>
  )
}

Header.contextTypes = {
  $: PropTypes.object
}

export default observer(Header)
