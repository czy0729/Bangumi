/*
 * @Author: czy0729
 * @Date: 2019-04-14 20:26:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-03 10:25:52
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Button } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { MODEL_TIMELINE_SCOPE } from '@constants/model'

function TabBarLeft({ $ }) {
  const { scope } = $.state
  return (
    <Popover
      data={MODEL_TIMELINE_SCOPE.data.map(item => item.label)}
      onSelect={$.onSelectScope}
    >
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
    paddingLeft: _.wind,
    paddingRight: _.sm
  },
  btn: {
    width: 48,
    height: 24,
    borderRadius: 16
  }
})
