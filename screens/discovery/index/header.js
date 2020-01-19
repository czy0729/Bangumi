/*
 * @Author: czy0729
 * @Date: 2019-08-10 17:53:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-19 14:53:23
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
  const styles = memoStyles()
  const { online } = $.state
  const { today } = $.home
  return (
    <>
      <StatusBarPlaceholder style={styles.statusBar} />
      <Award />
      <Menu />
      <Flex style={styles.wrap}>
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

const memoStyles = _.memoStyles(_ => ({
  statusBar: {
    backgroundColor: _.colorBg
  },
  wrap: {
    ..._.container.wind,
    ..._.mt.lg
  }
}))
