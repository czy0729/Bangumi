/*
 * @Author: czy0729
 * @Date: 2019-04-05 21:12:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-25 18:16:18
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { IOS } from '@constants'

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
        style={IOS && styles.tinygrail}
        size={IOS ? 18 : 32}
        name={IOS ? 'tinygrail' : 'bangumi'}
        color={_.select(_.colorTitle, _.colorDesc)}
      />
    </Touchable>
  )
}

export default observer(Logo)

const styles = StyleSheet.create({
  tinygrail: {
    marginVertical: 6
  }
})
