#!/usr/bin/env python3

import argparse
import json
import os
import urllib.request

OWNER = "czy0729"
REPO = "Bangumi"

SOURCE_URL = f"https://raw.githubusercontent.com/{OWNER}/{REPO}/main/alt_store.json"

ICON_URL = (
    "https://raw.githubusercontent.com/"
    "czy0729/Bangumi/master/src/assets/images/foreground.png"
)

APP = {
    "name": "Bangumi",
    "bundleIdentifier": "com.czy0729.bangumi",
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


def main():
    parser = argparse.ArgumentParser()

    parser.add_argument("--version", required=True)
    parser.add_argument("--output", required=True)

    args = parser.parse_args()

    tag = f"upstream-{args.version}"

    release = github_json(
        f"https://api.github.com/repos/{OWNER}/{REPO}/releases/tags/{tag}"
    )

    ipa = None
    sha = None

    for asset in release["assets"]:
        name = asset["name"]

        if name.endswith(".ipa"):
            ipa = asset

        elif name.endswith(".ipa.sha256"):
            sha = asset

    if ipa is None:
        raise RuntimeError("IPA asset not found")

    if sha is None:
        raise RuntimeError("SHA256 asset not found")

    sha256 = download_text(sha["browser_download_url"]).split()[0]

    version_entry = {
        "version": args.version,
        "buildVersion": args.version,
        "date": release["published_at"],
        "downloadURL": ipa["browser_download_url"],
        "size": ipa["size"],
        "sha256": sha256,
        "localizedDescription": (
            release["body"] if release["body"] else f"Upstream {args.version}"
        ),
    }

    # Load existing source if available
    if os.path.exists(args.output):
        with open(args.output, "r") as f:
            source = json.load(f)

        versions = source.get("apps", [{}])[0].get("versions", [])

    else:
        source = {
            "name": "Bangumi",
            "identifier": "com.czy0729.bangumi",
            "sourceURL": SOURCE_URL,
            "apps": [{**APP, "versions": []}],
        }

        versions = []

    # Remove existing version if it already exists
    versions = [v for v in versions if v.get("version") != args.version]

    # Add new version
    versions.append(version_entry)

    # Sort newest first
    versions.sort(key=lambda x: x.get("version", ""), reverse=True)

    source["apps"][0]["versions"] = versions

    with open(args.output, "w") as f:
        json.dump(source, f, indent=2, ensure_ascii=False)

    print(f"Generated {args.output} with {len(versions)} versions")


if __name__ == "__main__":
    main()
