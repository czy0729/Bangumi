/*
 * @Author: czy0729
 * @Date: 2019-04-14 20:26:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-08 14:34:35
 */
import React from 'react'
import { Flex, Button, Heatmap } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import { MODEL_TIMELINE_SCOPE } from '@constants/model'

function TabBarLeft(props, { $ }) {
  const styles = memoStyles()
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
      <Heatmap id='时间胶囊.切换类型' />
    </Popover>
  )
}

export default obc(TabBarLeft)

const memoStyles = _.memoStyles(() => ({
  tabBarLeft: {
    height: 42 * _.ratio,
    paddingLeft: _._wind * _.ratio,
    paddingRight: _.sm,
    marginTop: _.device(0, 2),
    backgroundColor: IOS
      ? 'transparent'
      : _.select('transparent', _.deepDark ? _._colorPlain : _._colorDarkModeLevel1)
  },
  btn: {
    width: 48 * _.ratio,
    height: 24 * _.ratio,
    borderRadius: 16 * _.ratio
  }
}))
