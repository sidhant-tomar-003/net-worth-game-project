import prisma from "@/../lib/prisma";
import { redis } from "@/../lib/redis";
import { NextResponse } from "next/server";

const LEADERBOARD_CACHE_KEY = 'leaderboard';

const PAGE_SIZE = 10;


export async function POST(req: Request) {
  const authToken = (req.headers.get('authorization') || '')
  .split('Bearer ')
  .at(1)
  
  // if not found OR the bearer token does NOT equal the CRON_SECRET
  if (!authToken || authToken != process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, {
      status: 401 })
    }
    try {
      const totalUsers = await prisma.leaderboard.count();
      const pageSize = PAGE_SIZE; 
      const totalPages = Math.ceil(totalUsers / pageSize);
      
      for (let page = 1; page <= totalPages; page++) {
        const cacheKey = `${LEADERBOARD_CACHE_KEY}:${page}`;
        const leaderboard = await prisma.leaderboard.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          orderBy: {
            score: 'desc',
          },
        });
        
        const response = {
          leaderboard,
          totalPages,
          currentPage: page,
        };
        
        await redis.set(cacheKey, JSON.stringify(response), 'EX', 2400); // 2400 seconds = 40 minutes
      }
      console.log('Leaderboard cache refreshed');
    } catch (error) {
      console.error('Error refreshing leaderboard cache:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
export const dynamic = 'force-dynamic'