import { useState } from "react";
import dbonemodals from "../DragonBone/DragonBoneTester.module.css";

export default function DragonBoneTester() {
  // FIX: controlled inputs must always have safe values
  const [orientation, setOrientation] = useState("landscape");
  const [speed, setSpeed] = useState(1);

  return (
    <div className={dbonemodals.modalBackground}>
      {/* VIEWPORT */}
      <div className={dbonemodals.viewport}>
        <div className={dbonemodals.canvasWrap}>
          <div
            className={`${dbonemodals.canvasFrame} ${
              orientation === "landscape"
                ? dbonemodals.landscape
                : dbonemodals.portrait
            }`}
          >
            <div className={dbonemodals.overlay}>
              Load all three files to preview
            </div>

            <div className={dbonemodals.zoomControls}>
              <div className={dbonemodals.zoomBtn}>✋</div>
              <div className={dbonemodals.zoomBtn}>+</div>
              <div className={dbonemodals.zoomBtn}>−</div>
              <div className={dbonemodals.zoomBtn}>⌖</div>
              <div className={dbonemodals.zoomLabel}>100%</div>
            </div>
          </div>
        </div>
      </div>

      {/* PANEL */}
      <div className={dbonemodals.panel}>
        <div>
          <h2 className={dbonemodals.h2}>DragonBones Previewer</h2>
          <div className={dbonemodals.sub}>
            Upload your DragonBones export files here to preview animations.
          </div>
        </div>

        <div className={dbonemodals.hr} />

        {/* ORIENTATION */}
        <div className={dbonemodals.group}>
          <label className={dbonemodals.label}>Canvas Orientation</label>
          <select
            className={dbonemodals.select}
            value={orientation}
            onChange={(e) => setOrientation(e.target.value)}
          >
            <option value="landscape">Landscape 1280 × 720</option>
            <option value="portrait">Portrait 720 × 1280</option>
          </select>
        </div>

        <div className={dbonemodals.hr} />

        {/* DROPZONE */}
        <div className={dbonemodals.dropzone}>
          Drop all 3 files here
          <br />
          <span style={{ fontSize: 10, color: "#2a2a3a" }}>
            or use pickers below
          </span>
        </div>

        {/* FILES */}
        <div className={dbonemodals.group}>
          <label className={dbonemodals.label}>Files — load all three</label>

          <div className={dbonemodals.fileRow}>
            <div className={dbonemodals.dot}></div>
            <input
              className={dbonemodals.input}
              type="file"
              accept=".dbbin,.json"
            />
          </div>
          <div className={dbonemodals.hint}>
            _ske.dbbin or _ske.json
          </div>

          <div className={dbonemodals.fileRow}>
            <div className={dbonemodals.dot}></div>
            <input className={dbonemodals.input} type="file" accept=".json" />
          </div>
          <div className={dbonemodals.hint}>_tex.json</div>

          <div className={dbonemodals.fileRow}>
            <div className={dbonemodals.dot}></div>
            <input className={dbonemodals.input} type="file" accept=".png" />
          </div>
          <div className={dbonemodals.hint}>_tex.png</div>
        </div>

        <div className={dbonemodals.hr} />

        {/* CONTROLS */}
        <div className={dbonemodals.group}>
          <label className={dbonemodals.label}>Armature</label>
          <select className={dbonemodals.select} disabled>
            <option>—</option>
          </select>
        </div>

        <div className={dbonemodals.group}>
          <label className={dbonemodals.label}>Animation</label>
          <select className={dbonemodals.select} disabled>
            <option>—</option>
          </select>
        </div>

        <div className={dbonemodals.group}>
          <label className={dbonemodals.label}>Loop (0 = infinite)</label>
          <select className={dbonemodals.select} disabled>
            <option value="0">Infinite</option>
            <option value="1">1×</option>
            <option value="2">2×</option>
            <option value="3">3×</option>
          </select>
        </div>

        {/* SPEED (FIXED controlled input error) */}
        <div className={dbonemodals.group}>
          <label className={dbonemodals.label}>Speed</label>
          <div className={dbonemodals.row}>
            <input
              className={dbonemodals.input}
              type="range"
              min="0.1"
              max="3"
              step="0.05"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled
            />
            <span className={dbonemodals.zoomLabel}>
              {speed.toFixed(2)}×
            </span>
          </div>
        </div>

        {/* BUTTONS */}
        <div className={dbonemodals.row}>
          <button className={dbonemodals.button} disabled>
            ▶ Play
          </button>
          <button
            className={dbonemodals.button}
            style={{ width: 36 }}
            disabled
          >
            ■
          </button>
        </div>

        <div className={dbonemodals.log}>Waiting for files…</div>
      </div>
    </div>
  );
}