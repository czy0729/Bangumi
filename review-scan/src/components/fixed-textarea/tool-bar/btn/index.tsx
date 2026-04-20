/*
 * @Author: czy0729
 * @Date: 2023-08-01 05:47:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-01 17:57:32
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { date, getTimestamp, stl, open } from '@utils'
import { HOST_IMAGE_UPLOAD } from '@constants'
import { Touchable } from '../../../touchable'
import { Flex } from '../../../flex'
import { Iconfont } from '../../../iconfont'
import { Text } from '../../../text'
import { BTN_ICONS, BTN_TEXT } from './ds'
import { styles } from './styles'

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
}) {
  const textSize = _.window.width < 375 ? 10 : 11
  if (text === 'BGM') {
    return (
      <Touchable
        style={[styles.btn, _.ml.xs]}
        onPress={showBgm ? onHideBgm : onShowBgm}
      >
        <Flex style={styles.icon} justify='center'>
          <Iconfont
            name='icon-more-grid'
            color={showBgm && !showReplyHistory ? _.colorMain : _.colorSub}
          />
        </Flex>
      </Touchable>
    )
  }

  if (text === '历史') {
    return (
      <Touchable
        style={styles.btn}
        onPress={showReplyHistory ? onHideReplyHistory : onShowReplyHistory}
      >
        <Flex style={styles.icon} justify='center'>
          <Iconfont
            name='icon-history'
            color={showReplyHistory ? _.colorMain : _.colorSub}
            size={20}
          />
        </Flex>
      </Touchable>
    )
  }

  if (text === '时间') {
    return (
      <Touchable
        style={styles.btn}
        onPress={() => {
          onAddSymbolText(`[${date('Y-m-d H:i', getTimestamp())}] `, true)
        }}
      >
        <Flex style={styles.icon} justify='center'>
          <Iconfont name='md-access-time' color={_.colorSub} size={20} />
        </Flex>
      </Touchable>
    )
  }

  const isOpenInNew = text === '图床'
  const iconName = BTN_ICONS[text]
  return (
    <Touchable
      style={stl(styles.btn, BTN_TEXT.includes(iconName) && styles.text)}
      onPress={() => {
        isOpenInNew ? open(HOST_IMAGE_UPLOAD) : onAddSymbolText(symbol)
      }}
    >
      {iconName ? (
        <Flex style={styles.icon} justify='center'>
          <Iconfont name={iconName} color={_.colorSub} size={18} />
        </Flex>
      ) : (
        <Text type='sub' size={textSize} align='center'>
          {text}
        </Text>
      )}
    </Touchable>
  )
}

export default observer(Btn)
