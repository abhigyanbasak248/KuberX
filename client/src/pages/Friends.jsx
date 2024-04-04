import React, { useState, useEffect } from "react";
import axios from "../axios";
import { getUserID } from "../hooks/getUserID";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

const Friends = () => {
  const [friends, setFriends] = useState(null);
  const [fusername, setFusername] = useState("");
  const userId = getUserID();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
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
      <div className="w-1/4 mt-6 mx-auto">
        <label
          htmlFor="price"
          className="block text-lg font-medium leading-6 text-white"
        >
          Add a friend
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">👤</span>
          </div>
          <input
            type="text"
            name="fusername"
            id="fusername"
            value={fusername}
            onChange={(e) => setFusername(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-9 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
            placeholder="friendUsername"
          />
          <div className="absolute inset-y-0 right-0 flex items-center mr-3">
            <button
              className="text-white z-50 px-2 rounded-lg bg-gray-900 sm:text-sm"
              onClick={async () => {
                try {
                  const response = await axios.post(
                    `/user/${userId}/addFriend`,
                    {
                      friendUsername: fusername,
                    }
                  );
                  console.log(response.data);
                  if (response.data === "Friend added successfully!") {
                    toast.success(response.data);
                    setFriends([
                      ...friends,
                      { username: fusername, amountOwed: 0, color: "green" },
                    ]);
                  } else {
                    toast.error(response.data);
                  }
                  setFusername("");
                } catch (error) {
                  toast.error("Error adding friend!");
                  console.error("Error adding friend:", error);
                }
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h1 className="text-center mb-4 text-3xl">My Friends</h1>
        <ul
          role="list"
          className="divide-y divide-gray-100 flex flex-col gap-2"
        >
          {friends === null ? (
            <div className="flex justify-center items-center mt-4">
              <PropagateLoader color="#ffffff" />
            </div>
          ) : (
            friends.map((friend) => (
              <li
                key={friend._id}
                className=" gap-x-6 bg-white border border-[#1e1f4a]  w-2/4 mx-auto flex justify-center items-center rounded-xl px-7 py-3"
              >
                <div className="w-full gap-x-4">
                  <div className="w-full flex justify-between ">
                    <div className="flex">
                      <p className="text-lg font-semibold  leading-6 text-gray-900">
                        🙋🏻
                      </p>
                      <p className="text-xl font-semibold  leading-6 text-gray-900">
                        {friend.username}
                      </p>
                    </div>
                    <div className="flex ">
                      {friend.color === "red" ? (
                        <p className="mt-1 truncate text-lg leading-5 text-red-500">
                          ₹{friend.amountOwed}
                        </p>
                      ) : (
                        <p className="mt-1 truncate text-lg leading-5 text-green-500">
                          ₹{friend.amountOwed}
                        </p>
                      )}
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
