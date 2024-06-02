"use client";
import Leaderboard from './../../components/leaderboard';
import { UserProfile, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import React, { useEffect, useState } from 'react'

// TODO: Put some rate limiters on how quick the user can switch pages. Otherwise async causes bugs
// TODO: A loader will really look nice
const Page = () => {
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
    console.log("Hello wurld", user);
    // console.log("hello wurld", user, user?.verifiedCredentials[2].oauthDisplayName, user?.verifiedCredentials.length)
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
    <div className="bg-gradient-to-r from-black to-blue-900 min-h-screen">
        Here is the leaderboard! <br />
        {(isAuthenticated) ? <div>
        <button onClick={handleClick}>Update Net Worth</button>
        <Leaderboard />
          </div>
         : <p> please authenticate </p>}

    </div>
  )
}

export default Page;
