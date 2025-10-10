/*
 * @Author: czy0729
 * @Date: 2025-08-09 16:05:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-10 17:31:12
 */
import React, { useCallback } from 'react'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import { DEV, TEXT_BADGES } from '@constants'
import { Paths } from '@types'
import { Touchable } from '../touchable'
import { Props as LinkProps } from './types'

export { LinkProps }

/** 路由 */
export const Link = <T extends Paths>({
  path,
  params,
  getParams,
  eventId,
  eventData,
  getEventData,
  onPress,
  children,
  ...other
}: LinkProps<T>) => {
  const navigation = useNavigation()

  const handleEvent = useCallback(() => {
    if (eventId) t(eventId, typeof getEventData === 'function' ? getEventData() : eventData)
  }, [eventId, getEventData, eventData])

  const handlePress = useCallback(
    (evt: { pageX?: number; pageY?: number }) => {
      if (DEV) console.info(TEXT_BADGES.purple, `[Link] to`, path)

      if (typeof onPress === 'function') onPress(evt)

      if (path.startsWith('https://')) {
        open(path)
        handleEvent()
        return
      }

      navigation.push(
        // @ts-expect-error
        path,
        typeof getParams === 'function' ? getParams() : params
      )
      handleEvent()
    },
    [path, onPress, navigation, getParams, params, handleEvent]
  )

  return useObserver(() => (
    <Touchable {...other} onPress={handlePress}>
      {children}
    </Touchable>
  ))
}

export default Link
