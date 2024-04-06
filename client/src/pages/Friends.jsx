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
        setTimeout(() => {
          setFriends(response.data);
          console.log(response.data);
        }, 1000);
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
            className="block w-full x-4 rounded-md border-0 py-1.5 pl-9 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
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
                        {friend.profilePhoto ? (
                          <img
                            src={friend.profilePhoto}
                            alt="profile"
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 mr-2"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"
                                fill="#000000"
                              ></path>
                            </g>
                          </svg>
                        )}
                      </p>
                      <p className="text-xl font-semibold  leading-6 text-gray-900">
                        {friend.username}
                      </p>
                    </div>
                    <div className="flex ">
                      {friend.color === "red" ? (
                        <p className="mt-1 truncate text-lg leading-5 text-green-500">
                          ↙️₹{-1 * friend.amountOwed} (he owes you)
                        </p>
                      ) : friend.amountOwed === 0 ? (
                        <p className="mt-1 truncate text-lg leading-5 text-black">
                          ₹{friend.amountOwed} 
                        </p>
                      ) : (
                        <p className="mt-1 truncate text-lg leading-5 text-red-500">
                          ↗️₹{friend.amountOwed} (you owe him)
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
