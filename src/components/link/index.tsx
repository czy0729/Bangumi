/*
 * @Author: czy0729
 * @Date: 2025-08-09 16:05:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 05:59:09
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { appNavigate as navigate, open } from '@utils'
import { logger } from '@utils/dev'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { Touchable } from '../touchable'
import { COMPONENT } from './ds'

import type { Paths } from '@types'
import type { TouchablePressEvent } from '../touchable'
import type { Props as LinkProps } from './types'
export type { LinkProps }

/** 路由 */
export const Link = observer(<T extends Paths>(props: LinkProps<T>) => {
  const navigation = useNavigation(COMPONENT)
  const {
    path,
    params,
    getParams,
    eventId,
    eventData,
    getEventData,
    disabled,
    onPress,
    appNavigate,
    children,
    ...other
  } = props

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
        navigate(path, navigation, resolvedParams as Record<string, unknown>)
      } else {
        if (path.startsWith('https://')) {
          open(path)
        } else {
          navigation?.push?.(
            // @ts-ignore
            path,
            resolvedParams
          )
        }
      }

      handleEvent()

      logger.purple(COMPONENT, appNavigate ? 'appNavigate' : 'to', { path })
    },
    [disabled, onPress, appNavigate, path, handleEvent, navigation, resolvedParams]
  )

  return (
    <Touchable {...other} onPress={handlePress}>
      {children}
    </Touchable>
  )
})

export default Link
