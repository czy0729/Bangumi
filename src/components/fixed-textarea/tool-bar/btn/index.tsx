/*
 * @Author: czy0729
 * @Date: 2023-08-01 05:47:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 00:45:07
 */
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { date, getTimestamp, open, stl } from '@utils'
import { HOST_IMAGE_UPLOAD_RYMK } from '@constants'
import { flexStyle } from '../../../flex'
import { Iconfont } from '../../../iconfont'
import { Text } from '../../../text'
import { Touchable } from '../../../touchable'
import { BTN_ICONS, BTN_TEXT } from './ds'
import { styles } from './styles'

import type { Props } from './types'

const isBtnText = (v: string): v is (typeof BTN_TEXT)[number] =>
  (BTN_TEXT as readonly string[]).includes(v)

function Btn({
  text,
  symbol,
  showBgm,
  showReplyHistory,
  onHideBgm,
  onShowBgm,
  onHideReplyHistory,
  onShowReplyHistory,
  onAddSymbolText
}: Props) {
  const textSize = _.window.width < 375 ? 10 : 11

  // BGM
  if (text === 'BGM') {
    const active = showBgm && !showReplyHistory

    return (
      <Touchable
        style={stl(flexStyle({ justify: 'center' }), styles.btn, _.ml.xs, styles.icon)}
        onPress={active ? onHideBgm : onShowBgm}
      >
        <Iconfont name='icon-more-grid' color={active ? _.colorMain : _.colorSub} />
      </Touchable>
    )
  }

  // 历史
  if (text === '历史') {
    return (
      <Touchable
        style={stl(flexStyle({ justify: 'center' }), styles.btn, styles.icon)}
        onPress={showReplyHistory ? onHideReplyHistory : onShowReplyHistory}
      >
        <Iconfont
          name='icon-history'
          color={showReplyHistory ? _.colorMain : _.colorSub}
          size={20}
        />
      </Touchable>
    )
  }

  // 时间
  if (text === '时间') {
    return (
      <Touchable
        style={stl(flexStyle({ justify: 'center' }), styles.btn, styles.icon)}
        onPress={() => {
          onAddSymbolText(`[${date('Y-m-d H:i', getTimestamp())}] `, true)
        }}
      >
        <Iconfont name='md-access-time' color={_.colorSub} size={20} />
      </Touchable>
    )
  }

  const iconName = BTN_ICONS[text as keyof typeof BTN_ICONS]

  return (
    <Touchable
      style={stl(
        iconName && flexStyle({ justify: 'center' }),
        styles.btn,
        iconName && isBtnText(iconName) && styles.text,
        iconName && styles.icon
      )}
      onPress={() => {
        text === '图床' ? open(HOST_IMAGE_UPLOAD_RYMK) : onAddSymbolText(symbol)
      }}
    >
      {iconName ? (
        <Iconfont name={iconName} color={_.colorSub} size={18} />
      ) : (
        <Text type='sub' size={textSize} align='center'>
          {text}
        </Text>
      )}
    </Touchable>
  )
}

export default observer(Btn)
