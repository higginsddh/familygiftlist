import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  AppShell,
  Navbar,
  Header,
  Container,
  Text,
  createStyles,
} from "@mantine/core";

import { trpc } from "../utils/trpc";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
}));

const Home: NextPage = () => {
  const { classes } = useStyles();

  return (
    <>
      <Header height={HEADER_HEIGHT} mb={50} className={classes.root}>
        <Container className={classes.header}>
          <Text fz="xl">Higgins Family Gift List</Text>
        </Container>
      </Header>
      <Container>Test</Container>
    </>
  );
};

export default Home;
