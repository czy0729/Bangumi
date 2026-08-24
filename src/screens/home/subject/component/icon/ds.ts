/*
 * @Author: czy0729
 * @Date: 2026-08-25 05:11:40
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-25 05:11:40
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../../ds'

export const COMPONENT = rc(PARENT, 'Icon')

export const COMPONENT_ACTIONS = rc(COMPONENT, 'Actions')

export const COMPONENT_BLOG = rc(COMPONENT, 'Blog')

export const COMPONENT_CATALOG = rc(COMPONENT, 'Catalog')

export const COMPONENT_CHARACTER = rc(COMPONENT, 'Character')

export const COMPONENT_CLOSE = rc(COMPONENT, 'Close')

export const COMPONENT_COMMENT = rc(COMPONENT, 'Comment')

export const COMPONENT_DISC = rc(COMPONENT, 'Disc')

export const COMPONENT_EP = rc(COMPONENT, 'Ep')

export const COMPONENT_EP_FILTER = rc(COMPONENT, 'EpFilter')

export const COMPONENT_FOLDER = rc(COMPONENT, 'Folder')

export const COMPONENT_GAME = rc(COMPONENT, 'Game')

export const COMPONENT_HIDDEN = rc(COMPONENT, 'Hidden')

export const COMPONENT_MANGA = rc(COMPONENT, 'Manga')

export const COMPONENT_ONLINE = rc(COMPONENT, 'Online')

export const COMPONENT_PIC = rc(COMPONENT, 'Pic')

export const COMPONENT_PREVIEW = rc(COMPONENT, 'Preview')

export const COMPONENT_PS = rc(COMPONENT, 'Ps')

export const COMPONENT_RELATION = rc(COMPONENT, 'Relation')

export const COMPONENT_REVERSE = rc(COMPONENT, 'Reverse')

export const COMPONENT_SEARCH = rc(COMPONENT, 'Search')

export const COMPONENT_SEARCH_DISC = rc(COMPONENT, 'SearchDisc')

export const COMPONENT_STAFF = rc(COMPONENT, 'Staff')

export const COMPONENT_TOPIC = rc(COMPONENT, 'Topic')

export const COMPONENT_TRANSLATE = rc(COMPONENT, 'Translate')

export const COMPONENT_VERSION = rc(COMPONENT, 'Version')

export const COMPONENT_WENKU = rc(COMPONENT, 'Wenku')

export const COMPONENT_WIKI = rc(COMPONENT, 'Wiki')

export const HIT_SLOP = {
  top: 8,
  right: 8,
  bottom: 8,
  left: 8
} as const
