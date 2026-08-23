## Summary

<!-- What does this PR change, and why? Keep it concise. -->

Fixes: <!-- #issue number, or "n/a" -->

## Checklist

- [ ] Ran locally (`python3 -m http.server`) and the browser console is clean
- [ ] No framework, build step, or third-party request added (stays vanilla + self-hosted)
- [ ] Strict CSP respected — no inline `<script>` or `style="…"` attributes
- [ ] Didn't regress the Lighthouse gate (a11y / SEO / best-practices 100, perf ≥ 90)
- [ ] Checked light **and** dark, desktop **and** mobile (for visual changes)
