/*
 * @Author: czy0729
 * @Date: 2022-12-08 10:41:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-06 20:45:25
 */
import { useEffect, useState } from 'react'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatusCn, CollectionStatusValue, SubjectTypeCn } from '@types'

export function actionStatus(type: CollectionStatusValue | '', typeCn: SubjectTypeCn) {
  let status = MODEL_COLLECTION_STATUS.getLabel<CollectionStatusCn>(type) || ''
  if (typeCn === '书籍') status = status.replace('看', '读')
  else if (typeCn === '游戏') status = status.replace('看', '玩')
  else if (typeCn === '音乐') status = status.replace('看', '听')
  return status
}

function fixedStatus(str: string) {
  return String(str)
    .replace(/读|玩|听/g, '看')
    .trim()
}

export function getSelectStatus(a: string, b: string) {
  const _a = fixedStatus(a)
  const _b = fixedStatus(b)
  return {
    select: _a !== _b,
    value: b
  }
}

/**
 * @param {*} bili 1: '想看', 2: '在看', 3: '看过'
 * @param {*} bgm  1: '想看', 2: '看过', 3: '在看'
 */
export function useSelectStatus(bili, bgm) {
  const [data, setData] = useState<any>(getSelectStatus(bili, bgm).select)
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

export function getSelectTags(bili, bgm) {
  const _bili = String(bili || '')
  const _bgm = String(bgm || '')
  return {
    select: !_bgm && !!_bili,
    value: _bili
  }
}

export function useSelectTags(bili, bgm) {
  const [data, setData] = useState<any>(getSelectTags(bili, bgm).select)
  useEffect(() => {
    setData(getSelectTags(bili, bgm).select)
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
