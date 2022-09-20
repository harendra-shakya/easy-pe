import type { NextPage } from "next";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";

const Login = dynamic(
    () => {
        return import("../components/Login");
    },
    { ssr: false }
);

const Home: NextPage = () => {
    return (
        <div>
            <Login />
        </div>
    );
};

export default Home;
