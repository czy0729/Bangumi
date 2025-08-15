/*
 * @Author: czy0729
 * @Date: 2022-05-13 05:12:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-19 11:23:30
 */
import React, { useEffect, useState } from 'react'
import { useObserver } from 'mobx-react'
import { rakuenStore } from '@stores'
import { matchBgmLink } from '@utils'
import { WEB } from '@constants'
import { Text } from '../../text'
import { filterChildren, getACSearch, getMono, getSubject, getTopic } from './utils'
import { Props } from './types'

function A({ style, attrs = {}, passProps, children, onPress, ...other }: Props) {
  const { href } = attrs
  const { route, params = {}, app } = matchBgmLink(href) || {}

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
        if (rakuenStore.setting.acSearchV2) setEl(getACSearch(args))
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

  return useObserver(() => {
    if (el) return el

    const childrens = React.Children.toArray(children)
    if (
      childrens?.length === 1 &&
      // @ts-expect-error
      childrens?.[0]?.type?.displayName === 'ToggleImage'
    ) {
      return childrens[0]
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
  })
}

export default A
