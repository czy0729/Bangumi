/*
 * @Author: czy0729
 * @Date: 2025-06-09 14:21:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-18 03:38:18
 */
import Crypto from '@utils/crypto'
import { Id } from '@types'

export const COMPONENT = 'Pic'

export const NUM_COLUMNS = 2

export const ITEM_MARGIN = 16

export const DECODE = {
  BASE: Crypto.get('U2FsdGVkX1821ej1UrCAbmt2N3LNN/nd4iGmBRn3/kRRTtynOAU3fO3y43XqZJ5H') as string,
  GO: Crypto.get(
    'U2FsdGVkX19vnk2JaWkcvW+JSD7V9JCGIYAk0o7CMi9/U113Ef1fugD12fiiRWzmgcr65Cv35izi8E4Lbs2e8w=='
  ) as string,
  START: Crypto.get('U2FsdGVkX1/P8ir0kD1gMSn2Fzyd7pzLcMb+/sqJV+tuTsMXh+0g682wtRdM5gMg') as string,
  END: Crypto.get(
    'U2FsdGVkX19SbbeulS6D6PwdWQv18Vg0tjHjuLhwPdQfn/usdyfY5ralrJKN19We7YU0nMxmhEi6ptjGPR7+OA=='
  ) as string,
  CATE: Crypto.get('U2FsdGVkX1+9Ge+gmkYPSgNOuKSTBmbXvENLmV5yPhU=') as string,
  NUM: Crypto.get('U2FsdGVkX187Exptse19agHhh+QbMYw2+Pll1zcTQtk=') as string,
  PAGE_TOTAL: Crypto.get('U2FsdGVkX19cOt1GWU/MGZWlzr6WGSTYX7EJuh0FlGs=') as string,
  SRC: Crypto.get('U2FsdGVkX189CcuNwbF7lq7jvJXpTBd/b7S2BIVeTTg=') as string,
  URI: Crypto.get(
    'U2FsdGVkX19uAqpov9MSMl/o3juIgzNsMTKTXKvbukkzowv9oU8oZutdx/K1MrVsrxHZya3gR7JH8w406QXWf/iRQQqfTqgqZYMkeLGx7wtHkmEb6dbPpw//6L3hZ+qu35Zwv58nuw6aDhg77TX88Q=='
  ) as string
} as const

export const HOST = DECODE.BASE

export const HOST_INFO = (id: Id) => `${HOST}/${id}.html`

export const HOST_URL = (id: Id) => `${DECODE.GO}/${id}.jpg`

export const PROGRESS_LIMIT = 4

export const TEXT_USER_ABORT = '实验性功能暂只支持登录用户使用'

export const TEXT_USER_LIMIT = '普通用户组暂只开放两页'

export const TEXT_FETCHING_WAIT = '请等待先前的请求'

export const TEXT_FETCHING_ABORT = '请等待先前的请求后，再进入此页面'

export const TEXT_FETCHING_INTERCEPT = '为了保证数据完整，请等待请求结束后，再进行跳转'
