/*
 * @Author: czy0729
 * @Date: 2022-05-13 05:12:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 17:44:55
 */
import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { rakuenStore } from '@stores'
import { matchBgmLink } from '@utils'
import { WEB } from '@constants'
import { Text } from '../../text'
import { filterChildren, getACSearch, getMono, getSubject, getTopic } from './utils'

import type { Props } from './types'

function A({ style, attrs = {}, passProps, children, onPress, ...other }: Props) {
  const { href } = attrs
  const matched = matchBgmLink(href) || undefined
  const route = matched?.route
  const params = (matched?.params ?? {}) as Record<string, string>
  const app = matched?.app

  const [el, setEl] = useState<JSX.Element>(null)

  useEffect(() => {
    const onLinkPress = () => onPress(null, href)
    const args = {
      style,
      passProps,
      params,
      href,
      onPress,
      onLinkPress
    }

    ;(async () => {
      if (app && route === 'Subject') {
        if (rakuenStore.setting.acSearchV2) {
          const result = getACSearch(args)
          if (result) setEl(result)
        }
        return
      }

      if (rakuenStore.setting.matchLink) {
        if (route === 'Subject') {
          setEl(await getSubject(args, setEl))
          return
        }

        if (route === 'Topic') {
          if (params?.topicId !== 'group/350677') setEl(await getTopic(args, setEl))
          return
        }

        if (route === 'Mono') {
          setEl(await getMono(args))
        }
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (el) return el

  const childrens = React.Children.toArray(children)
  const child = childrens[0] as React.ReactElement
  if (
    childrens?.length === 1 &&
    child?.type &&
    typeof child.type === 'function' &&
    (child.type as { displayName?: string }).displayName === 'ToggleImage'
  ) {
    return child
  }

  return (
    <Text
      style={style}
      underline={!WEB}
      {...other}
      onPress={() => {
        setTimeout(() => {
          onPress(null, href)
        }, 80)
      }}
    >
      {filterChildren(childrens)}
    </Text>
  )
}

export default observer(A)
