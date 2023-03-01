import React from "react";
import { useAppStore } from "../stores/appStore";
const Home = () => {
  const accessToken = useAppStore((state) => state.accessToken);

  return (
    <div>
      Home
      {accessToken && <div>Logged in</div>}
    </div>
  );
};

export default Home;
