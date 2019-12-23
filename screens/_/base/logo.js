/*
 * @Author: czy0729
 * @Date: 2019-04-05 21:12:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-23 20:32:12
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'

function Logo({ forceUpdate }) {
  return (
    <Touchable
      onPress={() => {
        t('其他.切换主题', {
          isDark: !_.isDark
        })

        _.toggleMode()
        if (forceUpdate) {
          // 安卓端触发重渲染
          setTimeout(() => {
            forceUpdate()
          }, 0)
        }
      }}
    >
      <Iconfont
        size={32}
        name='logo'
        color={_.select(_.colorTitle, _.colorDesc)}
      />
    </Touchable>
  )
}

export default observer(Logo)
