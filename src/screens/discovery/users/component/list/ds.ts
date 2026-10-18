/*
 * @Author: czy0729
 * @Date: 2026-01-02 16:43:08
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-01-02 16:43:08
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

/** 帖子地址标识: 命中为讨论帖, 否则为小组 */
export const TOPIC_PATH = '/group/topic/'
