import { useEffect, useState } from "react";
//to take info about Users and save it in a state
export default function useUser() {
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    height: "",
    age: "",
    weight: "",
    sex: "",
    lifestyle: "",
    plan: "",
    role: "",
  });

  useEffect(() => {
    const url = `https://beautiful-rubie-luxs94-fb56ef61.koyeb.app//user/my`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          return data;
        } else {
          throw new Error(data.message || data.error || "Error in response");
        }
      })
      .then((data) => {
        if (data.role === "USER") {
          fetch(
            `https://beautiful-rubie-luxs94-fb56ef61.koyeb.app/user/myProfile`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          )
            .then(async (res) => {
              const data = await res.json();
              if (res.ok) {
                return data;
              } else {
                throw new Error(
                  data.message || data.error || "Error in response",
                );
              }
            })
            .then((data) =>
              setUser({
                id: data.id,
                username: data.username,
                email: data.email,
                role: "USER",
                height: data.height,
                age: data.age,
                weight: data.weight,
                plan: data.plan,
                lifestyle: data.lifestyle,
                sex: data.sex,
              }),
            )
            .catch((err) => {
              console.log(err.message);
            });
        } else {
          setUser({
            id: data.id,
            username: data.username,
            email: data.email,
            role: data.role,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return user;
}
