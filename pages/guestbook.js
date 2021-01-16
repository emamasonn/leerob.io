import { NextSeo } from 'next-seo';

import redis from '@/lib/redis';
import Container from '@/components/Container';
import Guestbook from '@/components/Guestbook';

const url = 'https://leerob.io/guestbook';
const title = 'Guestbook – Lee Robinson';
const description = 'Sign my digital guestbook and share some wisdom.';

export default function GuestbookPage({ initialEntries }) {
  return (
    <Container>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description
        }}
      />
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Guestbook
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Leave a comment below. It could be anything – appreciation,
          information, wisdom, or even humor. Surprise me!
        </p>
        <Guestbook initialEntries={initialEntries} />
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const entries = (await redis.hvals('guestbook'))
    .map((entry) => JSON.parse(entry))
    .sort((a, b) => b.id - a.id);

  return {
    props: {
      initialEntries: entries
    },
    revalidate: 60
  };
}
