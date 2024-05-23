// src/pages/api/user.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
// TODO: DO ERROR HANDLING 

// TODO: get all the tokens and stuff from wagmi somehow
export async function POST(req: Request) {
  // check if the user exists in the table. if they don't then create an entry for them, then update the leaderboards table
  try {
    let { username, email, new_balance } = await req.json();
    console.log("input data", username, email, new_balance);
    const profilePicture = "placeholder";
    let multiplier = 0;
    
    let checkUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    
    // Try to find the user by emai
    console.log("initial checkuser check call:", checkUser);
    new_balance = 1;
    let updateUser = null; 
    let time = BigInt(Date.now());
    let lastVis = BigInt(0);
    // If user is not found, create a new user
    if (!checkUser) {
      checkUser = await prisma.user.create({
        data: {
          username: username,
          email: email,
          balance: new_balance,
          multiplier: multiplier + 1,
          lastVisited: time,
          profilePicture: profilePicture,
        },
      });
      time = BigInt(0);
      console.log('User created:', checkUser);
    } else {
      console.log('User found:', checkUser);
      new_balance = new_balance > checkUser.balance ? new_balance : checkUser.balance;
      multiplier = checkUser.multiplier;
      lastVis = checkUser.lastVisited;
    }
    // if (time !== BigInt(0) && time - lastVis < 24 * 60 * 60 * 1000) {
    //   // message "too soon"
    //   return new Response(null, { status: 400 });
    // }
    // update the user multiplier and refresh their balance to be the max of history or current
    updateUser = await prisma.user.update({
      where: {
        id: checkUser.id,
      },
      data: {
        multiplier: multiplier + 1,
      },
    });
    
    const updateLeaderboard = await prisma.leaderboard.upsert({
      where: {
        userId: checkUser.id,
      },
      update: {
        score: updateUser.balance * (updateUser.multiplier), // Use the new multiplier
      },  
      create: {
        userId: updateUser.id,
        username: updateUser.username,
        email: updateUser.email,
        profilePicture: updateUser.profilePicture,
        score: updateUser.balance * (updateUser.multiplier),
      },
    });
    console.log(updateLeaderboard);
    return new Response(null, { status: 200 });
    
  } catch (error) {
    console.error('Error updating user and leaderboard:', error);
    return new Response(null, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
