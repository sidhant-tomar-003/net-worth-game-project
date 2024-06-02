"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DynamicWidget, UserProfile, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import Head from "next/head";

export default function Home() {
  const [message, setMessage] = useState('');
  const { primaryWallet, user, isAuthenticated, handleLogOut } = useDynamicContext();
  
  const [verifiedCredentials, setVerifiedCredentials] = useState<UserProfile | null>(null);

  function generateRandomUsername() {
    const animals = [
      'aardvark', 'albatross', 'alligator', 'ant', 'anteater', 'antelope', 'ape', 'armadillo', 'baboon', 'badger',
      'bat', 'bear', 'beaver', 'bee', 'bison', 'buffalo', 'butterfly', 'camel', 'caribou', 'cat',
      'cheetah', 'chicken', 'chimpanzee', 'chinchilla', 'clam', 'cobra', 'codfish', 'coyote', 'crab', 'crane',
      'crocodile', 'crow', 'deer', 'dinosaur', 'dog', 'dolphin', 'donkey', 'dragonfly', 'duck', 'eagle',
      'eel', 'elephant', 'elk', 'emu', 'falcon', 'ferret', 'finch', 'fish', 'flamingo', 'fly',
      'fox', 'frog', 'gazelle', 'gecko', 'gerbil', 'giraffe', 'gnat', 'gnu', 'goat', 'goldfish',
      'goose', 'gorilla', 'grasshopper', 'hamster', 'hare', 'hawk', 'hedgehog', 'heron', 'hippo', 'hornet',
      'horse', 'hummingbird', 'hyena', 'ibex', 'iguana', 'jackal', 'jaguar', 'kangaroo', 'koala', 'leech',
      'lemur', 'leopard', 'lion', 'lizard', 'llama', 'lobster', 'locust', 'loon', 'lynx', 'meerkat',
      'mink', 'mole', 'mongoose', 'monkey', 'moose', 'mosquito', 'moth', 'mouse', 'mule', 'muskrat',
      'narwhal', 'newt', 'nightingale', 'octopus', 'opossum', 'ostrich', 'otter', 'owl', 'oyster', 'panda',
      'panther', 'parrot', 'partridge', 'peacock', 'pelican', 'penguin', 'pheasant', 'pig', 'pigeon', 'porcupine',
      'puma', 'rabbit', 'raccoon', 'ram', 'rat', 'raven', 'reindeer', 'rhinoceros', 'salamander', 'salmon',
      'sardine', 'scorpion', 'seahorse', 'seal', 'shark', 'sheep', 'skunk', 'sloth', 'snail', 'snake',
      'sparrow', 'spider', 'squirrel', 'swan', 'termite', 'tiger', 'toad', 'trout', 'turkey', 'turtle',
      'vole', 'vulture', 'walrus', 'warthog', 'wasp', 'weasel', 'whale', 'wolf', 'wolverine', 'wombat',
      'woodchuck', 'woodpecker', 'worm', 'zebra'
    ];
  
    const randomIndex = Math.floor(Math.random() * animals.length);
    const randomAnimal = animals[randomIndex];
    const username = `anonymous${randomAnimal}`;
  
    return username;
  }

  const handleClick = async () => {
    console.log("hello wurld", user, user?.verifiedCredentials[2].oauthDisplayName, user?.verifiedCredentials.length)
    if (user === null || primaryWallet === null) {
      // output an error saying "still authenticating your details; please wait a few moments"
      console.log("hol' up laddy-o")
      return;
    }  
    const balance = await primaryWallet.connector.getBalance();
    let username;
    
    if (user !== null && user !== undefined) {
      username = user.verifiedCredentials.length === 3 ? user.verifiedCredentials[2].oauthDisplayName : generateRandomUsername();
      console.log("woah!", username);
    } else {
      username = generateRandomUsername();
    }
    console.log(generateRandomUsername());
    console.log("the details I know:", username, user?.email, balance)
    const response = await fetch('/api/updateUserInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        username: username,
        email: user?.email,
        new_balance: parseFloat(balance || '0'),
        }),
    });
  };
  return (
    <>
    <div className="bg-gradient-to-r from-black to-blue-900 min-h-screen flex items-center justify-center">
      <div className="min-h-screen  text-white">
        <main className="container mx-auto p-4">
          <section className="mb-8">
            <h2 className="text-4xl font-bold mb-4">Welcome to CryptoClimb: The Ultimate Web3 Net Worth Game!</h2>
            <p>In the ever-evolving world of decentralized finance (DeFi), your net worth is more than just a number - it's a testament to your skill, strategy, and dedication to the Web3 revolution. CryptoClimb is a unique gaming experience that combines the thrill of competition with the power of blockchain technology, allowing you to showcase your crypto prowess and climb the leaderboard to the top.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">How to Play</h2>
            <ol className="list-decimal pl-5">
              <li>Connect Your Wallet: To begin your journey, you'll need to connect your Ethereum wallet to CryptoClimb. This secure connection ensures that your crypto assets are directly linked to your in-game net worth.</li>
              <li>Log In and Multiply: Every time you log in to the game, your personal multiplier increases by 1. This multiplier is then applied to your net worth, amplifying your score with each visit.</li>
              <li>Calculate Your Net Worth: Your net worth is calculated by summing up the value of your Ethereum holdings and the value of all your ERC-20 tokens. The more diverse and valuable your crypto portfolio, the higher your score will be.</li>
              <li>Climb the Leaderboard: With your multiplier-boosted net worth, you'll compete against other players in a thrilling leaderboard race. Strategically manage your crypto assets and log in regularly to climb the ranks and claim your place among the Web3 elite.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">The Power of Web3 Authentication</h2>
            <p>CryptoClimb leverages the cutting-edge technology of Web3 authentication, provided by the trusted service dynamic.xyz. This innovative approach to user authentication ensures that your identity is securely tied to your blockchain wallet, eliminating the need for traditional username and password combinations.</p>
            <p>By authenticating with your wallet, you not only gain seamless access to the game but also demonstrate your commitment to the decentralized future. Your crypto assets become the key to unlocking a world of possibilities, where your financial prowess is celebrated and rewarded.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Join the Web3 Revolution</h2>
            <p>CryptoClimb is more than just a game – it's a celebration of the decentralized revolution that's redefining the way we interact with finance and technology. Embrace the power of Web3, showcase your crypto savvy, and climb to the top of the leaderboard.</p>
            <p>Connect your wallet, log in regularly, and let your net worth soar. The future of finance is here, and it's time to claim your place among the Web3 elite!</p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">ERC-20 Contract Powered ETH Transfer on the Sepolia Network</h2>
            <p>At the heart of CryptoClimb's gaming experience lies the cutting-edge technology of ERC-20 smart contracts, deployed on the Sepolia network. This Ethereum testnet provides a secure and immersive environment for players to unleash the full potential of decentralized finance.</p>
            <p>By leveraging the Sepolia network, CryptoClimb offers a risk-free environment for players to experiment with Web3 technologies, hone their DeFi skills, and prepare for the next generation of decentralized finance applications.</p>
          </section>
        </main>
        <footer className="bg-gray-800 p-4 text-center">
          <p>&copy; 2024 CryptoClimb. All rights reserved.</p>
        </footer>
      </div>
      </div>
    </>
  );
}
