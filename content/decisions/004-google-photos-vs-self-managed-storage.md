---
title: "Google Photos vs Self-Managed Archival Storage"
number: "004"
date: "2026-07-10"
status: "Proposed"
category: "Projects"
summary: "Evaluating cloud photo services against self-managed archival storage for long-term personal photo preservation."
tags: ["cloud", "storage", "photos", "archival"]
---

## Context

Personal photo libraries are growing rapidly. The average family generates 1-2 TB of photos per decade. The question is whether to trust cloud services (Google Photos, iCloud) as the sole archive or to maintain independent backups.

This decision was prompted by Google's transition from unlimited storage to paid tiers, and broader concerns about vendor lock-in for irreplaceable personal data.

## Decision

Implement a **hybrid approach**:

1. **Primary**: Google Photos for daily use (search, sharing, organization)
2. **Archive**: S3 Glacier Deep Archive for long-term preservation
3. **Local**: NAS with RAID for fast access to recent years

### Sync Strategy

- Automated nightly export from Google Photos API
- Deduplicated upload to S3 Glacier (monthly batch)
- EXIF metadata preserved and indexed in SQLite
- Verification checksums for integrity monitoring

## Consequences

### Positive

- No single point of failure for irreplaceable data
- Cost-effective ($1-2/TB/month on Glacier Deep Archive)
- Independence from any single vendor's pricing changes
- Full control over organization and metadata

### Negative

- Operational overhead (monitoring, maintenance)
- Glacier retrieval is slow (12-48 hours) — not for daily access
- Google Photos API limitations and quotas
- Initial setup cost (time and infrastructure)

## Notes

The key insight: cloud services are excellent for *access* but unreliable for *preservation*. Services shut down, pricing changes, accounts get locked. For data measured in decades, self-managed archival is worth the overhead.

Budget: approximately $5/month for 2TB on Glacier Deep Archive, plus minimal compute for the sync automation.
