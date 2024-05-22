// src/pages/api/user.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';
// TODO: DO ERROR HANDLING 

// TODO: get all the tokens and stuff from wagmi somehow
export async function POST(req: Request) {
  // check if the user exists in the table. if they don't then create an entry for them, then update the leaderboards table
  
  try {
    const { page, limit } =await req.json();
    console.log("heheheha", page, limit);
    const pageInt = parseInt(page as string, 10);
    const limitInt = parseInt(limit as string, 10);
      const leaderboard = await prisma.leaderboard.findMany({
        skip: (pageInt - 1) * limitInt,
        take: limitInt,
        orderBy: {
            score: 'desc',
        },
    });

    console.log("hmmium", leaderboard[0]);
    
    const totalUsers = await prisma.leaderboard.count();
    const totalPages = Math.ceil(totalUsers / limitInt);
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
