import React, { useState, useEffect } from "react";
import axios from "../axios";
import { getUserID } from "../hooks/getUserID";
import toast from "react-hot-toast";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const userId = getUserID();
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`/user/${userId}/friends`);
        setFriends(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error("Error fetching friends!");
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [userId]);
  return (
    <div className="w-full flex flex-col  justify-center">
      <div className="">
        <ul role="list" className="divide-y divide-gray-100">
          {friends.length === 0 ? (
            <li className="py-5">Loading...</li>
          ) : (
            friends.map((friend) => (
              <li
                key={friend._id}
                className=" gap-x-6 bg-white w-2/4 mx-auto flex justify-center items-center rounded-xl px-2 py-1"
              >
                <div className="w-full gap-x-4">
                  <div className="w-full flex items-center gap-10 ">
                    <p className="text-md font-semibold  leading-6 text-gray-900">
                      {friend.username}
                    </p>
                    <div className="flex ">
                      <p className="mt-1 truncate text-md leading-5 text-gray-500">
                        {friend.emoji}
                      </p>
                      <p className="mt-1 truncate text-md leading-5 text-gray-500">
                        {friend.amountOwed}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Friends;
