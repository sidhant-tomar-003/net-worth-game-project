// src/pages/api/fetchLeaderboard.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { redis } from '../../lib/redis';
import prisma from '../../lib/prisma';
import { NextResponse } from 'next/server';

const LEADERBOARD_CACHE_KEY = 'leaderboardv1';
const PAGE_SIZE = 10;

export async function POST(req: Request) {
  const { page } = await req.json();
  const limit = PAGE_SIZE;
  const cacheKey = `${LEADERBOARD_CACHE_KEY}:${page}`;

  try {
    // Try to fetch from Redis cache first
    let cachedData = await redis.get(cacheKey);
    if (cachedData) {
      cachedData = JSON.parse(cachedData);
      console.log('Cache hit');
      return NextResponse.json({cachedData});
    }

    console.log('Cache miss, fetching from database');
    // If cache miss, fetch from database
    const pageInt = parseInt(page, 10);
    const limitInt = limit;

    const leaderboard = await prisma.leaderboard.findMany({
      skip: (pageInt - 1) * limitInt,
      take: limitInt,
      orderBy: {
        score: 'desc',
      },
    });

    const totalUsers = await prisma.leaderboard.count();
    const totalPages = Math.ceil(totalUsers / limitInt);

    const response = {
      leaderboard: leaderboard,
      totalPages: totalPages,
      currentPage: pageInt,
    };

    // Cache the fetched data
    await redis.set(cacheKey, JSON.stringify(response), 'EX', 2400);

    return NextResponse.json({
      leaderboard: leaderboard,
      totalPages: totalPages,
      currentPage: pageInt,
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return new Response(null, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export const runtime = 'edge'