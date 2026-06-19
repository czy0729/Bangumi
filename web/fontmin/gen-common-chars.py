#!/usr/bin/env python3
"""
生成常用字表 common-chars.txt。
包含:
  - 基本拉丁 (A-Z, a-z, 0-9, 标点)
  - Latin-1 Supplement (带重音的字母)
  - 通用标点
  - CJK 标点、符号
  - 日文平假名 + 片假名
  - GB2312 一级字 (最常用 3755 字)
  - GB2312 二级字 (次常用 3008 字，可选)
  - 常用特殊符号
"""

import os
import struct

OUTPUT = os.path.join(os.path.dirname(__file__), "common-chars.txt")


def basic_latin():
    """A-Z, a-z, 0-9, 常用 ASCII 标点"""
    chars = []
    # printable ASCII (0x20 - 0x7E)
    for cp in range(0x20, 0x7F):
        chars.append(chr(cp))
    return chars


def latin_supplement():
    """Latin-1 Supplement: 带重音的字母 (à, é, ü 等)"""
    chars = []
    for cp in range(0xA0, 0x100):
        chars.append(chr(cp))
    return chars


def general_punctuation():
    """通用标点: – — '' "" … ‰ ‱ ′ ″ 等"""
    chars = []
    for cp in range(0x2000, 0x2070):
        chars.append(chr(cp))
    # 追加一些常用的
    for cp in [0x20AC, 0x2103, 0x2109, 0x2116, 0x2121, 0x2122, 0x2126]:
        chars.append(chr(cp))
    return chars


def cjk_symbols():
    """CJK 符号和标点 (U+3000-303F)"""
    chars = []
    for cp in range(0x3000, 0x3040):
        chars.append(chr(cp))
    return chars


def hiragana():
    """平假名 (U+3040-309F)"""
    chars = []
    for cp in range(0x3040, 0x30A0):
        chars.append(chr(cp))
    return chars


def katakana():
    """片假名 (U+30A0-30FF)"""
    chars = []
    for cp in range(0x30A0, 0x3100):
        chars.append(chr(cp))
    return chars


def cjk_enclosed():
    """CJK 括号数字: ①②...⑳ ⑴⑵...⒇ etc."""
    chars = []
    for cp in range(0x3200, 0x3300):
        chars.append(chr(cp))
    return chars


def enclosed_alphanumerics():
    """带圈字母数字: ⒜⒝... ⒜⒝... ⓵⓶..."""
    chars = []
    for cp in range(0x2460, 0x2500):
        chars.append(chr(cp))
    return chars


def dingbats():
    """常用装饰符号: ✂ ✆ ✈ ✉ ✊ ✋ 等"""
    chars = []
    for cp in range(0x2700, 0x27C0):
        chars.append(chr(cp))
    return chars


def misc_symbols():
    """杂项符号: ☀ ☁ ☂ ☃ ★ ☆ ♠ ♡ ♢ ♣ 等"""
    chars = []
    for cp in range(0x2600, 0x2700):
        chars.append(chr(cp))
    return chars


def arrows():
    """箭头: ← → ↑ ↓ ↔ ↕ ↗ ↘ 等"""
    chars = []
    for cp in range(0x2190, 0x2200):
        chars.append(chr(cp))
    return chars


def mathematical():
    """数学符号: ± × ÷ ≠ ≤ ≥ ∞ ∑ ∏ √ ∫ ≈ 等"""
    chars = []
    for cp in range(0x2200, 0x2300):
        chars.append(chr(cp))
    return chars


def gb2312_level1():
    """
    GB2312 一级字 (最常用 3755 字)。
    这些字覆盖了 99.7% 的现代汉语使用频率。
    通过 GB2312 编码范围提取: 0xA1A1-0xF7FE 中的汉字区 (0xB0A1-0xD7F9)
    """
    chars = []
    # GB2312 汉字区: 第16区到第55区 (一级字), 第56区到第87区 (二级字)
    # 一级字: 区 16-55, 每区 94 个字位
    # 编码: 高字节 = 区号 + 0xA0, 低字节 = 位号 + 0xA0
    for qu in range(16, 56):  # 区 16-55
        for wei in range(1, 95):  # 位 1-94
            high = qu + 0xA0
            low = wei + 0xA0
            gb_bytes = bytes([high, low])
            try:
                char = gb_bytes.decode("gb2312")
                chars.append(char)
            except UnicodeDecodeError:
                pass
    return chars


def gb2312_level2():
    """
    GB2312 二级字 (次常用 3008 字)。
    区 56-87。
    """
    chars = []
    for qu in range(56, 88):  # 区 56-87
        for wei in range(1, 95):
            high = qu + 0xA0
            low = wei + 0xA0
            gb_bytes = bytes([high, low])
            try:
                char = gb_bytes.decode("gb2312")
                chars.append(char)
            except UnicodeDecodeError:
                pass
    return chars


def extra_symbols():
    """项目中常见的额外符号"""
    extra = "★☆♡♥❤♪♫♬✿❀✦✧⚡⚔✊✌✨❤️⬅➡⬆⬇⭕❓❔❕❗〰〽㊗㊙🅰🅱🅾🅿🆎🆑🆘🉑💮💯🔴🟠🟡🟢🔵🟣🟤⚫⚪🟥🟧🟨🟩🟦🟪🟫⬛⬜🔶🔷🔸🔹🔺🔻💠🔘🔲🔳"
    return list(extra)


def main():
    all_chars = set()

    # 基本拉丁 + Latin Supplement
    for ch in basic_latin():
        all_chars.add(ch)
    for ch in latin_supplement():
        all_chars.add(ch)

    # 标点和符号
    for ch in general_punctuation():
        all_chars.add(ch)
    for ch in cjk_symbols():
        all_chars.add(ch)
    for ch in enclosed_alphanumerics():
        all_chars.add(ch)
    for ch in dingbats():
        all_chars.add(ch)
    for ch in misc_symbols():
        all_chars.add(ch)
    for ch in arrows():
        all_chars.add(ch)
    for ch in mathematical():
        all_chars.add(ch)
    for ch in cjk_enclosed():
        all_chars.add(ch)

    # 日文假名
    for ch in hiragana():
        all_chars.add(ch)
    for ch in katakana():
        all_chars.add(ch)

    # GB2312 一级字 (最常用 3755 字)
    level1 = gb2312_level1()
    for ch in level1:
        all_chars.add(ch)
    print(f"GB2312 一级字: {len(level1)} 字")

    # GB2312 二级字 (次常用 3008 字) - 可选
    level2 = gb2312_level2()
    for ch in level2:
        all_chars.add(ch)
    print(f"GB2312 二级字: {len(level2)} 字")

    # 额外符号
    for ch in extra_symbols():
        all_chars.add(ch)

    # 排序输出
    sorted_chars = sorted(all_chars, key=lambda c: ord(c))

    with open(OUTPUT, "w", encoding="utf-8") as f:
        f.write("".join(sorted_chars))

    cjk = sum(1 for c in sorted_chars if 0x4E00 <= ord(c) <= 0x9FFF)
    total = len(sorted_chars)
    print(f"总字符数: {total} (CJK: {cjk})")
    print(f"已写入: {OUTPUT}")


if __name__ == "__main__":
    main()
