#!/usr/bin/env python3

import argparse
import json
import os
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


def github_json(url):
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "altstore-generator",
    }

    token = os.getenv("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"

    req = urllib.request.Request(url, headers=headers)

    with urllib.request.urlopen(req) as r:
        return json.load(r)


def download_text(url):
    with urllib.request.urlopen(url) as r:
        return r.read().decode("utf-8")


def version_key(version):
    parts = []

    for part in version.split("."):
        try:
            parts.append(int(part))
        except ValueError:
            parts.append(0)

    return parts


def find_assets(assets):
    ipa = None
    sha = None

    for asset in assets:
        name = asset["name"]

        if name.endswith(".ipa"):
            ipa = asset

        elif name.endswith(".ipa.sha256"):
            sha = asset

    return ipa, sha


def collect_versions(current_version):
    versions = []
    page = 1

    while page <= 10:
        releases = github_json(
            f"https://api.github.com/repos/{OWNER}/{REPO}/releases"
            f"?per_page=100&page={page}"
        )

        for release in releases:
            tag = release.get("tag_name", "")

            if not tag.startswith("upstream-") or release.get("draft"):
                continue

            version = tag[len("upstream-"):]

            ipa, sha = find_assets(release.get("assets", []))

            if ipa is None or sha is None:
                print(f"Skipping {tag}: missing IPA or SHA256 asset")
                continue

            sha256 = download_text(sha["browser_download_url"]).split()[0]

            body = release.get("body")

            versions.append(
                {
                    "version": version,
                    "buildVersion": "1",
                    "date": release["published_at"],
                    "downloadURL": ipa["browser_download_url"],
                    "size": ipa["size"],
                    "sha256": sha256,
                    "localizedDescription": (
                        body if body else f"Upstream {version}"
                    ),
                }
            )

        if len(releases) < 100:
            break

        page += 1

    if not any(v["version"] == current_version for v in versions):
        raise RuntimeError(
            f"Release with IPA and SHA256 assets not found for upstream-{current_version}"
        )

    versions.sort(key=lambda v: version_key(v["version"]), reverse=True)

    return versions


def main():
    parser = argparse.ArgumentParser()

    parser.add_argument("--version", required=True)
    parser.add_argument("--output", required=True)

    args = parser.parse_args()

    versions = collect_versions(args.version)

    source = {
        "name": "Bangumi",
        "identifier": "tv.bangumi.czy0729",
        "sourceURL": SOURCE_URL,
        "apps": [{**APP, "versions": versions}],
    }

    with open(args.output, "w") as f:
        json.dump(source, f, indent=2, ensure_ascii=False)

    print(f"Generated {args.output} with {len(versions)} versions")


if __name__ == "__main__":
    main()
