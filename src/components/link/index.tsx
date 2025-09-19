/*
 * @Author: czy0729
 * @Date: 2025-08-09 16:05:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-09 16:18:32
 */
import React, { useCallback } from 'react'
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
  children
}: LinkProps<T>) => {
  const navigation = useNavigation()
  const handlePress = useCallback(() => {
    // @ts-expect-error
    navigation.push(path, typeof getParams === 'function' ? getParams() : params)
  }, [navigation, params, getParams, path])

  return useObserver(() => (
    <Touchable style={style} onPress={handlePress}>
      {children}
    </Touchable>
  ))
}

export default Link
