import classNames from "classnames";
import React, { useEffect, useState, useCallback, useRef } from "react";
import "./choicechip.css";

const ChoiceChip = ({ options }) => {
  const [formValue, setFormValue] = useState(null);

  console.log("👾 | formValue:", formValue);

  const slidingBackgroundRef = useRef(null);
  const baseRef = useRef(null);
  const optionRefs = useRef([]);

  const handleOptionClick = useCallback(
    (name, index) => {
      setFormValue((prevValue) => (prevValue === name ? null : name));
      // Reset all active states
      optionRefs.current.forEach((ref, i) => {
        if (ref) {
          ref.classList.toggle("active", i === index && formValue !== name);
        }
      });
    },
    [formValue]
  );

  useEffect(() => {
    const updateBackground = (element) => {
      const slidingBackground = slidingBackgroundRef.current;
      if (!element) {
        slidingBackground.style.opacity = 0;
        return;
      }

      const rect = element.getBoundingClientRect();
      const baseRect = baseRef.current.getBoundingClientRect();
      const offsetLeft = rect.left - baseRect.left - 2;
      const width = rect.width;

      slidingBackground.style.opacity = 1;
      slidingBackground.style.transform = `translateX(${offsetLeft}px)`;
      slidingBackground.style.width = `${width}px`;
    };

    const activeIndex = options.findIndex(
      (option) => option.name === formValue
    );
    const activeOption = optionRefs.current[activeIndex];
    updateBackground(activeOption);
  }, [formValue, options]);

  return (
    <div className="base" ref={baseRef}>
      <div className="container">
        <div className="sliding-background" ref={slidingBackgroundRef}></div>
        {options.map((option, index) => (
          <div
            key={index}
            className={classNames("option", {
              active: formValue === option.name,
            })}
            ref={(el) => (optionRefs.current[index] = el)}
            onClick={() => handleOptionClick(option.name, index)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoiceChip;
