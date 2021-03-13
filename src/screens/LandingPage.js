import { React } from "react";
import {
  Image,
  Reveal,
  Button,
  Icon,
  Header,
  Statistic,
} from "semantic-ui-react";
import Globe from "../Assets/ezgif.com-crop2.gif";
import MainImage from "../Assets/computer-icons-smiley-happy-person-icon-png-happier-people-138c2ed3060a91a54ed41bdf9dafa6da2.png";

function LandingPage() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: `rgb(138,196,208)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "30vw",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Reveal
          style={{
            width: 150,
            position: "inherit",
            left: "50%",
            // top: "50%",
            transform: "translate(-50%, 0)",
          }}
          animated="fade"
        >
          <Reveal.Content visible>
            <Image circular size="small" src={MainImage} />
          </Reveal.Content>
          <Reveal.Content hidden>
            <Image circular size="small" src={Globe} />
          </Reveal.Content>
        </Reveal>
        <Header textAlign="center" as="h1">
          Welcome to Translator!
        </Header>
        <Button
          href="/Translate"
          color="blue"
          size="large"
          style={{
            marginTop: 20,
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
          animated
        >
          <Button.Content visible>Start Translating!</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow right" />
          </Button.Content>
        </Button>
        <Statistic
          style={{
            position: "absolute",
            marginTop: 20,
            left: "50%",
            top: "100%",
            transform: "translate(-50%, 0)",
          }}
        >
          <Statistic.Value>104</Statistic.Value>
          <Statistic.Label>Languages</Statistic.Label>
        </Statistic>
      </div>
    </div>
  );
}

export default LandingPage;
