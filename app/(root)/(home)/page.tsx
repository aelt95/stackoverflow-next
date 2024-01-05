import { UserButton } from "@clerk/nextjs";

const Home = () => {
  return (
    <div className="h-screen">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Home;
