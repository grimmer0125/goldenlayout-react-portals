import React from "react";
import { render } from "react-dom";
import { GoldenLayoutComponent } from "./goldenLayoutComponent";
import { MyGoldenPanel } from "./myGoldenPanel";
import { AppContext } from "./appContext";

class App extends React.Component {
  state = { contextValue: "default value" };
  render() {
    return (
      <div>
        <h2>GoldenLayout patched with React Portals:</h2>
        <div>
          change context value:<input
            value={this.state.contextValue}
            onChange={e => {
              this.setState({ contextValue: e.target.value });
            }}
          />
        </div>
        <AppContext.Provider value={this.state.contextValue}>
          <GoldenLayoutComponent //config from simple react example: https://golden-layout.com/examples/#qZXEyv
            htmlAttrs={{ style: { height: "500px", width: "500px" } }}
            config={{
              content: [
                {
                  type: "row",
                  content: [
                    {
                      title: "A react component",
                      type: "react-component",
                      component: "testItem",
                      props: { value: "I'm on the left" }
                    },
                    {
                      title: "Another react component",
                      type: "react-component",
                      component: "testItem"
                    }
                  ]
                }
              ]
            }}
            registerComponents={myLayout => {
              myLayout.registerComponent("testItem", MyGoldenPanel);
            }}
          />
        </AppContext.Provider>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
