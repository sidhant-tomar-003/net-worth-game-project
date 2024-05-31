"use client";
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const MainNav = () => {
    const { isAuthenticated } = useDynamicContext();
    return (
        <div className="flex items-center justify-center">
            <Link href={"/"} className="ml-6" ><div className="text-xl font-bold">CryptoClimb</div></Link>
            {isAuthenticated ? <Link href={"/settings"} className="ml-6">Settings</Link> :
                <Link href={"/login"} className="ml-6">Login</Link>}
            <Link href={"/leaderboard"} className="ml-6">Leaderboard</Link>
            <Link href={"/transfer"} className="ml-6">Transfer</Link>
        </div>
    )
}

export default MainNav
