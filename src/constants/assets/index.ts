/*
 * @Author: czy0729
 * @Date: 2023-11-02 17:15:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 05:40:44
 */
import { HOST_DOGE } from '../cdn'
import { WEB } from '../device'

// @ts-ignore
const ENV_STORYBOOK_DEV = WEB && window?.CONFIG_TYPE === 'DEVELOPMENT'

/** 年鉴封面 */
export const ASSETS_AWARDS = {
  2024: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/static/2024.png`
    : (require('@assets/images/static/2024.png') as number),
  2022: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/static/2022.png`
    : (require('@assets/images/static/2022.png') as number),
  2021: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/static/2021.png`
    : (require('@assets/images/static/2021.png') as number),
  2020: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/static/2020.png`
    : (require('@assets/images/static/2020.png') as number),
  2019: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/static/2019.png`
    : (require('@assets/images/static/2019.png') as number),
  2018: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/static/2018.png`
    : (require('@assets/images/static/2018.png') as number)
} as const

/** 看板娘表情 */
export const ASSETS_MUSUMES = {
  1: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/musume/musume1.png`
    : (require('@assets/images/musume/musume1.png') as number),
  2: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/musume/musume2.png`
    : (require('@assets/images/musume/musume2.png') as number),
  3: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/musume/musume3.png`
    : (require('@assets/images/musume/musume3.png') as number),
  4: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/musume/musume4.png`
    : (require('@assets/images/musume/musume4.png') as number),
  5: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/musume/musume5.png`
    : (require('@assets/images/musume/musume5.png') as number),
  6: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/musume/musume6.png`
    : (require('@assets/images/musume/musume6.png') as number),
  7: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/musume/musume7.png`
    : (require('@assets/images/musume/musume7.png') as number)
} as const

/** 本地管理图标 */
export const ASSETS_ICONS = {
  file: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/cloud/file.png`
    : (require('@assets/cloud/file.png') as number),
  open: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/cloud/folder.png`
    : (require('@assets/cloud/folder.png') as number),
  folder: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/cloud/folder.png`
    : (require('@assets/cloud/folder.png') as number),
  music: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/cloud/music.png`
    : (require('@assets/cloud/music.png') as number),
  pic: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/cloud/pic.png`
    : (require('@assets/cloud/pic.png') as number),
  video: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/cloud/video.png`
    : (require('@assets/cloud/video.png') as number),
  zip: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/cloud/zip.png`
    : (require('@assets/cloud/zip.png') as number),
  origin: ENV_STORYBOOK_DEV
    ? `${HOST_DOGE}/assets/cloud/origin.png`
    : (require('@assets/cloud/origin.png') as number)
} as const
