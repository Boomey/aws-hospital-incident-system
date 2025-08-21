# API Reference (Brief)

## POST /incidents
- Create a new incident report
- Body: JSON with `equipmentTag`, `description`, `severity`, `attachments` (S3 keys)
- Response: `201 Created` with `{ incidentId }`

## GET /incidents/{id}
- Fetch an incident by ID

## GET /incidents
- List incidents with optional filters: `status`, `severity`, `createdBy`
