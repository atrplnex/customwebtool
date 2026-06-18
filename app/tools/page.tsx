"use client";
import WebpConverter from "@/components/tools/WebpConverter/WebpConverter";
import Image from "next/image";
import styles from "./page.module.css";
import container from "./component.module.css";
import { useState } from "react";

export default function Home() {
  const toolList = [
    "Converter to Webp",
    "Convert to PNG",
    "Convert to PList",
    "Bitmap Font Tester",
    "Rich Text Tester",
  ];

  const toolComponents: Record<string, React.ReactNode> = {
    "Converter to Webp": <WebpConverter />,
  };
  const contentStyle = {};

  const [selectedTool, setSelectedTool] = useState(toolList[0]);

  return (
    <div className={container.layout}>
      {/* SIDEBAR */}
      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>
          <b>Tool Selection</b>
        </h2>

        {toolList.map((tool) => (
          <div
            key={tool}
            className={styles.sidebarItem}
            onClick={() => setSelectedTool(tool)}
          >
            <div
              className={`${styles.sidebarItemSelector} ${
                selectedTool === tool ? styles.activeSelector : ""
              }`}
            />
            <div className={styles.sidebarItemName}>{tool}</div>
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className={container.centerContainer}>
        {toolComponents[selectedTool]}
      </div>
    </div>
  );
}
