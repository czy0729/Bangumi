/*
 * @Author: czy0729
 * @Date: 2025-08-09 16:05:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-12 06:09:12
 */
import React, { useCallback, useMemo } from 'react'
import { appNavigate as navigate, open } from '@utils'
import { t } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import { DEV, TEXT_BADGES } from '@constants'
import { Paths } from '@types'
import { Touchable, TouchablePressEvent } from '../touchable'
import { Props as LinkProps } from './types'

export { LinkProps }

/** 路由 */
export const Link = <T extends Paths>({
  path,
  appNavigate,
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

  const resolvedParams = useMemo(
    () => (typeof getParams === 'function' ? getParams() : params),
    [getParams, params]
  )

  const resolvedEventData = useMemo(
    () => (typeof getEventData === 'function' ? getEventData() : eventData),
    [getEventData, eventData]
  )

  const handleEvent = useCallback(() => {
    if (eventId) t(eventId, resolvedEventData)
  }, [eventId, resolvedEventData])

  const handlePress = useCallback(
    (evt: TouchablePressEvent) => {
      onPress?.(evt)

      if (appNavigate) {
        navigate(path, navigation, resolvedParams)
      } else if (path.startsWith('https://')) {
        open(path)
      } else {
        navigation?.push?.(
          // @ts-expect-error
          path,
          resolvedParams
        )
      }

      handleEvent()

      if (DEV) {
        console.info(TEXT_BADGES.purple, `[Link] ${appNavigate ? 'appNavigate' : 'to'}`, path)
      }
    },
    [onPress, appNavigate, path, navigation, resolvedParams, handleEvent]
  )

  return useObserver(() => (
    <Touchable {...other} onPress={handlePress}>
      {children}
    </Touchable>
  ))
}

export default Link
