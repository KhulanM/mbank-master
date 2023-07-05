import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import App from "../components/Table";
import { useRouter } from "next/router";

export default function Home() {
  return (
    <div>
      <h2 className="text-center py-10 font-extrabold text-2xl text-green-800">
        Test Project
      </h2>
    </div>
  );
}
