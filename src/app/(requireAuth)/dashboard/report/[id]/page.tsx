import ReportView from "./ReportView";

interface Props {
  params: { id: string };
}
export default async function ReportPage({ params }: Props) {
  const { id } = await params;

  if (!id) return <div>Failed to load</div>;

  return <ReportView id={id} />;
}
