#!/usr/bin/env python3

"""根据已发布的 Release 生成 AltStore 源文件 alt_store.json。"""

import argparse
import hashlib
import http.client
import json
import os
import re
import time
import urllib.error
import urllib.request

OWNER = "czy0729"
REPO = "Bangumi"

SOURCE_URL = f"https://raw.githubusercontent.com/{OWNER}/{REPO}/master/alt_store.json"

ICON_URL = (
    "https://raw.githubusercontent.com/"
    "czy0729/Bangumi/master/src/assets/images/foreground.png"
)

APP = {
    "name": "Bangumi",
    "bundleIdentifier": "tv.bangumi.czy0729",
    "developerName": "czy0729",
    "iconURL": ICON_URL,
    "localizedDescription": "Bangumi for iOS",
}

# 同时识别 upstream-x.y.z / vx.y.z / x.y.z 三种 Release 标签
VERSION_TAG = re.compile(r"^(?:upstream-|v)?(\d+\.\d+\.\d+)$")

# 缺少 .sha256 资产时改为下载 IPA 自行计算, 超过该大小的跳过
HASH_DOWNLOAD_LIMIT = 300 * 1024 * 1024

USER_AGENT = "altstore-generator"


def headers(auth=False):
    result = {"User-Agent": USER_AGENT}

    if auth:
        result["Accept"] = "application/vnd.github+json"
        token = os.getenv("GITHUB_TOKEN")
        if token:
            result["Authorization"] = f"Bearer {token}"

    return result


def open_url(url, method="GET", auth=False, timeout=60):
    req = urllib.request.Request(url, headers=headers(auth), method=method)

    return urllib.request.urlopen(req, timeout=timeout)


def read_bytes(url, auth=False, timeout=60, attempts=3):
    for attempt in range(1, attempts + 1):
        try:
            with open_url(url, auth=auth, timeout=timeout) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code not in (408, 429, 500, 502, 503, 504) or attempt == attempts:
                raise
            print(f"Retrying {url}: HTTP {e.code}")
        except (urllib.error.URLError, OSError, http.client.HTTPException) as e:
            if attempt == attempts:
                raise
            print(f"Retrying {url}: {e}")

        time.sleep(3 * attempt)


def github_json(url):
    return json.loads(read_bytes(url, auth=True))


def download_text(url):
    return read_bytes(url).decode("utf-8")


def asset_available(url):
    try:
        with open_url(url, method="HEAD") as r:
            return 200 <= r.status < 300
    except urllib.error.HTTPError as e:
        print(f"Unreachable asset {url}: HTTP {e.code}")
    except Exception as e:  # noqa: BLE001 - 网络异常一律视为不可用
        print(f"Unreachable asset {url}: {e}")

    return False


def download_sha256(url, size):
    if size > HASH_DOWNLOAD_LIMIT:
        print(f"IPA too large to hash locally, skipping: {url} ({size} bytes)")

        return None

    for attempt in range(1, 4):
        digest = hashlib.sha256()
        total = 0

        try:
            with open_url(url, timeout=300) as r:
                while True:
                    chunk = r.read(1024 * 1024)
                    if not chunk:
                        break

                    digest.update(chunk)
                    total += len(chunk)
        except (urllib.error.URLError, OSError, http.client.HTTPException) as e:
            print(f"Retrying hash download for {url}: {e}")
            time.sleep(3 * attempt)
            continue

        if total == size:
            return digest.hexdigest()

        print(f"Incomplete download for {url}: {total} of {size} bytes")
        time.sleep(3 * attempt)

    return None


def version_key(version):
    parts = []

    for part in version.split("."):
        try:
            parts.append(int(part))
        except ValueError:
            parts.append(0)

    return parts


def find_ipa(assets):
    candidates = [
        asset
        for asset in assets
        if asset["name"].endswith(".ipa") and not asset["name"].endswith(".ipa.sha256")
    ]

    if not candidates:
        return None

    candidates.sort(key=lambda asset: asset["size"], reverse=True)

    return candidates[0]


def find_sha(assets, ipa_name):
    expected = {f"{ipa_name}.sha256", "SHA256SUMS"}

    for asset in assets:
        if asset["name"] in expected:
            return asset

    return None


def collect_versions():
    versions = {}
    page = 1

    while page <= 40:
        releases = github_json(
            f"https://api.github.com/repos/{OWNER}/{REPO}/releases"
            f"?per_page=50&page={page}"
        )

        if not isinstance(releases, list):
            raise RuntimeError("Unexpected GitHub releases response")

        for release in releases:
            tag = release.get("tag_name", "")

            if release.get("draft") or release.get("prerelease"):
                continue

            match = VERSION_TAG.match(tag)
            if not match:
                continue

            version = match.group(1)
            published_at = release.get("published_at") or ""

            known = versions.get(version)
            if known and known[0] >= published_at:
                continue

            ipa = find_ipa(release.get("assets") or [])

            if ipa is None:
                print(f"Skipping {tag}: no IPA asset")
                continue

            if not asset_available(ipa["browser_download_url"]):
                print(f"Skipping {tag}: IPA asset is not downloadable")
                continue

            sha_asset = find_sha(release.get("assets") or [], ipa["name"])

            if sha_asset is not None:
                sha256 = download_text(sha_asset["browser_download_url"]).split()[0]
            else:
                sha256 = download_sha256(ipa["browser_download_url"], ipa["size"])

            if not sha256:
                print(f"Skipping {tag}: cannot resolve sha256")
                continue

            versions[version] = (
                published_at,
                {
                    "version": version,
                    "buildVersion": "1",
                    "date": published_at,
                    "downloadURL": ipa["browser_download_url"],
                    "size": ipa["size"],
                    "sha256": sha256,
                    "localizedDescription": release.get("body") or f"Upstream {version}",
                },
            )

        if len(releases) < 50:
            break

        page += 1

    result = [entry for _, entry in versions.values()]
    result.sort(key=lambda v: version_key(v["version"]), reverse=True)

    return result


def main():
    parser = argparse.ArgumentParser()

    parser.add_argument(
        "--version",
        help="Assert this version is present in the generated source (x.y.z)",
    )
    parser.add_argument("--output", required=True)

    args = parser.parse_args()

    versions = collect_versions()

    if not versions:
        raise RuntimeError("No downloadable IPA release found")

    if args.version:
        expected = args.version.strip()
        if expected.startswith("upstream-") or expected.startswith("v"):
            expected = VERSION_TAG.match(expected).group(1)

        if not any(v["version"] == expected for v in versions):
            raise RuntimeError(f"Release with a downloadable IPA not found: {expected}")

    source = {
        "name": "Bangumi",
        "identifier": "tv.bangumi.czy0729",
        "sourceURL": SOURCE_URL,
        "apps": [{**APP, "versions": versions}],
    }

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(source, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(f"Generated {args.output} with {len(versions)} versions")
    print("Newest versions: " + ", ".join(v["version"] for v in versions[:5]))


if __name__ == "__main__":
    main()
