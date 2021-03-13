import _ from "lodash";
import React, { Component } from "react";
import {
  TextArea,
  Grid,
  Header,
  Form,
  Dropdown,
  Button,
  Icon,
} from "semantic-ui-react";
const config = require("../Config/config");
var iso6392 = require("iso-639-2");

export default class TranslatorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageNames: [],
      languageMap: "",
      isLoading: false,
      language1: "",
      language2: "",
      input1: "",
      input2: "",
      thumbsUp: false,
      thumbsDown: false,
    };
  }

  async handleThumbsUp() {
    this.setState({ thumbsDown: false, thumbsUp: true });
    return;
  }
  async handleThumbsDown() {
    this.setState({ thumbsDown: true, thumbsUp: false });
    return;
  }

  async componentDidMount() {
    var languageRequest = new FormData();
    languageRequest.append("key", config.googleTranslationAPI.key);
    const response = await fetch(
      "https://translation.googleapis.com/language/translate/v2/languages",
      {
        method: "POST",
        body: languageRequest,
      }
    ).then((response) => response.json());

    let languageMapTemp = new Map();
    var languageNamesTemp = [];
    var languageCodesTemp = response.data.languages;

    var i, j;
    for (i = 0; i < languageCodesTemp.length; i++) {
      for (j = 0; j < iso6392.length; j++) {
        if (languageCodesTemp[i].language === iso6392[j].iso6391) {
          languageNamesTemp.push(iso6392[j].name);
          languageMapTemp[iso6392[j].name] = languageCodesTemp[i].language;
          break;
        }
      }
    }

    this.setState({
      languageNames: languageNamesTemp,
      languageMap: languageMapTemp,
      isLoading: false,
      language1: "",
      language2: "",
      input1: "",
      input2: "",
      thumbsUp: false,
      thumbsDown: false,
    });
  }

  async myTranslate(i) {
    const { input1, input2, language1, language2, languageMap } = this.state;

    if (i === 1) {
      if (!language1 || !input2) {
        return;
      }
    } else if (i === 2) {
      if (!language2 || !input1) {
        return;
      }
    } else {
      return;
    }

    var translationRequest = new FormData();
    if (i === 1) {
      translationRequest.append("q", input2);
      translationRequest.append("target", languageMap[language1]);
    } else if (i === 2) {
      translationRequest.append("q", input1);
      translationRequest.append("target", languageMap[language2]);
    }
    translationRequest.append("key", config.googleTranslationAPI.key);

    const response = await fetch(
      "https://translation.googleapis.com/language/translate/v2",
      {
        method: "POST",
        body: translationRequest,
      }
    ).then((response) => response.json());
    if (i === 1) {
      this.setState({ input1: response.data.translations[0].translatedText });
    } else if (i === 2) {
      this.setState({ input2: response.data.translations[0].translatedText });
    }
    return;
  }

  render() {
    const { input1, input2, languageNames, thumbsDown, thumbsUp } = this.state;

    const languages = _.map(languageNames, (languageName, index) => ({
      key: index,
      text: languageName,
      value: index,
    }));
    return (
      <div
        style={{
          left: "0%",
          top: "0%",
          height: "100vh",
          width: "100vw",
          backgroundColor: `rgb(138,196,208)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "45%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Header
            style={{
              transform: "translate(40%, 0%)",
              marginBottom: "8%",
            }}
            as="h2"
            icon
          >
            Translator.
            <Header.Subheader>
              Choose your languages and start typing!
            </Header.Subheader>
            <Header.Subheader>
              When reading a translation, make sure to rate it with the
              corresponding thumbs up/down buttons.
            </Header.Subheader>
          </Header>
          <Grid style={{ width: 1250 }} columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Header textAlign="center" as="h1">
                  Person 1.
                </Header>
                <Dropdown
                  style={{
                    marginTop: "5%",
                    marginBottom: "5%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  placeholder="Language"
                  search
                  selection
                  options={languages}
                  onChange={(event, data) =>
                    this.setState({ language1: languageNames[data.value] })
                  }
                />
                <Form>
                  <TextArea
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    value={input1}
                    onChange={(event, data) =>
                      this.setState({ input1: data.value })
                    }
                  ></TextArea>
                  <Button
                    onClick={() => this.myTranslate(2)}
                    color="blue"
                    size="large"
                    floated="right"
                    style={{
                      marginTop: "2%",
                    }}
                  >
                    <Button.Content visible>Tell Person 2</Button.Content>
                  </Button>
                  <Icon
                    onClick={() => this.handleThumbsUp()}
                    name="thumbs up"
                  />
                  <Icon
                    onClick={() => this.handleThumbsDown()}
                    name="thumbs down"
                  />
                </Form>
              </Grid.Column>
              <Grid.Column>
                <Header textAlign="center" as="h1">
                  Person 2.
                </Header>
                <Dropdown
                  style={{
                    marginTop: "5%",
                    marginBottom: "5%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  placeholder="Language"
                  search
                  selection
                  options={languages}
                  onChange={(event, data) =>
                    this.setState({ language2: languageNames[data.value] })
                  }
                />
                <Form>
                  <TextArea
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    value={input2}
                    onChange={(event, data) =>
                      this.setState({ input2: data.value })
                    }
                  ></TextArea>
                  <Button
                    onClick={() => this.myTranslate(1)}
                    color="blue"
                    size="large"
                    floated="left"
                    style={{
                      marginTop: "2%",
                    }}
                  >
                    <Button.Content visible>Tell Person 1</Button.Content>
                  </Button>
                  <Form style={{ position: "absolute", right: 0 }}>
                    <Icon
                      onClick={() => this.handleThumbsUp()}
                      name="thumbs up"
                    />
                    <Icon
                      onClick={() => this.handleThumbsDown()}
                      name="thumbs down"
                    />
                  </Form>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Form
            style={{
              transform: "translate(45%, 0%)",
              marginTop: "2%",
            }}
          >
            {thumbsUp && <Icon color="green" size="massive" name="thumbs up" />}
            {thumbsDown && (
              <Icon color="red" size="massive" name="thumbs down" />
            )}
          </Form>
        </div>
      </div>
    );
  }
}
