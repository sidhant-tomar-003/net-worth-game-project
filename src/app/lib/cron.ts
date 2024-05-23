// src/lib/cron.ts
const cron = require('node-cron')
import prisma from './prisma';
import { redis } from './redis';

const LEADERBOARD_CACHE_KEY = 'leaderboard';

const refreshLeaderboardCache = async () => {
  try {
    const totalUsers = await prisma.leaderboard.count();
    const pageSize = 10; // Adjust according to your page size
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
};

// Schedule the task to run every 40 minutes
cron.schedule('*/40 * * * *', refreshLeaderboardCache);
