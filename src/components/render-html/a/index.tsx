/*
 * @Author: czy0729
 * @Date: 2022-05-13 05:12:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-27 23:41:34
 */
import React from 'react'
import { observer } from 'mobx-react'
import { rakuenStore } from '@stores'
import { matchBgmLink } from '@utils/app'
import { Text } from '../../text'
import { getACSearch, getSubject, getTopic, getMono, filterChildren } from './utils'
import { Props } from './types'

function A({ style, attrs = {}, passProps, children, onPress, ...other }: Props) {
  const { matchLink, acSearch } = rakuenStore.setting
  const { href } = attrs
  const { route, params = {}, app } = matchBgmLink(href) || {}
  const onLinkPress = () => onPress(null, href)

  let el: JSX.Element
  const args = {
    style,
    passProps,
    params,
    href,
    onPress,
    onLinkPress
  }

  if (app && route === 'Subject') {
    if (acSearch) el = getACSearch(args)
  } else if (matchLink) {
    if (route === 'Subject') {
      el = getSubject(args)
    } else if (route === 'Topic') {
      if (params?.topicId !== 'group/350677') el = getTopic(args)
    } else if (route === 'Mono') {
      el = getMono(args)
    }
  }
  if (el) return el

  return (
    <Text
      style={style || this.styles.a}
      selectable
      underline
      {...other}
      onPress={onLinkPress}
    >
      {filterChildren(children)}
    </Text>
  )
}

export default observer(A)
