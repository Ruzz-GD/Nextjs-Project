"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      router.push("/auth");
    } else {
      const loggedInUser = {
        email: localStorage.getItem("userEmail"),
        id: localStorage.getItem("userId"),
      };
      setUser(loggedInUser);
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, usersRes, commentsRes] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/posts"),
          fetch("https://jsonplaceholder.typicode.com/users"),
          fetch("https://jsonplaceholder.typicode.com/comments"),
        ]);

        const [postsData, usersData, commentsData] = await Promise.all([
          postsRes.json(),
          usersRes.json(),
          commentsRes.json(),
        ]);

        setPosts(postsData);
        setUsers(usersData);
        setComments(commentsData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-lg font-medium">
        Loading dashboard...
      </div>
    );
  }

  if (user?.email !== "admin@admin.com") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg font-semibold">
        Access denied. Admins only.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
          Admin Dashboard
        </h1>

        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6 text-white drop-shadow">
            Data Visualization
          </h2>
          <ApexCharts
            options={{
              chart: { type: "pie" },
              labels: ["Users", "Posts", "Comments"],
              legend: {
                position: "bottom",
                fontSize: "14px",
                labels: {
                  colors: "#fff",
                },
              },
            }}
            series={[users.length, posts.length, comments.length]}
            type="pie"
            width="100%"
            height="320"
          />
        </div>
      </div>
    </div>
  );
}
