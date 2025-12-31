/*
 * @Author: czy0729
 * @Date: 2024-01-09 04:22:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-31 06:18:56
 */
import { useEffect, useRef, useState } from 'react'
import { asc, desc, t2s } from '@utils'
import { decode, get } from '@utils/protobuf'
import { loadJSON } from '@assets/json'

import type { JSONMono } from '@assets/json/types'
import type { SearchCat, SubjectId } from '@types'

type SubjectTitle = string

type SubItem = {
  id: SubjectId
  norm: string
}

type SubStrings = Record<SubjectTitle, SubItem>

const MEMO = new Map<string, SubjectTitle[]>()
const MEMO_MONO = new Map<string, JSONMono>()
const MAX_LEN = 10

let anime: SubStrings = {}
let book: SubStrings = {}
let game: SubStrings = {}
let real: SubStrings = {}
let mono: (JSONMono[number] & { norm: string })[] = []

export function useResult(cat: SearchCat, value: string) {
  const [result, setResult] = useState<SubjectTitle[]>([])
  const substrings = useRef<Record<SubjectTitle, SubjectId>>({})

  useEffect(() => {
    if (value.length < 2) return

    const q = normalizeSearch(value)
    if (!q) {
      setResult([])
      return
    }

    ;(async () => {
      try {
        await ensureLoaded(cat)

        const store = getStore(cat)

        if (!Object.keys(substrings.current).length) {
          substrings.current = Object.fromEntries(Object.entries(store).map(([k, v]) => [k, v.id]))
        }

        const memoKey = `${cat}:${q}`
        if (MEMO.has(memoKey)) {
          setResult(MEMO.get(memoKey))
          return
        }

        const keys = Object.keys(store).sort((a, b) => asc(a.length, b.length))

        const list: SubjectTitle[] = []

        for (const k of keys) {
          if (list.length >= MAX_LEN) break
          if (store[k].norm.includes(q)) list.push(k)
        }

        list.sort((a, b) => desc(store[a].id, store[b].id))

        MEMO.set(memoKey, list)
        setResult(list)
      } catch {}
    })()
  }, [cat, value])

  return {
    result,
    substrings
  }
}

export function useMonoResult(value: string) {
  const [result, setResult] = useState<JSONMono>([])

  useEffect(() => {
    if (value.length < 1) return

    const q = normalizeSearch(value)
    if (!q) {
      setResult([])
      return
    }

    if (MEMO_MONO.has(q)) {
      setResult(MEMO_MONO.get(q))
      return
    }

    ;(async () => {
      try {
        if (!mono.length) {
          const raw = await loadJSON('mono')
          mono = raw.map(item => ({
            ...item,
            norm: normalizeSearch(item.n)
          }))
        }

        const list: JSONMono = []

        for (const item of mono) {
          if (list.length >= MAX_LEN) break
          if (item.norm.includes(q)) list.push(item)
        }

        MEMO_MONO.set(q, list)
        setResult(list)
      } catch {}
    })()
  }, [value])

  return result
}

function normalizeSearch(value: string) {
  return t2s(value).toLocaleUpperCase().replace(/\s+/g, '')
}

function getStore(cat: SearchCat) {
  if (cat === 'subject_1') return book
  if (cat === 'subject_4') return game
  if (cat === 'subject_6') return real
  return anime
}

function setStore(cat: SearchCat, data: SubStrings) {
  if (cat === 'subject_1') book = data
  else if (cat === 'subject_4') game = data
  else if (cat === 'subject_6') real = data
  else anime = data
}

function buildStore(raw: Record<string, SubjectId>): SubStrings {
  const store: SubStrings = {}
  Object.entries(raw).forEach(([title, id]) => {
    store[title] = {
      id,
      norm: normalizeSearch(title)
    }
  })
  return store
}

async function ensureLoaded(cat: SearchCat) {
  const store = getStore(cat)
  if (Object.keys(store).length) return

  if (cat === 'subject_1') {
    const raw = await loadJSON('substrings/book')
    setStore(cat, buildStore(raw))
    return
  }

  if (cat === 'subject_4') {
    const raw = await loadJSON('substrings/game')
    setStore(cat, buildStore(raw))
    return
  }

  if (cat === 'subject_6') {
    const raw = await loadJSON('substrings/real')
    setStore(cat, buildStore(raw))
    return
  }

  await decode('bangumi-data')

  const map: Record<string, SubjectId> = {}
  get('bangumi-data').forEach((item: { j: string; c?: string; id: SubjectId }) => {
    map[item.c || item.j] = item.id
  })

  const animeRaw = {
    ...map,
    ...(await loadJSON('substrings/anime')),
    ...(await loadJSON('substrings/alias'))
  }

  setStore(cat, buildStore(animeRaw))
}
