# Contributing to Scheme Website

Thanks for helping make scheme information easier to understand and verify.

## Development setup

Follow [README.md](README.md). Use the package manager and Node.js version supported by the checked-in package manifest and lockfile.

## Accuracy and sourcing

- Prefer official government portals and published scheme guidelines.
- Record source URLs and the date each scheme detail was last verified.
- Clearly label sample or illustrative records.
- Do not invent benefit amounts, eligibility rules, deadlines, or official links.
- Treat eligibility tools as guidance, not an official approval or guarantee.

## Security and privacy

- Never commit service-role keys, access tokens, database passwords, or private environment files.
- Keep privileged Supabase credentials on the server only; never use them in `VITE_*` variables.
- Review Row Level Security and authorization for every database operation.
- Validate and rate-limit serverless API inputs where appropriate.
- Avoid collecting personal data unless necessary and documented.

## Quality checks

Run `npm run build` and `npm run lint`. Test API success/error states, responsive layouts, keyboard navigation, external links, and data-empty states.

## Pull requests

Describe the user-facing change, list files and data sources affected, include test results, and identify any security, privacy, or scheme-accuracy implications.
