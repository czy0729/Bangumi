/*
 * @Author: czy0729
 * @Date: 2026-03-28 23:58:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-29 00:32:26
 */
import React from 'react'
import { observer } from 'mobx-react'
import { useIsFocused } from '@utils/hooks'
import { BgmText } from '../../bgm-text'

import type { BgmTextProps } from '../../bgm-text'

function EmojiText({ style, children, ...other }: BgmTextProps) {
  const isFocus = useIsFocused()

  return <BgmText style={style} animated={isFocus} {...other} />
}

export default observer(EmojiText)
