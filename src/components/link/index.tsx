/*
 * @Author: czy0729
 * @Date: 2025-08-09 16:05:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-25 12:25:48
 */
import React, { useCallback, useMemo } from 'react'
import { appNavigate as navigate, open } from '@utils'
import { logger } from '@utils/dev'
import { t } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import { Touchable } from '../touchable'
import { COMPONENT } from './ds'

import type { Paths } from '@types'
import type { TouchablePressEvent } from '../touchable'
import type { Props as LinkProps } from './types'

export type { LinkProps }

/** 路由 */
export const Link = <T extends Paths>({
  path,
  appNavigate,
  params,
  getParams,
  eventId,
  eventData,
  getEventData,
  disabled,
  onPress,
  children,
  ...other
}: LinkProps<T>) => {
  const navigation = useNavigation(COMPONENT)

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
      if (disabled) return

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

      logger.purple(COMPONENT, appNavigate ? 'appNavigate' : 'to', path)
    },
    [disabled, onPress, appNavigate, path, handleEvent, navigation, resolvedParams]
  )

  return useObserver(() => (
    <Touchable {...other} onPress={handlePress}>
      {children}
    </Touchable>
  ))
}

export default Link
