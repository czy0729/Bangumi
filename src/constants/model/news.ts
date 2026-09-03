/*
 * @Author: czy0729
 * @Date: 2026-09-03 23:13:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:13:41
 *
 * 字典 - 文章站点
 */
import Crypto from '@utils/crypto'
import { Model } from './utils'

export const NEWS = JSON.parse(
  Crypto.get<string>(
    // eslint-disable-next-line max-len
    'U2FsdGVkX1+mi5zvVK91B2Q/FvysZgVaiiB99p5gVJeySFs4PNvJtTZZ0sUuo6AodE3MaQlSeHQOgizHPewRmOuoov7dPj24LkH0WApwp68P2wKL/SnjkyqapFTU0lDNwbj3YMvG+P1+yPUbXFydIRk9AYwiaTLUGliJWWv0gB2SSuZtp/3k0Orwm/4mjcRmIt/5pWI2Eli9qx9FLuNj0BQSKlhQc6yljQ0vFNNDSAprZeWp9Kj9TlDBOvEpSd1hGX57KXxNF6mUo5Mjj/ofOQ8V/B2OkyU9K/3urYpaoHreJ7oBkH1NDqQVAYw/D8huqlUsW6vFZeWlxJT9ubyUIGRAZH0WDPswUqQjF6wCY5zRAzbQM351MadSNsVeWvwzpSBigS8oLBHI3qpG3gpgKW6Ws8+BD7igAUTlk8vDOujgE2K1WbU455n5pp/t+P87eCA3p62nc32ArHDSY6qb3w=='
  )
) as {
  /** 站点 */
  label: string

  /** 地址 */
  value: string

  /** 来源 */
  title: string
}[]

/** 文章站点 */
export const MODEL_NEWS = new Model(NEWS, 'NEWS')
