import logo from "./logo.svg";

import "./App.css";
import Parent from "./state-binding-issue/Parent";
import ChoiceChip from "./choicechip-field/choicechip";
import Assignment from "./assignment/figmaNestedComponents";

function App() {
  return (
    <div className="App">
      {/* <Parent /> */}
      {/* <ChoiceChip
        options={[
          { name: "standard", value: "standard", label: "Standard" },
          { name: "custom", value: "custom", label: "Custom" },
          { name: "all", value: "all", label: "All" },
        ]}
      /> */}
      <Assignment />
    </div>
  );
}

export default App;
