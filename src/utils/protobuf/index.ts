/*
 * @Author: czy0729
 * @Date: 2023-12-07 21:42:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-09 01:38:31
 */
import { Decode, Get } from './types'

/**
 * 解码数据
 *  - 同时多个同样的请求, 只会触发第一次请求, 后到的会持续等待到 promise 返回
 *  - 请求过的结果会缓存
 * */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const decode: Decode = async (name: string) => {}

/** 获取数据 */
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const get: Get = async (name: string) => {}
