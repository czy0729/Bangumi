/*
 * @Author: czy0729
 * @Date: 2023-12-16 10:35:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 10:35:35
 */
import Anitabi from '../anitabi'
import Lock from '../lock'
import Box from '../box'
import Ep from '../ep'
import SMB from '../smb'
import Tags from '../tags'
import Summary from '../summary'
import Thumbs from '../thumbs'
import Game from '../game'
import Info from '../info'
import Rating from '../rating'
import Character from '../character'
import Staff from '../staff'
import Relations from '../relations'
import Comic from '../comic'
import Catalog from '../catalog'
import Like from '../like'
import Recent from '../recent'
import Blog from '../blog'
import Topic from '../topic'
import TrackComment from '../track-comment'
import Comment from '../comment'

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
