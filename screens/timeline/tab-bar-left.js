/*
 * @Author: czy0729
 * @Date: 2019-04-14 20:26:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-22 22:57:42
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Popover, Menu, Flex, Button } from '@components'
import { IOS } from '@constants'
import { MODEL_TIMELINE_SCOPE } from '@constants/model'
import { wind, sm } from '@styles'

const TabBarLeft = ({ $ }) => {
  const { scope } = $.state
  const data = MODEL_TIMELINE_SCOPE.data.map(item => item.label)
  const popoverProps = IOS
    ? {
        overlay: <Menu data={data} onSelect={$.onSelectScope} />
      }
    : {
        data,
        onSelect: $.onSelectScope
      }
  return (
    <Popover placement='bottom' {...popoverProps}>
      <Flex style={styles.tabBarLeft} justify='center'>
        <Button style={styles.btn} type='ghostMain' size='sm'>
          {MODEL_TIMELINE_SCOPE.getLabel(scope)}
        </Button>
      </Flex>
    </Popover>
  )
}

export default observer(TabBarLeft)

const styles = StyleSheet.create({
  tabBarLeft: {
    height: 42,
    paddingLeft: wind,
    paddingRight: sm
  },
  btn: {
    width: 48,
    height: 24,
    borderRadius: 16
  }
})
