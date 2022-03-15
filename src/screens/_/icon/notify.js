/*
 * @Author: czy0729
 * @Date: 2019-05-21 04:19:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 01:10:22
 */
import React from 'react'
import { View } from 'react-native'
import { _, rakuenStore, userStore } from '@stores'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import { EVENT } from '@constants'
import { IconTabsHeader } from './tabs-header'

let isSetTimeout = false

export const IconNotify = ob(
  class extends React.Component {
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
      const { style, navigation, event, children } = this.props
      const hasNewNotify = !!rakuenStore.notify.unread
      const { hasNewPM } = userStore
      return (
        <View>
          {(hasNewNotify || hasNewPM) && <View style={this.styles.dot} />}
          <IconTabsHeader
            style={style}
            name='md-mail-outline'
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
          >
            {children}
          </IconTabsHeader>
        </View>
      )
    }

    get styles() {
      return memoStyles()
    }
  }
)

const memoStyles = _.memoStyles(() => ({
  dot: {
    position: 'absolute',
    zIndex: 2,
    top: 6,
    left: 25,
    width: 12,
    height: 12,
    backgroundColor: _.colorMain,
    borderWidth: 2,
    borderColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderRadius: 16
  }
}))
