/*
 * @Author: czy0729
 * @Date: 2022-08-06 13:10:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-06 13:11:46
 */
import Crypto from '../crypto'

export const OAUTH_DATA = Crypto.get<object>(
  // eslint-disable-next-line max-len
  'U2FsdGVkX1+2Hf/JvbnfvOEdqz5ayd5qAAcIjXSSMc8yHARLhUWTUgLL0prbV6o2QEOp1xRe5OVIr1+SFUb1T610pgaGCNnChIAxe3V6PKvOjYTmjGpp9wwWunmuR3HgIUzoNydW37XAONnhIoifG3BIR4ZzzDgxE4xKVSIYUTYjgKCmVkyzDRA6f+i0lUAve5YUmjb1xp5rORzJK5nCHrdUiDuzOf//FnKCVXCLMuYflrgcLRfVblZvVI975ODFGhV6oTMSNb3bKpBDZTF/0F3MsN5l5SA90+4WQBZfYFLYXs3OqdPuEyrspSYJHF/w7DUOKzjfLQBw899UFtAG1Gf1d5gSl72b/xJWy4JfCTZdUNu/Gij3E3ASlY8IX/TEQNna468/goYWCRKZKbVWl4vW9Aw0eEb9YXwpCvooFlo='
)

export const REPO_DATA = {
  owner: 'hjbgjuh555',
  repo: 'bangumi-micro'
} as const
