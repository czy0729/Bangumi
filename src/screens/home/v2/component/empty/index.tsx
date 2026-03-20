/*
 * @Author: czy0729
 * @Date: 2021-06-10 13:44:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:13:22
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Button, Flex, Link, Mesume, Text } from '@components'
import { randomSpeech } from '@components/mesume/utils'
import { useStore } from '@stores'
import { COMPONENT, FOOTER_EMPTY_TEXT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Empty({ title, length }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const { filter } = $.state
  const type = title === '全部' ? '条目' : title

  return (
    <Flex style={length ? styles.top : styles.empty} direction='column' justify='center'>
      <Mesume size={80} />
      <Text style={styles.text} type='sub' size={13} align='center'>
        {length ? randomSpeech() : FOOTER_EMPTY_TEXT[title]}
      </Text>
      {!!filter && length <= 3 && (
        <Link
          style={styles.btn}
          path='Search'
          params={{
            _type: type,
            _value: filter
          }}
          eventId='首页.再搜索'
          eventData={{
            type,
            value: filter
          }}
        >
          <Button type='ghostMain'>前往搜索</Button>
        </Link>
      )}
    </Flex>
  )
}

export default observer(Empty)
