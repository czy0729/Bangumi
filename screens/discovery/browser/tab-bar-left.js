/*
 * @Author: czy0729
 * @Date: 2019-04-14 20:26:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-15 16:20:27
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Button } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

function TabBarLeft(props, { $ }) {
  const styles = memoStyles()
  const { type } = $.state
  return (
    <Popover
      data={MODEL_SUBJECT_TYPE.data.map(item => item.title)}
      onSelect={$.onSelect}
    >
      <Flex style={styles.tabBarLeft} justify='center'>
        <Button style={styles.btn} type='ghostMain' size='sm'>
          {MODEL_SUBJECT_TYPE.getTitle(type)}
        </Button>
      </Flex>
    </Popover>
  )
}

TabBarLeft.contextTypes = {
  $: PropTypes.object
}

export default observer(TabBarLeft)

const memoStyles = _.memoStyles(_ => ({
  tabBarLeft: {
    height: 42,
    paddingLeft: _._wind,
    paddingRight: _.sm,
    backgroundColor: _.colorBg
  },
  btn: {
    width: 48,
    height: 24,
    borderRadius: 16
  }
}))
