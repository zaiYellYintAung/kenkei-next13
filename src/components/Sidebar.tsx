import { Session, getServerSession } from "next-auth";
import { User } from "@/lib/types/db";
import DisplayFriends from "./DisplayFriends";
import { authOptions } from "@/lib/auth";
import { FC } from "react";
import Link from "next/link";
import { BiUser, BiUserPlus } from "react-icons/bi";
import ProfileBlock from "./ProfileBlock";
import FriendRequestCount from "./mini/FriendRequestCount";
import { fetcher } from "@/lib/db";
import getRequests from "@/lib/utils/getRequests";

interface Props {
  friends: User[];
  session: Session;
}

const Sidebar: FC<Props> = async ({ friends, session }) => {
  const unseenRequest = await getRequests(session.user.id);
  const unseenRequestCount = unseenRequest?.length || 0;

  return (
    <main className="h-full w-full">
      <header className="w-full h-16 shrink-0">Icon</header>
      <div className="flex-grow text-sm">
        <section className="mb-4">
          {friends && (
            <DisplayFriends friends={friends} userID={session.user.id} />
          )}
        </section>
        <section className="mb-4 ">
          <p className="text-gray-400  text-xs mb-1">Friends</p>
          <Link
            href="/dashboard/add"
            className="py-2 rounded-md group hover:bg-green-50 hover:text-green-500 px-4 flex items-center gap-4">
            <BiUserPlus className="text-2xl p-[2px] border rounded-md group-hover:border-green-200" />
            <span className="">Add Friends</span>
          </Link>
          <Link
            href="/dashboard/requests"
            className="py-2 rounded-md group hover:bg-green-50 hover:text-green-500 px-4 flex justify-between items-center gap-4">
            <div className="flex gap-4 items-center">
              <BiUser className="text-2xl p-[3px] border rounded-md group-hover:border-green-200" />
              <span className="">Friend Requests</span>
            </div>
            <FriendRequestCount
              initialUnseen={unseenRequestCount}
              sessionId={session.user.id}
            />
          </Link>
        </section>
      </div>
    </main>
  );
};

export default Sidebar;
