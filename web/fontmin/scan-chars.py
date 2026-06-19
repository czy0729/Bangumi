#!/usr/bin/env python3
"""
扫描项目源码中所有实际使用的字符，输出到 chars-from-source.txt。
配合 common-chars.txt 使用，确保字体子集覆盖所有 UI 中出现的字符。
"""

import os
import sys

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
SRC_DIR = os.path.join(PROJECT_ROOT, "src")
OUTPUT = os.path.join(os.path.dirname(__file__), "chars-from-source.txt")

EXTENSIONS = {".ts", ".tsx", ".js", ".jsx", ".json"}
SKIP_DIRS = {"node_modules", ".git", "__tests__", "__mocks__"}


def scan():
    chars = set()

    for root, dirs, files in os.walk(SRC_DIR):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for fname in files:
            if os.path.splitext(fname)[1] in EXTENSIONS:
                fpath = os.path.join(root, fname)
                try:
                    with open(fpath, "r", encoding="utf-8") as f:
                        for ch in f.read():
                            if ord(ch) >= 32:
                                chars.add(ch)
                except Exception:
                    pass

    sorted_chars = sorted(chars, key=lambda c: ord(c))

    with open(OUTPUT, "w", encoding="utf-8") as f:
        f.write("".join(sorted_chars))

    cjk = sum(1 for c in sorted_chars if 0x4E00 <= ord(c) <= 0x9FFF)
    total = len(sorted_chars)
    print(f"扫描完成: {total} 个唯一字符 (CJK: {cjk})")
    print(f"已写入: {OUTPUT}")


if __name__ == "__main__":
    scan()
