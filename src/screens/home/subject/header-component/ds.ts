/*
 * @Author: czy0729
 * @Date: 2023-12-16 10:35:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 00:38:55
 */
import { rc } from '@utils/dev'
import Anitabi from '../component/anitabi'
import Blog from '../component/blog'
import Box from '../component/box'
import Catalog from '../component/catalog'
import Character from '../component/character'
import Comic from '../component/comic'
import Comment from '../component/comment'
import Ep from '../component/ep'
import Game from '../component/game'
import Info from '../component/info'
import Like from '../component/like'
import Lock from '../component/lock'
import Rating from '../component/rating'
import Recent from '../component/recent'
import Relations from '../component/relations'
import SMB from '../component/smb'
import Staff from '../component/staff'
import Summary from '../component/summary'
import Tags from '../component/tags'
import Thumbs from '../component/thumbs'
import Topic from '../component/topic'
import TrackComment from '../component/track-comment'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'HeaderComponent')

export const TopEls = [
  Lock,
  Box,
  Ep,
  SMB,
  Tags,
  Summary,
  Thumbs,
  Info,
  Game,
  Rating,
  Character,
  Staff
] as const

export const BottomEls = [
  Anitabi,
  Relations,
  Comic,
  Catalog,
  Like,
  Blog,
  Topic,
  Recent,
  Comment,
  TrackComment
] as const
