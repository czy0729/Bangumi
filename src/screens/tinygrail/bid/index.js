/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-03 18:30:11
 */
import React from 'react'
import { Header, Page, Flex, Text } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import Tabs from '@tinygrail/_/tabs-v2'
import ToolBar from '@tinygrail/_/tool-bar'
import { confirm } from '@utils/ui'
import List from './list'
import Store from './store'
import { tabs, sortDS } from './ds'

class TinygrailBid extends React.Component {
  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  getCount = route => {
    const { $ } = this.context
    switch (route.key) {
      case 'bid':
      case 'asks':
        return $.list(route.key)?.list?.length || 0

      case 'auction':
        return $.list(route.key)?.list.filter(item => item.state === 0).length || 0

      default:
        return 0
    }
  }

  renderContentHeaderComponent() {
    const { $ } = this.context
    const { level, sort, direction } = $.state
    return (
      <ToolBar
        data={sortDS}
        level={level}
        levelMap={$.levelMap}
        sort={sort}
        direction={direction}
        onLevelSelect={$.onLevelSelect}
        onSortPress={$.onSortPress}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { type = 'bid' } = $.params
    const { _loaded } = $.state
    return (
      <>
        <StatusBarEvents />
        <Header
          title='我的委托'
          hm={[`tinygrail/${type}`, 'TinygrailBid']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() => (
            <IconTouchable
              name='md-cancel-presentation'
              color={_.colorTinygrailPlain}
              onPress={() => {
                confirm(
                  `确定取消 (${$.canCancelCount}) 个 (${$.currentTitle})?`,
                  () => $.onBatchCancel(),
                  '小圣杯助手'
                )
              }}
            />
          )}
        />
        <Page
          style={_.container.tinygrail}
          loaded={_loaded}
          loadingColor={_.colorTinygrailText}
        >
          <Tabs
            routes={tabs}
            renderContentHeaderComponent={this.renderContentHeaderComponent()}
            renderItem={item => <List key={item.key} id={item.key} />}
            renderLabel={({ route, focused }) => (
              <Flex style={styles.labelText} justify='center'>
                <Text type='tinygrailPlain' size={13} bold={focused}>
                  {route.title}
                </Text>
                {!!this.getCount(route) && (
                  <Text type='tinygrailText' size={11} bold lineHeight={13}>
                    {' '}
                    {this.getCount(route)}{' '}
                  </Text>
                )}
              </Flex>
            )}
          />
        </Page>
      </>
    )
  }
}

export default inject(Store)(obc(TinygrailBid))

const styles = _.create({
  labelText: {
    width: '100%'
  }
})
