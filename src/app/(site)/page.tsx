"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DynamicWidget, UserProfile, useDynamicContext } from '@dynamic-labs/sdk-react-core';

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

    // const [balance, setBalance] = useState<string | null>(null);


    // useEffect(() => {
    //     const fetchBalance = async () => {
    //       if (primaryWallet) {
    //         const value = await primaryWallet.connector.getBalance();
    //         if (value) {
    //             setBalance(value);
    //         }
    //       }
    //     };
    //     fetchBalance();
    //     }, [primaryWallet]);

  const handleClick = async () => {
    console.log("hello wurld", user, user?.verifiedCredentials[2].oauthDisplayName)

    if (user === null || primaryWallet === null) {
      // output an error saying "still authenticating your details; please wait a few moments"
      console.log("hol' up laddy-o")
      return;
    }  
    const balance = await primaryWallet.connector.getBalance();
    let username;
    
    if (user !== null && user !== undefined) {
      username = user.verifiedCredentials.length == 2 ? user.verifiedCredentials[2].oauthDisplayName : generateRandomUsername();
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
  // useEffect(() => {
  //   const updateUser = async () => {
  //     // setTimeout(async () => {}, 300)
  //     console.log("HERE'S USER", user);
  //     if (user) {
  //       setVerifiedCredentials(user);
  //       let balance = null;
  //         if (primaryWallet) {
  //           balance = primaryWallet.connector.getBalance();
  //           const wallet_address = primaryWallet.address;
  //         }
  //       // username, email, balance, multiplier, profilePicture
  //       const username = verifiedCredentials?.verifiedCredentials.length === 3 ? verifiedCredentials?.verifiedCredentials[2].oauthDisplayName : null;
        
  //       const email = verifiedCredentials?.email;
  //       // const response = await fetch('/api/updateUserInfo', {
  //       //   method: 'POST',
  //       //   headers: {
  //       //     'Content-Type': 'application/json',
  //       //   },
  //       //   body: JSON.stringify({ 
  //       //     username: username,
  //       //     email: email,
  //       //     balance: balance,
  //       //    }),
  //       // });

  //       // const data = await response.json();
  
  //       // if (response.ok) {
  //       //   setMessage(`Updated: ${data.name} -> ${data.value}`);
  //       // } else {
  //       //   setMessage(`Error: ${data.error}`);
  //       // }
  //       console.log("Wowzers!", username, email, balance);
  //     }
  //     else {
  //       console.log("Zamn! He isn't authenticated!");
  //     }
      
  //     console.log("Wow! It ran once on mounting!");
  //   };
  
  //   updateUser();
  // }, [user]); // Empty dependency array means this runs once on mount
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

        <button onClick={handleClick}>Update Net Worth</button>
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
