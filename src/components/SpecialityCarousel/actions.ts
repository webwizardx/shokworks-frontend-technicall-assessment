'use server';

import { GetNewsResponse } from './types';

export async function getNews() {
  try {
    const url = new URL('https://newsapi.org/v2/everything');
    url.searchParams.set('q', 'technology');
    url.searchParams.set('pageSize', '10');
    url.searchParams.set('page', '1');
    url.searchParams.set('apiKey', process.env.NEWS_API_KEY as string);
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const news: GetNewsResponse = await response.json();
    return news.articles;
  } catch (error) {
    console.error(error);
    return [];
  }
}
