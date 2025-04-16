/*
 * @Author: czy0729
 * @Date: 2021-06-10 13:44:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-06 01:32:05
 */
import React from 'react'
import { Button, Flex, Mesume, Text } from '@components'
import { randomSpeech } from '@components/mesume/utils'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import { COMPONENT, FOOTER_EMPTY_TEXT } from './ds'
import { memoStyles } from './styles'

function Empty({ title, length }) {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const { filter } = $.state
  return (
    <Flex style={length ? styles.top : styles.empty} direction='column' justify='center'>
      <Mesume size={80} />
      <Text style={styles.text} type='sub' size={13} align='center'>
        {length ? randomSpeech() : FOOTER_EMPTY_TEXT[title]}
      </Text>
      {!!filter && length <= 3 && (
        <Button
          style={styles.btn}
          type='ghostMain'
          onPress={() => {
            navigation.push('Search', {
              _type: title === '全部' ? '条目' : title,
              _value: filter
            })

            t('首页.再搜索', {
              type: title,
              value: filter
            })
          }}
        >
          前往搜索
        </Button>
      )}
    </Flex>
  )
}

export default ob(Empty, COMPONENT)
