/*
 * @Author: czy0729
 * @Date: 2022-04-26 16:58:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 19:34:53
 */
import { useState, useEffect } from 'react'
import { MODEL_COLLECTION_STATUS } from '@constants'

export function getSelectStatus(bili, bgm) {
  const _bili = Number(bili || 0)
  let _bgm = Number(MODEL_COLLECTION_STATUS.getTitle(bgm) || 0)
  if (_bgm === 3) {
    _bgm = 2
  } else if (_bgm === 2) {
    _bgm = 3
  }

  let select
  if (_bgm >= 3) {
    select = false
  } else {
    select = _bili > _bgm
  }

  return {
    select,
    value: _bili
  }
}

/**
 * @param {*} bili 1: '想看', 2: '在看', 3: '看过'
 * @param {*} bgm  1: '想看', 2: '看过', 3: '在看'
 */
export function useSelectStatus(bili, bgm) {
  const [data, setData] = useState(getSelectStatus(bili, bgm).select)
  useEffect(() => {
    setData(getSelectStatus(bili, bgm).select)
  }, [bili, bgm])
  return [data, setData]
}

export function getSelectEp(bili, bgm) {
  const _bili = Number(String(bili).match(/(\d+)话/)?.[1] || 0)
  const _bgm = Number(bgm || 0)
  return {
    select: _bili > _bgm,
    value: _bili
  }
}

export function useSelectEp(bili, bgm) {
  const [data, setData] = useState<any>(getSelectEp(bili, bgm).select)
  useEffect(() => {
    setData(getSelectEp(bili, bgm).select)
  }, [bili, bgm])
  return [data, setData]
}

export function getSelectScore(bili, bgm) {
  const _bili = Number(bili || 0)
  const _bgm = Number(bgm || 0)
  return {
    select: _bgm === 0 && _bili !== 0,
    value: _bili
  }
}

export function useSelectScore(bili, bgm) {
  const [data, setData] = useState<any>(getSelectScore(bili, bgm).select)
  useEffect(() => {
    setData(getSelectScore(bili, bgm).select)
  }, [bili, bgm])
  return [data, setData]
}

export function getSelectComment(bili, bgm) {
  const _bili = String(bili || '')
  const _bgm = String(bgm || '')
  return {
    select: !_bgm && !!_bili,
    value: _bili
  }
}

export function useSelectComment(bili, bgm) {
  const [data, setData] = useState<any>(getSelectComment(bili, bgm).select)
  useEffect(() => {
    setData(getSelectComment(bili, bgm).select)
  }, [bili, bgm])
  return [data, setData]
}
