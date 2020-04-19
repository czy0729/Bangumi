/*
 * @Author: czy0729
 * @Date: 2019-05-06 13:00:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-19 19:15:01
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Tabs as CompTabs } from '@components'
import { _ } from '@stores'
import { IOS } from '@constants'
import { height, headerHeight } from './store'

function Tabs({ $, scrollY, children, ...other }) {
  const styles = memoStyles()
  const { page, _page } = $.state
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
      tabs={$.tabs}
      initialPage={page}
      page={children ? page : _page}
      onTabClick={$.onTabClick}
      onChange={$.onChange}
      {...other}
    >
      {children}
    </CompTabs>
  )
}

export default observer(Tabs)

const memoStyles = _.memoStyles(_ => ({
  tabs: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    right: 0,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    ...(IOS
      ? _.shadow
      : {
          elevation: 1
        })
  }
}))
