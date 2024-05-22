"use client";

import { useState, useEffect } from 'react';
import { DynamicWidget, UserProfile, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import Loading from '@/components/loading';
import Leaderboard from '@/components/Leaderboard';

const Page = () => {
    // const { user } = useDynamicContext();
    const { user, isAuthenticated, handleLogOut } = useDynamicContext();
    const [verifiedCredentials, setVerifiedCredentials] = useState<UserProfile | null>(null);

    useEffect(() => {
        if (user) {
            setVerifiedCredentials(user);
        }
    }, [user]);

    // console.log(verifiedCredentials);
    
    const { primaryWallet } = useDynamicContext();
    const [balance, setBalance] = useState<string | null>(null);


    useEffect(() => {
        const fetchBalance = async () => {
          if (primaryWallet) {
            const value = await primaryWallet.connector.getBalance();
            if (value) {
                setBalance(value);
            }
          }
        };
        fetchBalance();
        }, [primaryWallet]);

    if (verifiedCredentials === undefined) {
        return <Loading />;
    }

    return (
        <>
            <Leaderboard />
            <div>
                {verifiedCredentials && verifiedCredentials ? (
                    <div>
                        <p>Issuer: {verifiedCredentials.userId}</p>
                        <p>email: {verifiedCredentials.email}</p>
                        <p>lastVerifiedCredentialId: {verifiedCredentials.lastVerifiedCredentialId}</p>
                        <p>environmentId: {verifiedCredentials.environmentId}</p>
                        <p>username: {verifiedCredentials.verifiedCredentials.length === 3 && verifiedCredentials.verifiedCredentials[2].oauthDisplayName}</p>
                    </div>
                ) : (
                    <p>No verified credentials available</p>
                )}
                {balance ? <p>Wallet Balance: {balance}</p> : <p>Loading balance...</p>}
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Property</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Avatar</td>

                                <td>
                                    {user?.ens?.avatar && (
                                        <img
                                            src={user.ens.avatar}
                                            style={{ width: '2rem', height: '2rem' }}
                                        />
                                    )}
                                </td>
                            </tr>

                            <tr>
                                <td>Email</td>
                                <td>{user?.email}</td>
                            </tr>

                            <tr>
                                <td>First name</td>
                                <td>{user?.firstName}</td>
                            </tr>

                            <tr>
                                <td>Last name</td>
                                <td>{user?.lastName}</td>
                            </tr>

                            <tr>
                                <td>Alias</td>
                                <td>{user?.alias}</td>
                            </tr>

                            <tr>
                                <td>Job title</td>
                                <td>{user?.jobTitle}</td>
                            </tr>

                            <tr>
                                <td>Country</td>
                                <td>{user?.country}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Page;
