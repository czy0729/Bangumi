/*
 * @Author: czy0729
 * @Date: 2023-12-16 10:35:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-12 15:34:03
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'
import Anitabi from '../anitabi'
import Blog from '../blog'
import Box from '../box'
import Catalog from '../catalog'
import Character from '../character'
import Comic from '../comic'
import Comment from '../comment'
import Ep from '../ep'
import Game from '../game'
import Info from '../info'
import Like from '../like'
import Lock from '../lock'
import Rating from '../rating'
import Recent from '../recent'
import Relations from '../relations'
import SMB from '../smb'
import Staff from '../staff'
import Summary from '../summary'
import Tags from '../tags'
import Thumbs from '../thumbs'
import Topic from '../topic'
import TrackComment from '../track-comment'

export const COMPONENT = rc(PARENT, 'HeaderComponent')

export const TopEls = [Lock, Box, Ep, SMB, Tags, Summary, Thumbs, Info] as const

export const BottomEls = [
  Game,
  Rating,
  Character,
  Staff,
  Anitabi,
  Comic,
  Relations,
  Catalog,
  Like,
  Blog,
  Topic,
  Recent,
  Comment,
  TrackComment
] as const
