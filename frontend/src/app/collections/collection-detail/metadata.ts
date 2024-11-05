import type { Metadata, ResolvingMetadata } from 'next';
import collectionsData from '../../../data/collections-data.json';

type Props = {
  params: { collectionId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const collectionId = searchParams.collectionId as string;
  const collection = collectionsData.find(item => item.id === collectionId);
  const collectionName = collection ? collection.title : "Default Collection Name";

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: collectionName,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  };
}
