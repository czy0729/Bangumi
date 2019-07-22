/*
 * @Author: czy0729
 * @Date: 2019-05-21 04:19:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-22 20:58:31
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { rakuenStore, userStore } from '@stores'
import _ from '@styles'
import IconTabsHeader from './tabs-header'

let isSetTimeout = false

export default
@observer
class Notify extends React.Component {
  componentDidMount() {
    if (!isSetTimeout) {
      isSetTimeout = true

      // 一分钟检查一次消息
      setTimeout(() => {
        if (userStore.isWebLogin) {
          rakuenStore.fetchNotify()
        }
      }, 60000)
    }
  }

  render() {
    const { navigation } = this.props
    return (
      <View>
        {!!rakuenStore.notify.unread && <View style={styles.dot} />}
        <IconTabsHeader
          name='mail'
          onPress={() => {
            if (userStore.isWebLogin) {
              navigation.push('Notify')
            } else {
              navigation.push('LoginV2')
            }
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    zIndex: 2,
    top: 5,
    right: 4,
    width: 12,
    height: 12,
    backgroundColor: _.colorMain,
    borderWidth: 2,
    borderColor: _.colorPlain,
    borderRadius: 12
  }
})
