import React, { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const Tour = () => {
  useEffect(() => {
    const drivert = driver({
      steps: [
        {
          element: "#react-element",
          popover: {
            title: "React 元素",
            description: "这是一个在 React 项目中使用 Driver.js 的示例",
          },
        },
      ],
    });

    drivert.drive();
  }, []);

  return null
};

export default Tour;
