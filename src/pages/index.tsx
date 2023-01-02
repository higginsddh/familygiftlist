import { type NextPage } from "next";
import { Header, Container, Text, createStyles } from "@mantine/core";
import { GiftList } from "../components/GiftList";

const HEADER_HEIGHT = 60;

const useStyles = createStyles(() => ({
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
      <Container>
        <GiftList />
      </Container>
    </>
  );
};

export default Home;
