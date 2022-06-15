/*
 * @Author: czy0729
 * @Date: 2019-05-21 04:19:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-15 13:45:53
 */
import React from 'react'
import { View } from 'react-native'
import { rakuenStore, userStore } from '@stores'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import { EVENT } from '@constants'
import { IconTabsHeader } from '../tabs-header'
import { memoStyles } from './styles'
import { Props } from './types'

let isSetTimeout = false

export const IconNotify = ob(
  class IconNotifyComponent extends React.Component<Props> {
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
