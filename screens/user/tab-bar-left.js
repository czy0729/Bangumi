/*
 * @Author: czy0729
 * @Date: 2019-04-14 20:26:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-26 17:37:02
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Popover, Menu, Flex, Button } from '@components'
import { observer } from '@utils/decorators'
import { IOS } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import _ from '@styles'

const TabBarLeft = (props, { $ }) => {
  const { subjectType } = $.state
  const data = MODEL_SUBJECT_TYPE.data.map(item => item.title)
  const popoverProps = IOS
    ? {
        overlay: <Menu data={data} onSelect={$.onSelectSubjectType} />
      }
    : {
        data,
        onSelect: $.onSelectSubjectType
      }
  return (
    <Popover placement='bottom' {...popoverProps}>
      <Flex style={styles.tabBarLeft} justify='center'>
        <Button style={styles.btn} type='ghostMain' size='sm'>
          {MODEL_SUBJECT_TYPE.getTitle(subjectType)}
        </Button>
      </Flex>
    </Popover>
  )
}

TabBarLeft.contextTypes = {
  $: PropTypes.object
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
