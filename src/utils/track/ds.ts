/*
 * @Author: czy0729
 * @Date: 2022-09-29 20:02:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-03 00:46:17
 */
import { IOS_IPA } from '@/config'
import { WSA, STORYBOOK } from '@constants/device'
import { IOS } from '@constants/constants'
import { window } from '../../styles/layout'
import { get } from '../crypto'

/** ==================== config ==================== */
export const API_XHR = get(
  'U2FsdGVkX1+a93cztL9GRZu6PqaUn6nezzgGnrkiwFfY4Hx3qtN4V9AZ0wkiaLHp'
) as string

export const API_UMAMI = get(
  'U2FsdGVkX1+j4wg7tR181LgCysZtPjXyYGuey5IVBg1UI0of3s7dp99CvxSH1pOYkFg9pfeccmy55ERcMHHHNw=='
) as string

export const TITLE = 'Bangumi 番组计划'

export const TIMEOUT = 2000

export const SCREEN = `${window.width}x${window.height}`

/** ==================== hm ==================== */
const SI_WSA = 'b0f22537130c960c2a12a184638f748a'

const SI_IOS = '8f9e60c6b1e92f2eddfd2ef6474a0d11'

const SI_ANDROID = '2dcb6644739ae08a1748c45fb4cea087'

/** @deprecated */
export const SI = WSA ? SI_WSA : IOS ? SI_IOS : SI_ANDROID

export const SI_UV = 'a69e268f29c60e0429a711037f9c48b0'

export const SI_ERROR = '00da9670516311c9b9014c067022f55c'

/** ==================== umami ==================== */
const WEBSITE_ANDROID = 'ce929b24-f54b-4f82-9559-88261b437ba6'

const WEBSITE_IOS = 'e12e0585-df54-41ce-88c9-3a7da747f90d'

const WEBSITE_IPA = '5b490fda-9467-4343-92a4-5b845934081f'

const WEBSITE_WEB = '5ab772a6-b40d-44c4-ad6c-c241b425ed33'

const WEBSITE_WSA = '5df0b010-8042-4e39-9586-7b6e4050313f'

export const WEBSITE = STORYBOOK
  ? WEBSITE_WEB
  : WSA
  ? WEBSITE_WSA
  : IOS_IPA
  ? WEBSITE_IPA
  : IOS
  ? WEBSITE_IOS
  : WEBSITE_ANDROID

export const WEBSITE_FATAL_ERROR = 'a8d71a9c-3333-45ca-b223-59600d84b76a'
