/*
 * @Author: czy0729
 * @Date: 2019-05-21 04:19:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-14 21:16:23
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _, rakuenStore, userStore } from '@stores'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'
import IconTabsHeader from './tabs-header'

let isSetTimeout = false

export default
@observer
class Notify extends React.Component {
  static defaultProps = {
    event: EVENT
  }

  componentDidMount() {
    if (!isSetTimeout) {
      isSetTimeout = true

      setTimeout(() => {
        if (userStore.isWebLogin) {
          rakuenStore.fetchNotify()
          userStore.fetchPM(true, 'pmIn')
        }
      }, 30000)
    }
  }

  render() {
    const { style, navigation, event } = this.props
    const hasNewNotify = !!rakuenStore.notify.unread
    const { hasNewPM } = userStore
    return (
      <View>
        {(hasNewNotify || hasNewPM) && <View style={this.styles.dot} />}
        <IconTabsHeader
          style={style}
          name='mail'
          onPress={() => {
            if (userStore.isWebLogin) {
              const { id, data } = event
              t(id, {
                to: 'Notify',
                ...data
              })
              navigation.push('Notify', {
                type: hasNewPM ? 'pm' : 'notify'
              })
            } else {
              navigation.push('LoginV2')
            }
          }}
        />
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  dot: {
    position: 'absolute',
    zIndex: 2,
    top: 5,
    left: 20,
    width: 12,
    height: 12,
    backgroundColor: _.colorMain,
    borderWidth: 2,
    borderColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderRadius: 12
  }
}))
