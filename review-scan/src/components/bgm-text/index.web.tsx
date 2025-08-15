/*
 * @Author: czy0729
 * @Date: 2023-06-08 23:44:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 21:38:15
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { TextStyle } from '@types'
import { Bgm } from '../bgm'
import { bgmMap } from './ds'
import { styles } from './styles'
import { Props as BgmTextProps } from './types'

export { BgmTextProps, bgmMap }

export const BgmText = observer(
  ({ style, index = 0, size = 14, lineHeight, children, ...other }: BgmTextProps) => {
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
  }
)

export default BgmText
