/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-31 01:44:03
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Tabs as CompTabs, Text } from '@components'
import { MODEL_SUBJECT_TYPE, MODEL_COLLECTION_STATUS } from '@constants/model'
import _ from '@styles'
import TabBarLeft from './tab-bar-left'
import { tabs, height, headerHeight } from './store'

function Tabs({ scrollY, children, ...other }, { $ }) {
  const { subjectType, _page } = $.state
  const counts = {
    动画: {},
    书籍: {},
    游戏: {},
    音乐: {},
    三次元: {}
  }

  if ($.userCollectionsStatus.length) {
    $.userCollectionsStatus.forEach(item => {
      item.collects.forEach(i => {
        const type = MODEL_COLLECTION_STATUS.getLabel(i.status.type)
        counts[item.name_cn][type] = i.count
      })
    })
  }

  // 把总数和title合并
  const _tabs = tabs.map(item => {
    const count = counts[MODEL_SUBJECT_TYPE.getTitle(subjectType)][item.title]
    return {
      title: (
        <Text>
          {item.title.replace('看', $.action)}
          {!!count && (
            <Text size={12} lineHeight={14} type='sub'>
              {' '}
              {count}
            </Text>
          )}
        </Text>
      )
    }
  })

  return (
    <CompTabs
      tabBarStyle={[
        styles.tabs,
        {
          top: scrollY.interpolate({
            inputRange: [-height, 0, height - headerHeight, height],
            outputRange: [height * 2, height, headerHeight, headerHeight]
          })
        }
      ]}
      tabs={_tabs}
      page={_page}
      renderTabBarLeft={<TabBarLeft />}
      onTabClick={$.onTabClick}
      onChange={$.onChange}
      {...other}
    >
      {children}
    </CompTabs>
  )
}

Tabs.contextTypes = {
  $: PropTypes.object
}

export default observer(Tabs)

const styles = StyleSheet.create({
  tabs: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    right: 0,
    backgroundColor: _.colorPlain
  }
})
