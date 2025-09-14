/*
 * @Author: czy0729
 * @Date: 2019-03-16 10:54:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-12 01:34:36
 */
import React, { useEffect, useMemo, useRef } from 'react'
import { DeviceEventEmitter, View } from 'react-native'
import { HoldItem } from 'react-native-hold-menu'
import { _, systemStore } from '@stores'
import { s2t } from '@utils/thirdParty/open-cc'
import { FROZEN_FN, IOS } from '@constants'
import { PopoverIOSItems } from './types'

const EVENT_TYPE = 'POPOVER_ONSELECT'
let id = 0

function Popover({ activateOn, children, ...other }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = other.data || other.overlay?.props?.data || []
  const title = other.title || other.overlay?.props?.title || ''
  const onSelect = other.onSelect || other.overlay?.props?.onSelect || FROZEN_FN

  const eventId = useRef((id += 1))
  const eventType = `${EVENT_TYPE}|${eventId.current}`

  const items = useMemo<PopoverIOSItems>(() => {
    const itemsValue = (
      systemStore.setting.s2t
        ? data.map((item: string) => (typeof item === 'string' ? s2t(item) : item))
        : data
    ).map((item: any) => ({
      text: item,
      eventType
    }))

    if (title) {
      itemsValue.unshift({
        text: systemStore.setting.s2t ? s2t(title) : title,
        isTitle: true
      })
    }

    return itemsValue
  }, [title, data, eventType])

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      eventType,
      eventValue => {
        const { value, pageX, pageY } = eventValue || {}
        let index = -1
        try {
          index = items.filter(item => !item.isTitle).findIndex(item => item.text === value)
        } catch (error) {}

        setTimeout(() => {
          onSelect(data[index], index, {
            pageX,
            pageY
          })
        }, 160)
      },
      [onSelect]
    )

    return () => subscription.remove()
  })

  return (
    <View style={other.style}>
      <HoldItem
        key={items.map(item => item.text).join()}
        // @ts-expect-error
        styles={styles.holdItem}
        items={items}
        activateOn={activateOn || 'tap'}
        disableMove={items.length >= 10}
        closeOnTap
        hapticFeedback={IOS ? 'Light' : 'None'}
      >
        {children}
      </HoldItem>
    </View>
  )
}

export default Popover

const styles = _.create({
  holdItem: {
    position: 'relative',
    maxWidth: '50%'
  }
})
