import Parser from 'rss-parser';
import { NextResponse } from 'next/server';

type CustomItem = {
  'content:encoded': string;
  creator: string;
};

const parser = new Parser<any, CustomItem>({
  customFields: {
    item: ['content:encoded', 'creator'],
  },
});

export async function GET() {
  try {
    const feed = await parser.parseURL('https://medium.com/feed/@ravivarmanb05');
    return NextResponse.json(feed.items);
  } catch (error) {
    console.error('Error fetching Medium RSS:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
