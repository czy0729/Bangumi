/*
 * @Author: czy0729
 * @Date: 2022-12-08 10:41:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 04:03:41
 *
 * 本地备份页的列对比与数值转换工具
 */
import { useEffect, useState } from 'react'
import { MODEL_COLLECTION_STATUS } from '@constants'

import type { CollectionStatusCn, CollectionStatusValue, SubjectTypeCn } from '@types'

/**
 * CSV 数值列转数字
 *
 * @param value 单元格文本
 * @returns 空值或非法数值返回 ''
 */
export function toNum(value: string): number | '' {
  if (!value) return ''

  const num = Number(value)
  return Number.isNaN(num) ? '' : num
}

/**
 * 收藏状态按条目类型替换动词
 *
 * @param type 收藏状态值
 * @param typeCn 条目类型中文
 * @returns 收藏状态中文
 */
export function actionStatus(type: CollectionStatusValue | '', typeCn: SubjectTypeCn) {
  let status = MODEL_COLLECTION_STATUS.getLabel<CollectionStatusCn>(type) || ''
  if (typeCn === '书籍') status = status.replace('看', '读')
  else if (typeCn === '游戏') status = status.replace('看', '玩')
  else if (typeCn === '音乐') status = status.replace('看', '听')
  return status
}

/**
 * 还原成统一的「看」并去掉首尾空白, 便于跨站比较
 *
 * @param str 状态文本
 */
function fixedStatus(str: string | number) {
  return String(str)
    .replace(/读|玩|听/g, '看')
    .trim()
}

/**
 * 比较两站的收藏状态
 *
 * @param a bgm 状态
 * @param b 导入状态
 */
export function getSelectStatus(a: string, b: string) {
  const _a = fixedStatus(a)
  const _b = fixedStatus(b)
  return {
    select: _a !== _b,
    value: b
  }
}

/**
 * 收藏状态的同步选中态, 入参变化时重置
 *
 * @param bili bgm 状态
 * @param bgm 导入状态
 */
export function useSelectStatus(bili: string, bgm: string) {
  const [data, setData] = useState<boolean>(getSelectStatus(bili, bgm).select)
  useEffect(() => {
    setData(getSelectStatus(bili, bgm).select)
  }, [bili, bgm])
  return [data, setData] as const
}

/**
 * 比较两站的进度话数
 *
 * @param bili 本地进度文本或话数
 * @param bgm 导入进度
 */
export function getSelectEp(bili: string | number, bgm: string | number) {
  const _bili = Number(String(bili).match(/(\d+)话/)?.[1] || 0)
  const _bgm = Number(bgm || 0)
  return {
    select: _bili > _bgm,
    value: _bili
  }
}

/**
 * 进度话数的同步选中态, 入参变化时重置
 *
 * @param bili 本地进度
 * @param bgm 导入进度
 */
export function useSelectEp(bili: string | number, bgm: string | number) {
  const [data, setData] = useState<boolean>(getSelectEp(bili, bgm).select)
  useEffect(() => {
    setData(getSelectEp(bili, bgm).select)
  }, [bili, bgm])
  return [data, setData] as const
}

/**
 * 比较两站评分 (导入无评分且本地有分时需要同步)
 *
 * @param bili 本地评分
 * @param bgm 导入评分
 */
export function getSelectScore(bili: string | number, bgm: string | number) {
  const _bili = Number(bili || 0)
  const _bgm = Number(bgm || 0)
  return {
    select: _bgm === 0 && _bili !== 0,
    value: _bili
  }
}

/**
 * 评分的同步选中态, 入参变化时重置
 *
 * @param bili 本地评分
 * @param bgm 导入评分
 */
export function useSelectScore(bili: string | number, bgm: string | number) {
  const [data, setData] = useState<boolean>(getSelectScore(bili, bgm).select)
  useEffect(() => {
    setData(getSelectScore(bili, bgm).select)
  }, [bili, bgm])
  return [data, setData] as const
}

/**
 * 比较两站标签 (导入无标签且本地有标签时需要同步)
 *
 * @param bili 本地标签
 * @param bgm 导入标签
 */
export function getSelectTags(bili: string, bgm: string) {
  const _bili = String(bili || '')
  const _bgm = String(bgm || '')
  return {
    select: !_bgm && !!_bili,
    value: _bili
  }
}

/**
 * 标签的同步选中态, 入参变化时重置
 *
 * @param bili 本地标签
 * @param bgm 导入标签
 */
export function useSelectTags(bili: string, bgm: string) {
  const [data, setData] = useState<boolean>(getSelectTags(bili, bgm).select)
  useEffect(() => {
    setData(getSelectTags(bili, bgm).select)
  }, [bili, bgm])
  return [data, setData] as const
}

/**
 * 比较两站简评 (导入无简评且本地有简评时需要同步)
 *
 * @param bili 本地简评
 * @param bgm 导入简评
 */
export function getSelectComment(bili: string, bgm: string) {
  const _bili = String(bili || '')
  const _bgm = String(bgm || '')
  return {
    select: !_bgm && !!_bili,
    value: _bili
  }
}

/**
 * 简评的同步选中态, 入参变化时重置
 *
 * @param bili 本地简评
 * @param bgm 导入简评
 */
export function useSelectComment(bili: string, bgm: string) {
  const [data, setData] = useState<boolean>(getSelectComment(bili, bgm).select)
  useEffect(() => {
    setData(getSelectComment(bili, bgm).select)
  }, [bili, bgm])
  return [data, setData] as const
}
