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
            <p>In the ever-evolving world of decentralized finance (DeFi), your net worth is more than just a number – it's a testament to your skill, strategy, and dedication to the Web3 revolution. CryptoClimb is a unique gaming experience that combines the thrill of competition with the power of blockchain technology, allowing you to showcase your crypto prowess and climb the leaderboard to the top.</p>
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
//   return (
//     <div className="bg-black min-h-screen text-white">
//       <div className="flex justify-around">
//         {/* Title and Intro */}
//         <div className="bg-gray-700 p-8 w-3/5 h text-center inline">
//           <h1 className="text-2xl font-bold mb-4">Welcome to CryptoClimb: The Ultimate Web3 Net Worth Game!
// </h1>
//     <p>In the ever-evolving world of decentralized finance (DeFi), your net worth is more than just a number – it's a testament to your skill, strategy, and dedication to the Web3 revolution. CryptoClimb is a unique gaming experience that combines the thrill of competition with the power of blockchain technology, allowing you to showcase your crypto prowess and climb the leaderboard to the top.
// </p>
//         </div>

//         {/* Crypto Image */}
//         <div className="bg-gray-800 p-8 w-2/5 inline">
//           <div className="bg-gray-600 w-64 h-64">Some image related to crypto</div>
//         </div>
//       </div>
//       <div className="flex justify-around">
//         {/* How to Play */}
//         <div className="bg-gray-700 w-5/6 p-8 inline">
//           <h2 className="text-xl font-bold mb-4">How to play</h2>
//         </div>

//         {/* Link to Leaderboard/Game */}
//         <div className="bg-gray-800 w-1/6 p-8 inline">
//           <div className="bg-gray-600 py-2 px-4 rounded">Link to leaderboard/game</div>
//         </div>
//       </div>
//       {/* ERC20 Contract Fluff */}
//       <div className="bg-gray-700 p-8">
//         <h2 className="text-xl font-bold mb-4">ERC20 contract powered ETH transfer on the Sepolia net; fluff about that</h2>
//       </div>

//       {/* Web3 Fluff and Call to Action */}
//       <div className="bg-gray-800 p-8 text-center">
//         <p className="mb-4">More fluff about web3, call to action</p>
//       </div>

//       {/* Footer */}
//       <div className="bg-blue-500 py-4 px-8">End of page footer</div>
//     </div>
//   );
// };

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">src/app/page.tsx</code>
//         </p>
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
//           <a
//             className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{" "}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
//         <Image
//           className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//         {(isAuthenticated) ? <button onClick={handleClick}>Update Net Worth</button> : <p> please authenticate </p>}
          
//       <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className="mb-3 text-2xl font-semibold">
//             Docs{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className="m-0 max-w-[30ch] text-sm opacity-50">
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className="mb-3 text-2xl font-semibold">
//             Learn{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className="m-0 max-w-[30ch] text-sm opacity-50">
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className="mb-3 text-2xl font-semibold">
//             Templates{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className="m-0 max-w-[30ch] text-sm opacity-50">
//             Explore starter templates for Next.js.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className="mb-3 text-2xl font-semibold">
//             Deploy{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   );
// }
