/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-14 19:16:07
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Tabs as CompTabs, Text } from '@components'
import { _ } from '@stores'
import { MODEL_SUBJECT_TYPE, MODEL_COLLECTION_STATUS } from '@constants/model'
import TabBarLeft from './tab-bar-left'
import { tabs, height, headerHeight } from './store'

function Tabs({ scrollY, children, onSelect, onChange, ...other }, { $ }) {
  const { subjectType, _page, _loaded } = $.state
  if (!_loaded) {
    return null
  }

  const styles = memoStyles()
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
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [-height, 0, height - headerHeight, height],
                outputRange: [height * 2, height, headerHeight, headerHeight]
              })
            }
          ]
        }
      ]}
      tabs={_tabs}
      page={_page}
      renderTabBarLeft={<TabBarLeft onSelect={onSelect} />}
      onTabClick={$.onTabClick}
      onChange={(...arg) => {
        onChange(...arg)
        $.onChange(...arg)
      }}
      {...other}
    >
      {children}
    </CompTabs>
  )
}

Tabs.defaultProps = {
  onSelect: Function.prototype,
  onChange: Function.prototype
}

Tabs.contextTypes = {
  $: PropTypes.object
}

export default observer(Tabs)

const memoStyles = _.memoStyles(_ => ({
  tabs: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    marginTop: -1,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    ..._.shadow
  }
}))
