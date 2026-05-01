# Quantumult X Snippet

This repo contains one QX-style snippet converted from the provided Loon rules:

- `PinDuoDuo.ADBlock.snippet`

Notes:

- The snippet uses the common QX release style with `#!meta`, `#[filter_local]`, `#[rewrite_local]`, and `#[mitm]`.
- The original Loon rule `AND,((DOMAIN,api.pinduoduo.com),(PROTOCOL,QUIC)),REJECT` is intentionally not ported 1:1, to avoid blocking all `api.pinduoduo.com` traffic in QX.
- This repository is private. Quantumult X cannot directly fetch a private GitHub raw URL without an auth-capable distribution path.
