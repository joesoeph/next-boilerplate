'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from '@/app/fetcher';

export default function ListPosts() {
  let [page, setPage] = useState(1);
  const { data, error, isLoading } = useSWR(
    'http://localhost:3030/posts?_page=' + page,
    fetcher
  );

  if (error) return 'An error has occurred.';
  if (isLoading) return 'Loading...';

  return (
    <>
      <ul data-testid="list-posts">
        {data.map((item, index) => (
          <li key={index}>
            <Image src={item.image} alt="Test" width={200} height={200} />
            {/* <p>{item.image}</p> */}
            <Link href={'/content/' + item.id}>{item.title}</Link>
          </li>
        ))}
      </ul>
      <p>{page}</p>
      <button
        onClick={function () {
          setPage(--page);
        }}
      >
        Previous
      </button>
      <button
        onClick={function () {
          setPage(++page);
        }}
      >
        Next
      </button>
    </>
  );
}
