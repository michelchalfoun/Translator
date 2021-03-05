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
    };
  }

  async componentDidMount() {
    var languageRequest = new FormData();
    languageRequest.append("key", "AIzaSyCQY5StYhPQJJpcBUrtpnDa_nQmPipNf3c");
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
    });
  }

  async myTranslate(i) {
    const { input1, input2, language1, language2, languageMap } = this.state;

    var translationRequest = new FormData();
    if (i === 1) {
      translationRequest.append("q", input2);
      translationRequest.append("target", languageMap[language1]);
    } else if (i === 2) {
      translationRequest.append("q", input1);
      translationRequest.append("target", languageMap[language2]);
    }
    translationRequest.append("key", "AIzaSyCQY5StYhPQJJpcBUrtpnDa_nQmPipNf3c");

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
    const { input1, input2, languageNames } = this.state;

    const languages = _.map(languageNames, (languageName, index) => ({
      key: index,
      text: languageName,
      value: index,
    }));
    return (
      <div
        style={{
          // position: "absolute",
          left: "0%",
          top: "0%",
          height: "100vh",
          width: "100vw",
          backgroundColor: `rgb(138,196,208)`,
        }}
      >
        <div
          style={{
            // backgroundColor: "red",
            position: "absolute",
            left: "50%",
            top: "40%",
            transform: "translate(-50%, -50%)",
          }}
        >
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
                    animated
                  >
                    <Button.Content visible>Tell Person 2</Button.Content>
                    <Button.Content hidden>
                      <Icon name="arrow right" />
                    </Button.Content>
                  </Button>
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
                    animated
                  >
                    <Button.Content visible>Tell Person 1</Button.Content>
                    <Button.Content hidden>
                      <Icon name="arrow left" />
                    </Button.Content>
                  </Button>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}
