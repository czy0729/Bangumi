/*
 * @Author: czy0729
 * @Date: 2022-07-30 16:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-15 07:29:21
 */
import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { Flex, Highlight, Touchable, Iconfont } from '@components'
import { asc, t2s } from '@utils'
import { useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import { memoStyles } from './styles'

const SEARCH_CACHE = {}
let anime = {}
let book = {}
let game = {}

function Advance({ navigation, cat, value, onSubmit }) {
  const [result, setResult] = useState([])
  const substrings = useRef({})

  useEffect(() => {
    try {
      const _value = t2s(value.toLocaleUpperCase()).trim()
      if (!_value) {
        setResult([])
        return
      }

      if (value && cat === 'subject_1' && !Object.keys(book).length) {
        book = require('@assets/json/substrings/book.json')
      } else if (value && cat === 'subject_4' && !Object.keys(game).length) {
        game = require('@assets/json/substrings/game.json')
      } else if (value && !Object.keys(anime).length) {
        anime = {
          ...require('@assets/json/substrings/alias.json'),
          ...require('@assets/json/substrings/anime.json')
        }
      }

      if (SEARCH_CACHE[_value]) {
        setResult(SEARCH_CACHE[_value])
        return
      }

      let cns = []
      if (value && cat === 'subject_1') {
        cns = Object.keys(book).sort((a, b) => asc(a.length, b.length))
        substrings.current = book
      } else if (value && cat === 'subject_4') {
        cns = Object.keys(game).sort((a, b) => asc(a.length, b.length))
        substrings.current = game
      } else if (value) {
        cns = Object.keys(anime).sort((a, b) => asc(a.length, b.length))
        substrings.current = anime
      }

      const _result = []
      cns.forEach(item => {
        if (_result.length >= 8) return
        if (item.toLocaleUpperCase().includes(_value)) _result.push(item)
      })
      setResult(_result)
      SEARCH_CACHE[_value] = _result
    } catch (error) {}
  }, [cat, value])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <View>
        {result.map(item => (
          <View key={item} style={styles.item}>
            <Flex style={styles.content}>
              <Flex.Item>
                <Touchable
                  onPress={() => {
                    onSubmit(item)

                    t('搜索.模糊查询点击', {
                      text: t2s(value.toLocaleUpperCase()).trim()
                    })
                  }}
                >
                  <Highlight size={15} bold value={value} numberOfLines={1}>
                    {item}
                  </Highlight>
                </Touchable>
              </Flex.Item>
              <Touchable style={styles.search} onPress={() => onSubmit(item)}>
                <Iconfont name='md-search' />
              </Touchable>
              <Touchable
                style={styles.open}
                onPress={() => {
                  const subjectId = substrings.current[item]
                  navigation.push('Subject', {
                    subjectId
                  })

                  t('搜索.模糊查询跳转', {
                    subjectId
                  })
                }}
              >
                <Iconfont name='md-open-in-new' size={19} />
              </Touchable>
            </Flex>
          </View>
        ))}
      </View>
    )
  })
}

export default Advance
