import styles from "./App.module.css";
import { useEffect, useState } from "react";
import { ListItem } from "./components/ListItem";

const Elements = Array.from({ length: 100_000_000 }).map((_, index) => index);

function App() {
  const [showList, setShowList] = useState(false);

  const [visibleBlocks, setVisibleBlocks] = useState<number[]>(
    Elements.slice(0, 2),
  );

  useEffect(() => {
    if (showList) {
      setVisibleBlocks(Elements.slice(0, 2));
    } else {
      setVisibleBlocks([]);
    }
  }, [showList]);

  const handleShowList = () => {
    setShowList(!showList);
  };

  return (
    <div className={styles.layout}>
      <button onClick={handleShowList}>
        {!showList ? "Показать" : "Скрыть"} список
      </button>

      {showList &&
        visibleBlocks.map((item) => (
          <ListItem
            showList={showList}
            elements={Elements}
            key={item}
            item={item}
            setVisibleBlocks={setVisibleBlocks}
            visibleBlocks={visibleBlocks}
          />
        ))}
    </div>
  );
}

export default App;
