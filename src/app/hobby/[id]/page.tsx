import { notFound } from 'next/navigation';
import { getHobbyById } from '@/lib/data/hobbies';
import { getHobbyDetail, getRelatedHobbies } from '@/lib/data/hobby-details';
import { HobbyDetailView } from '@/features/hobby/components/hobby-detail-view';
import type { HobbyCategory } from '@/lib/category-theme';

interface HobbyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const { hobbies } = await import('@/lib/data/hobbies');
  return hobbies.map((hobby) => ({ id: hobby.id }));
}

export default async function HobbyPage({ params }: HobbyPageProps) {
  const { id } = await params;
  const hobby = getHobbyById(id);

  if (!hobby) {
    notFound();
  }

  const detail = getHobbyDetail(hobby.id);
  const relatedHobbies = getRelatedHobbies(hobby.category as HobbyCategory, hobby.id);

  return <HobbyDetailView hobby={hobby} detail={detail} relatedHobbies={relatedHobbies} />;
}
