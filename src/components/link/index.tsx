/*
 * @Author: czy0729
 * @Date: 2025-08-09 16:05:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-19 21:14:11
 */
import React, { useCallback } from 'react'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import { Paths } from '@types'
import { Touchable } from '../touchable'
import { Props as LinkProps } from './types'

export { LinkProps }

/** 路由 */
export const Link = <T extends Paths>({
  style,
  path,
  params,
  getParams,
  eventId,
  eventData,
  children
}: LinkProps<T>) => {
  const navigation = useNavigation()

  const handleEvent = useCallback(() => {
    if (eventId) t(eventId, eventData)
  }, [eventId, eventData])
  const handlePress = useCallback(() => {
    if (path.startsWith('https://')) {
      open(path)
      handleEvent()
      return
    }

    // @ts-expect-error
    navigation.push(path, typeof getParams === 'function' ? getParams() : params)
    handleEvent()
  }, [path, navigation, getParams, params, handleEvent])

  return useObserver(() => (
    <Touchable style={style} onPress={handlePress}>
      {children}
    </Touchable>
  ))
}

export default Link
