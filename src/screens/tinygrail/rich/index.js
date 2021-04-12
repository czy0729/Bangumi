/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:29:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-12 17:39:07
 */
import React from 'react'
import { View } from 'react-native'
import { IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { withHeaderParams } from '@tinygrail/styles'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import Tabs from '@tinygrail/_/tabs-v2'
import List from './list'
import Store from './store'
import { tabs } from './ds'

const title = '番市首富'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/rich', 'TinygrailRich'],
  withHeaderParams
})
@obc
class TinygrailRich extends React.Component {
  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      title,
      extra: (
        <IconTouchable
          style={_.mr._right}
          name='md-insert-chart-outlined'
          color={_.colorTinygrailPlain}
          onPress={() => {
            t('番市首富.跳转', {
              to: 'TinygrailTreeRich'
            })

            navigation.push('TinygrailTreeRich')
          }}
        />
      )
    })
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <View style={_.container.tinygrail}>
        <StatusBarEvents />
        {!!_loaded && (
          <Tabs
            routes={tabs}
            renderItem={item => (
              <List key={item.key} id={item.key} title={item.title} />
            )}
          />
        )}
      </View>
    )
  }
}
