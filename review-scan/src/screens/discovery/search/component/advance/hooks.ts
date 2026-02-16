/*
 * @Author: czy0729
 * @Date: 2024-01-09 04:22:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-30 22:25:07
 */
import { useEffect, useRef, useState } from 'react'
import { asc, desc, t2s } from '@utils'
import { decode, get } from '@utils/protobuf'
import { loadJSON } from '@assets/json'
import { JSONMono } from '@assets/json/types'
import { SearchCat, SubjectId } from '@types'

type SubjectTitle = string
type SubStrings = Record<SubjectTitle, SubjectId>

const memo = new Map<string, SubjectTitle[]>()
let anime: SubStrings = {}
let book: SubStrings = {}
let game: SubStrings = {}

export function useResult(cat: SearchCat, value: string) {
  const [result, setResult] = useState<SubjectTitle[]>([])
  const substrings = useRef(cat === 'subject_1' ? book : cat === 'subject_4' ? game : anime)

  useEffect(() => {
    if (value.length < 2) return

    async function callback() {
      try {
        const _value = t2s(value.toLocaleUpperCase()).trim()
        if (!_value) {
          setResult([])
          return
        }

        if (value && cat === 'subject_1' && !Object.keys(book).length) {
          book = await loadJSON('substrings/book')
        } else if (value && cat === 'subject_4' && !Object.keys(game).length) {
          game = await loadJSON('substrings/game')
        } else if (value && !Object.keys(anime).length) {
          await decode('bangumi-data')
          const bangumiDataMap = {}
          const bangumiData = get('bangumi-data')
          bangumiData.forEach((item: { j: string; c?: string; id: any }) => {
            bangumiDataMap[item.c || item.j] = item.id
          })

          anime = {
            ...bangumiDataMap,
            ...(await loadJSON('substrings/anime')),
            ...(await loadJSON('substrings/alias'))
          }
        }

        if (memo.has(_value)) {
          setResult(memo.get(_value))
          return
        }

        let cns: SubjectTitle[] = []
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

        const _result: SubjectTitle[] = []
        cns.forEach(item => {
          if (_result.length >= 10) return
          if (item.toLocaleUpperCase().includes(_value)) _result.push(item)
        })
        _result.sort((a, b) => desc(substrings.current[a], substrings.current[b]))

        setResult(_result)
        memo.set(_value, _result)
      } catch (error) {}
    }
    callback()
  }, [cat, value])

  return {
    result: result || [],
    substrings
  }
}

const memoMono = new Map<string, JSONMono>()
let mono: JSONMono = []

export function useMonoResult(value: string) {
  const [result, setResult] = useState<JSONMono>([])

  useEffect(() => {
    if (value.length < 1) return

    async function callback() {
      try {
        const q = t2s(value.toLocaleUpperCase()).trim()
        if (!q) {
          setResult([])
          return
        }

        if (value && !mono.length) {
          mono = await loadJSON('mono')
        }

        if (memo.has(q)) {
          setResult(memoMono.get(q))
          return
        }

        const result: JSONMono = []
        mono.forEach(item => {
          if (result.length >= 10) return
          if (item.n.toLocaleUpperCase().includes(q)) result.push(item)
        })

        setResult(result)
        memoMono.set(q, result)
      } catch (error) {}
    }
    callback()
  }, [value])

  return result || []
}
