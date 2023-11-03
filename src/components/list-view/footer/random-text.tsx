/*
 * @Author: czy0729
 * @Date: 2023-10-21 02:07:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-03 05:07:34
 */
import React, { useRef } from 'react'
import { useObserver } from 'mobx-react'
import { randomSpeech } from '../../mesume/utils'
import { Text } from '../../text'
import { styles } from './styles'

function RandomText({ type = undefined, text = '' }) {
  const random = useRef(randomSpeech())
  return useObserver(() => (
    <Text style={styles.textMt} type={type} align='center' size={13} lineHeight={17}>
      {text ? `已过滤${text}个敏感条目` : random.current}
    </Text>
  ))
}

export default RandomText
