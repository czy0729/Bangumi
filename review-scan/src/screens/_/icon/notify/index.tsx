/*
 * @Author: czy0729
 * @Date: 2019-05-21 04:19:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-01 01:04:07
 */
import React from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { rakuenStore, userStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'
import { IconTabsHeader } from '../tabs-header'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as IconNotifyProps } from './types'

export { IconNotifyProps }

let isSetTimeout = false

export const IconNotify = ob(
  class IconNotifyComponent extends React.Component<IconNotifyProps> {
    static defaultProps = {
      event: EVENT
    }

    componentDidMount() {
      if (!isSetTimeout) {
        isSetTimeout = true

        setInterval(() => {
          if (userStore.isWebLogin) {
            rakuenStore.fetchNotify()
            userStore.fetchPM(true, 'pmIn')
          }
        }, 60000)
      }
    }

    render() {
      const { style, navigation, event, children } = this.props
      const hasNewNotify = !!rakuenStore.notify.unread
      const { hasNewPM } = userStore
      return (
        <Component id='item-notify'>
          {(hasNewNotify || hasNewPM) && <View style={this.styles.dot} pointerEvents='none' />}
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
        </Component>
      )
    }

    get styles() {
      return memoStyles()
    }
  },
  COMPONENT
)

export default IconNotify
