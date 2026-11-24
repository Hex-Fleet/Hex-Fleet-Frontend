import { notFound } from 'next/navigation';
import PlannedPage, { getPlannedPage } from '../../components/PlannedPage';

export const dynamic = 'force-dynamic';

export default async function PlannedRoute({ params }) {
  const { slug = [] } = await params;
  if (!getPlannedPage(slug)) notFound();
  return <PlannedPage slug={slug} />;
}
