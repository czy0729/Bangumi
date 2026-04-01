/*
 * @Author: czy0729
 * @Date: 2026-03-28 23:58:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-02 06:46:08
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { rakuenStore } from '@stores'
import { info } from '@utils'
import { useIsFocused } from '@utils/hooks'
import { BGM_MAP_CATFISH_DESC, BgmText } from '../../bgm-text'

import type { BgmTextProps } from '../../bgm-text'

function EmojiText({ style, index, children, ...other }: BgmTextProps) {
  const isFocus = useIsFocused()

  const value = Number(index)

  const handleLongPress = useCallback(() => {
    info(`${BGM_MAP_CATFISH_DESC[value % 100]}`)
  }, [value])

  return (
    <BgmText
      style={style}
      index={index}
      animated={rakuenStore.setting.bigEmojiAnimated && isFocus}
      {...other}
      onLongPress={value >= 600 ? handleLongPress : undefined}
    />
  )
}

export default observer(EmojiText)
