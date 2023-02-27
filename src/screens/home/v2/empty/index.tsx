/*
 * @Author: czy0729
 * @Date: 2021-06-10 13:44:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-27 20:36:32
 */
import React from 'react'
import { Flex, Text, Mesume, Button } from '@components'
import { randomSpeech } from '@components/mesume/utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { memoStyles } from './styles'
import { Ctx } from '../types'

const FOOTER_EMPTY_TEXT = {
  全部: '当前没有可管理的条目哦',
  动画: '当前没有在追的番组哦',
  书籍: '当前没有在读的书籍哦',
  三次元: '当前没有在追的电视剧哦',
  游戏: '当前没有在玩的游戏哦'
} as const

function Empty({ title, length }, { $, navigation }: Ctx) {
  global.rerender('Home.Empty')

  const styles = memoStyles()
  const { filter } = $.state
  return (
    <Flex
      style={length ? styles.top : styles.empty}
      direction='column'
      justify='center'
    >
      <Mesume size={80} />
      <Text style={styles.text} type='sub' size={13} align='center'>
        {length ? randomSpeech() : FOOTER_EMPTY_TEXT[title]}
      </Text>
      {!!filter && length <= 3 && (
        <Button
          style={styles.btn}
          type='ghostMain'
          onPress={() => {
            t('首页.再搜索', {
              type: title,
              value: filter
            })

            navigation.push('Search', {
              _type: title === '全部' ? '条目' : title,
              _value: filter
            })
          }}
        >
          前往搜索
        </Button>
      )}
    </Flex>
  )
}

export default obc(Empty)
