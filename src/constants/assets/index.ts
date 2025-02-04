/*
 * @Author: czy0729
 * @Date: 2023-11-02 17:15:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-27 15:36:14
 */
import { HOST_DOGE } from '../cdn'
import { WEB } from '../device'

// @ts-ignore
const ENV_STORYBOOK_DEV = WEB && window?.CONFIG_TYPE === 'DEVELOPMENT'

/** 年鉴封面 */
export const ASSETS_AWARDS = {
  2024: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/static/2024.png`
    : require('@assets/images/static/2024.png'),
  2022: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/static/2022.png`
    : require('@assets/images/static/2022.png'),
  2021: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/static/2021.png`
    : require('@assets/images/static/2021.png'),
  2020: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/static/2020.png`
    : require('@assets/images/static/2020.png'),
  2019: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/static/2019.png`
    : require('@assets/images/static/2019.png'),
  2018: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/static/2018.png`
    : require('@assets/images/static/2018.png')
} as const

/** 看板娘表情 */
export const ASSETS_MUSUMES = {
  1: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/musume/musume1.png`
    : require('@assets/images/musume/musume1.png'),
  2: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/musume/musume2.png`
    : require('@assets/images/musume/musume2.png'),
  3: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/musume/musume3.png`
    : require('@assets/images/musume/musume3.png'),
  4: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/musume/musume4.png`
    : require('@assets/images/musume/musume4.png'),
  5: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/musume/musume5.png`
    : require('@assets/images/musume/musume5.png'),
  6: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/musume/musume6.png`
    : require('@assets/images/musume/musume6.png'),
  7: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/musume/musume7.png`
    : require('@assets/images/musume/musume7.png')
} as const

/** 本地管理图标 */
export const ASSETS_ICONS = {
  file: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/cloud/file.png`
    : require('@assets/cloud/file.png'),
  open: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/cloud/folder.png`
    : require('@assets/cloud/folder.png'),
  folder: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/cloud/folder.png`
    : require('@assets/cloud/folder.png'),
  music: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/cloud/music.png`
    : require('@assets/cloud/music.png'),
  pic: ENV_STORYBOOK_DEV ? `${HOST_DOGE}/assets/cloud/pic.png` : require('@assets/cloud/pic.png'),
  video: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/cloud/video.png`
    : require('@assets/cloud/video.png'),
  zip: ENV_STORYBOOK_DEV ? `${HOST_DOGE}/assets/cloud/zip.png` : require('@assets/cloud/zip.png'),
  origin: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/cloud/origin.png`
    : require('@assets/cloud/origin.png')
} as const
