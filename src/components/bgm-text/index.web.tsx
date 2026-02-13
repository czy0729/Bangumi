/*
 * @Author: czy0729
 * @Date: 2023-06-08 23:44:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 21:38:15
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { _ } from '@stores'
import { Bgm } from '../bgm'
import { BGM_MAP } from './ds'
import { styles } from './styles'

import type { TextStyle } from '@types'
import type { Props as BgmTextProps } from './types'

export { BGM_MAP }

export type { BgmTextProps }

export function BgmText({
  style,
  index = 0,
  size = 14,
  lineHeight,
  children,
  ...other
}: BgmTextProps) {
  return useObserver(() => {
    const _style: TextStyle[] = [styles.text]
    if (size) _style.push(styles[size])
    if (lineHeight !== undefined) {
      _style.push({
        lineHeight: lineHeight <= 2 ? lineHeight * size : lineHeight * _.lineHeightRatio
      })
    }
    if (style) _style.push(style)

    return (
      <>
        {!!index && <Bgm style={_style} index={index} {...other} />}
        {children}
      </>
    )
  })
}

export default BgmText
