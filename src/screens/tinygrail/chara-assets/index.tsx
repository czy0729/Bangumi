/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 16:04:53
 */
import React from 'react'
import { Page, Touchable, Flex, Iconfont, Text } from '@components'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import ToolBar from '@tinygrail/_/tool-bar'
import Tabs from '@tinygrail/_/tabs-v2'
import Header from './header'
import List from './list'
import Store from './store'
import { TABS, SORT_DS } from './ds'
import { styles } from './styles'
import { Ctx } from './types'

class TinygrailCharaAssets extends React.Component {
  async componentDidMount() {
    const { $ }: Ctx = this.context
    const { form } = $.params
    if (form === 'lottery') {
      $.initFormLottery()
    } else {
      $.init()
    }
  }

  getCount = (route: { key: any }) => {
    const { $ }: Ctx = this.context
    switch (route.key) {
      case 'chara':
        return $.myCharaAssets?.chara?.list?.length || 0

      case 'temple':
        return $.temple?.list?.length === 2000 ? '2000+' : $.temple?.list?.length || 0

      case 'ico':
        return $.myCharaAssets?.ico?.list?.length || 0

      default:
        return 0
    }
  }

  renderIncreaseBtn() {
    const { $ }: Ctx = this.context
    const { editing } = $.state
    return (
      editing && (
        <Touchable onPress={$.increaseBatchSelect}>
          <Flex style={styles.check}>
            <Iconfont name='md-done-all' size={16} color={_.colorTinygrailText} />
          </Flex>
        </Touchable>
      )
    )
  }

  renderContentHeaderComponent() {
    const { $ }: Ctx = this.context
    const { page, level, sort, direction } = $.state
    if (page > 1) return undefined

    return (
      <ToolBar
        data={SORT_DS}
        level={level}
        levelMap={$.levelMap}
        sort={sort}
        direction={direction}
        renderLeft={this.renderIncreaseBtn()}
        onLevelSelect={$.onLevelSelect}
        onSortPress={$.onSortPress}
      />
    )
  }

  renderItem = item => {
    return <List key={item.key} id={item.key} />
  }

  renderLabel = ({ route, focused }) => (
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
  )

  render() {
    const { $ }: Ctx = this.context
    const { _loaded } = $.state
    return (
      <>
        <StatusBarEvents />
        <Header />
        <Page
          style={_.container.tinygrail}
          loaded={_loaded}
          loadingColor={_.colorTinygrailText}
        >
          <Tabs
            routes={TABS}
            renderContentHeaderComponent={this.renderContentHeaderComponent()}
            renderItem={this.renderItem}
            renderLabel={this.renderLabel}
          />
        </Page>
      </>
    )
  }
}

export default inject(Store)(obc(TinygrailCharaAssets))
