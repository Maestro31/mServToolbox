import React, { Component } from "react";
import ReactDOM from "react-dom";
import { injectJS, injectCSS, removeCSS } from "./injectScript";
import { AppRegistry, View, TouchableOpacity, Image } from "react-native";
import browser from "./browser";
import styled from "styled-components";
import Storage from "./Storage";

const addonUrl = browser.runtime.getURL("./");

const Header = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 40px;
  width: 100%;
`;

const ClientTitle = styled.div`
  margin-left: 20px;
  font-size: 2em;
`;

const StatusSelect = styled.select`
  marginleft: 20px;
`;

class Intervention extends Component {
  constructor(props) {
    super(props);

    injectJS();
    injectCSS();

    document
      .querySelector("body")
      .addEventListener("ChargeInfoDossierComplete", () => {
        this.onDossierLoad();
      });

    document
      .querySelector("body")
      .addEventListener("ChargeInfoClientComplete", () => {
        this.onClientInfoLoad();
      });

    this.state = {
      darkModeEnable: true,
      clientName: "",
      numInter: "",
      status: [],
      codes: {},
      currentStatus: ""
    };

    this.storage = new Storage();
  }

  onClientInfoLoad = () => {
    console.log("Client chargé");
    const clientName = document.querySelector("#NomLiv").value;
    this.setState({ clientName });
  };

  onDossierLoad = async () => {
    console.log("Dossier chargé");
    const datas = await this.storage.load();
    this.setState({ status: datas.status, codes: datas.codes });
    const numInter = document.querySelector("#NumDossier").value;
    const inter = this.storage.get(numInter);
    console.log(inter);
    const status = inter && inter.status ? inter.status : "";
    this.setState({ currentStatus: status });
  };

  handleThemeClick = () => {
    if (!this.state.darkModeEnable) {
      injectCSS();
    } else {
      removeCSS();
    }
    this.setState({ darkModeEnable: !this.state.darkModeEnable });
  };

  onChangeStatus = event => {
    const status = event.target.value;
    this.setState({ currentStatus: status });
    const numero = document.querySelector("#NumDossier").value;
    console.log(status);
    if (status !== "") {
      this.storage.edit({ numero, status });
    } else {
      this.storage.remove(numero);
    }
  };

  render() {
    return (
      <Header id="toolbox-container">
        <TouchableOpacity onPress={() => this.handleThemeClick()}>
          <img src={`${addonUrl}images/icone_lune_30x30.png`} height="30" />
        </TouchableOpacity>
        <TouchableOpacity>
          <img src={`${addonUrl}images/logo_convert.png`} height="30" />
        </TouchableOpacity>
        <TouchableOpacity>
          <img src={`${addonUrl}images/logo_copy.png`} height="30" />
        </TouchableOpacity>
        <StatusSelect
          onChange={e => this.onChangeStatus(e)}
          value={this.state.currentStatus}
        >
          <option value="" />
          {this.state.status.map((status, i) => (
            <option key={i} value={status.title}>
              {status.title}
            </option>
          ))}
        </StatusSelect>
        <ClientTitle id="client-title">{this.state.clientName}</ClientTitle>
      </Header>
    );
  }
}

const viewport = document.getElementsByTagName("body")[0];
const app = document.createElement("div");
app.id = "intervention-root";

if (viewport) viewport.prepend(app);

AppRegistry.registerComponent("Intervention", () => Intervention);

ReactDOM.render(<Intervention />, document.getElementById("intervention-root"));
