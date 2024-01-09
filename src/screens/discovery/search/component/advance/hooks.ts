/*
 * @Author: czy0729
 * @Date: 2024-01-09 04:22:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 04:26:56
 */
import { useEffect, useRef, useState } from 'react'
import { asc, t2s } from '@utils'
import { decode, get } from '@utils/protobuf'
import { SearchCat } from '@types'

const searchMap = new Map<string, any[]>()
let anime = {}
let book = {}
let game = {}

export function useResult(cat: SearchCat, value: string) {
  const [result, setResult] = useState<string[]>([])
  const substrings = useRef({})
  useEffect(() => {
    async function callback() {
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
          await decode('bangumi-data')
          const bangumiDataMap = {}
          const bangumiData = get('bangumi-data')
          bangumiData.forEach((item: { j: string; c?: string; id: any }) => {
            bangumiDataMap[item.c || item.j] = item.id
          })
          anime = {
            ...bangumiDataMap,
            ...require('@assets/json/substrings/anime.json'),
            ...require('@assets/json/substrings/alias.json')
          }
        }

        if (searchMap.has(_value)) {
          setResult(searchMap.get(_value))
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
          if (_result.length >= 10) return
          if (item.toLocaleUpperCase().includes(_value)) _result.push(item)
        })

        setResult(_result)
        searchMap.set(_value, _result)
      } catch (error) {}
    }
    callback()
  }, [cat, value])

  return {
    result,
    substrings
  }
}
