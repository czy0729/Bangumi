/*
 * @Author: czy0729
 * @Date: 2019-04-14 20:26:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-11 14:19:08
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Button } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

function TabBarLeft({ onSelect }, { $ }) {
  const styles = memoStyles()
  const { subjectType } = $.state
  return (
    <Popover
      data={MODEL_SUBJECT_TYPE.data.map(item => item.title)}
      onSelect={onSelect}
    >
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

const memoStyles = _.memoStyles(_ => ({
  tabBarLeft: {
    height: 42,
    paddingLeft: _._wind,
    paddingRight: _.sm,
    backgroundColor: _.select('transparent', _._colorDarkModeLevel1)
  },
  btn: {
    width: 48,
    height: 24,
    borderRadius: 16
  }
}))
