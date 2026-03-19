{{- define "common.env" -}}
- name: PULSAR_URL
  value: pulsar://{{ .Release.Name }}-pulsar-broker.pulsar.svc.cluster.local:6650
- name: AUTH_DATABASE_URL
  value: postgresql://postgres:postgres@{{ .Release.Name }}-postgresql.postgresql.svc.cluster.local:5432/jobber-auth?schema=public
{{- end -}}
