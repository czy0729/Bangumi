/*
 * @Author: czy0729
 * @Date: 2022-05-13 05:12:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-01 10:30:09
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
        if (rakuenStore.setting.acSearch) setEl(getACSearch(args))
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

    return (
      <Text
        style={style}
        selectable
        underline={!WEB}
        {...other}
        onPress={() => {
          setTimeout(() => {
            onPress(null, href)
          }, 80)
        }}
      >
        {filterChildren(children)}
      </Text>
    )
  })
}

export default A
