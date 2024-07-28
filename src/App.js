import logo from "./logo.svg";

import "./App.css";
import Parent from "./state-binding-issue/Parent";
import ChoiceChip from "./choicechip-field/choicechip";

function App() {
  return (
    <div className="App">
      {/* <Parent /> */}
      <ChoiceChip
        options={[
          { name: "standard", value: "standard", label: "Standard" },
          { name: "custom", value: "custom", label: "Custom" },
          { name: "all", value: "all", label: "All" },
        ]}
      />
    </div>
  );
}

export default App;
