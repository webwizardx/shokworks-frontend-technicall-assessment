import SpecialtyCarousel from '@/components/SpecialityCarousel/SpecialityCarousel';
import { getNews } from '@/components/SpecialityCarousel/actions';

export default async function Home() {
  const news = await getNews();

  return (
    <main>
      <SpecialtyCarousel news={news} />
    </main>
  );
}
