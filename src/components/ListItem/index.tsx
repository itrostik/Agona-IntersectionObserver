import styles from "./index.module.css";
import React, { SetStateAction, useEffect, useRef } from "react";

type Props = {
  elements: number[];
  showList: boolean;
  item: number;
  visibleBlocks: number[];
  setVisibleBlocks: React.Dispatch<SetStateAction<number[]>>;
};

export const ListItem = ({
  elements,
  showList,
  item,
  visibleBlocks,
  setVisibleBlocks,
}: Props) => {
  const currentElement = useRef<HTMLDivElement>(null);

  const observerCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => {
    const lastBlock = entries[0];
    if (lastBlock.isIntersecting) {
      const lengthBlocks = visibleBlocks.length;
      if (lengthBlocks + 5 <= elements.length) {
        setVisibleBlocks(elements.slice(0, lengthBlocks + 5));
      } else {
        setVisibleBlocks(elements.slice(0, elements.length));
      }
      observer.unobserve(lastBlock.target);
    }
  };

  useEffect(() => {
    const options = {
      threshold: 0.9,
      rootMargin: "0px 0px 100px 0px",
    };
    const infinityObserver = new IntersectionObserver(
      observerCallback,
      options,
    );

    if (showList && infinityObserver && currentElement.current) {
      infinityObserver.observe(currentElement.current);
    }

    return () => {
      infinityObserver.disconnect();
    };
  }, [showList]);

  return (
    <div ref={currentElement} className={styles.item}>
      {item}
    </div>
  );
};
