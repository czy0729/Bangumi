/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:05:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-29 22:59:04
 */
import React, { useMemo, useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { rakuenStore } from '@stores'
import { IOS } from '@constants'
import { Flex } from '../../flex'
import { Text } from '../../text'
import { memoStyles } from './styles'

import type { PropsWithChildren } from 'react'

function QuoteText({ children }: PropsWithChildren<{}>) {
  const styles = memoStyles()

  const [show, setShow] = useState(rakuenStore.setting.quote)
  const [toggle, setToggle] = useState(false)

  const processedChildren = useMemo(() => {
    if (!IOS && Array.isArray(children) && children.length > 1) {
      return children.filter(
        item => !(item?.[0]?.key && String(item[0].key).indexOf('View-') === 0)
      )
    }
    return children
  }, [children])

  if (!show) {
    return (
      <Text style={styles.placeholder} onPress={() => setShow(true)}>
        「...」
      </Text>
    )
  }

  return (
    <Flex>
      <View style={styles.quote}>
        <Text
          style={styles.text}
          size={12}
          numberOfLines={toggle ? 10 : 3}
          onPress={() => setToggle(true)}
        >
          {processedChildren}
        </Text>
      </View>
    </Flex>
  )
}

export default observer(QuoteText)
