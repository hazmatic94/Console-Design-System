import { Badge, Button, Input, Modal, Table, Tabs } from "../components/ui/index.js";

export function DocPage({ title, children }) {
  return (
    <article className="docs-page">
      <h1>{title}</h1>
      {children}
    </article>
  );
}

export function FoundationPage({ title }) {
  return (
    <DocPage title={title}>
      <Table
        columns={[
          { key: "token", label: "Token" },
          { key: "value", label: "Value" },
        ]}
        rows={[{ token: `--${title.toLowerCase()}`, value: "See src/styles/tokens.css" }]}
      />
    </DocPage>
  );
}

export function ComponentPage({ title }) {
  return (
    <DocPage title={title}>
      <Button>Confirm</Button>
      <Input label="Field Label" placeholder="Placeholder" />
      <Badge>Stable</Badge>
      <Tabs tabs={[{ label: "Preview", value: "preview" }]} activeValue="preview" />
      <Modal title={`${title} preview`} />
    </DocPage>
  );
}
