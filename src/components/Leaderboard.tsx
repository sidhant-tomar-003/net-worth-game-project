// src/components/Leaderboard.tsx
"use client";
import React, { useEffect, useState } from 'react';
// import supabase from '../app/lib/supabase';

interface User {
  id: number;
  userId: number;
  username: string;
  email: string;
  profilePicture: string;
  score: number;
  createdAt: Date;
}

const myPageSizeLimit = 10;

const Leaderboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);

  const fetchData = async (page: number) => {
    const response = await fetch('/api/fetchLeaderboard', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: page,

      })
    });

    // const { leaderboard, totalPages, currentPage } = await response.json();
    let data = await response.json();
    if (data.cachedData) {
        data = data.cachedData;
    }
    console.log(data, data.cachedData);
    if (data) {
      setUsers(data.leaderboard);
      setPage(data.currentPage);
      setMaxPage(data.totalPages);
    }
  };

  const handlePrevPage = async () => {
    if (page !== 1) {
      await fetchData(page - 1);
    }
  };

  const handleNextPage = async () => {
    if (page !== maxPage) {
      await fetchData(page + 1);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

//   useEffect(() => {
//     const channel = supabase.channel('realtime leadeerboard').on('postgres_changes', {
//         event: '*',
//         schema: 'public',
//         table: 'todos'
//     }, () => fetchData);

//     return () => {
//         supabase.removeChannel(channel);
//     }
//   }, [supabase]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>

      <table className="min-w-full bg-blue-400">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Profile Picture</th>
            <th className="py-2 px-4 border-b">Score</th>
            <th className="py-2 px-4 border-b">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                <p>image here (placeholder)</p>
              </td>
              <td className="py-2 px-4 border-b">{user.score.toString()}</td>
              <td className="py-2 px-4 border-b">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center mt-4">
        {page === 1 ? (
          <button
            className="bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded-l cursor-not-allowed"
            disabled
          >
            <span className="material-icons">chevron_left</span>
          </button>
        ) : (
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            onClick={handlePrevPage}
          >
            <span className="material-icons">chevron_left</span>
          </button>
        )}
        <p className="mx-4">Page {page} / {maxPage}</p>
        {page === maxPage ? (
          <button
            className="bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded-r cursor-not-allowed"
            disabled
          >
            <span className="material-icons">chevron_right</span>
          </button>
        ) : (
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={handleNextPage}
          >
            <span className="material-icons">chevron_right</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
