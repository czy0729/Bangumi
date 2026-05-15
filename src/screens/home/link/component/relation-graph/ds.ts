/*
 * @Author: czy0729
 * @Date: 2025-12-14 15:06:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-16 02:07:14
 */
import { Dimensions } from 'react-native'
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'RelationGraph')

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export const SCREEN_WIDTH = screenWidth
export const SCREEN_HEIGHT = screenHeight

export const YEAR_TEXT_GAP = _.device(4, 8)

export const NODE_WIDTH = Math.floor(screenWidth * 0.56)
export const NODE_OFFSET = _.device(8, 12)

export const LINE_COLOR = 'rgba(255,255,255,0.25)'
export const LINE_GAP_Y = _.device(8, 12)
export const LINE_HEIGHT = _.device(13, 16)

export const H_OFFSET_BASE = _.device(10, 16)
export const H_OFFSET_STEP = _.device(18, 26)

export const LABEL_OFFSET_X = _.device(-5, 0)
export const START_FROM_RIGHT = true

/**
 * 若整个列表超过 NODES_FOR_SPLIT 个节点则执行以下布局逻辑
 * - [头部固定 HEAD_KEEP_COUNT 个节点]
 * - [顶部省略提示，如果中间前面有隐藏的节点，可扩展 EXPAND_STEP]
 * - [中间节点 FOCUS_WINDOW_RADIUS]
 * - [底部省略提示，如果中间后面有隐藏的节点，可扩展 EXPAND_STEP]
 * - [尾部固定 TAIL_KEEP_COUNT 个节点]
 */
export const NODES_FOR_SPLIT = 40
export const HEAD_KEEP_COUNT = 4
export const TAIL_KEEP_COUNT = 4
export const FOCUS_WINDOW_RADIUS = 10
export const EXPAND_STEP = 40
