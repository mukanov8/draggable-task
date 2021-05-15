import React, { useRef, useState, useCallback, useEffect } from "react";

/* I decided to go with straighforward approach and update the position of that element directly using CSS transform with translate function. */
const Draggable = React.memo(({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const handleIsMouseDown = useCallback(() => setIsMouseDown(true), []);

  const isValidPosition = useCallback(
    (x: number, y: number, right: number, bottom: number) => {
      if (y < 0 || x < 0) return false;
      if (right > window.innerWidth || bottom > window.innerHeight)
        return false;
      return true;
    },
    []
  );

  const handleDragging = useCallback(
    (deltaX: number, deltaY: number) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      
      /* reference: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect */
      const { x, y, bottom, right } = wrapper.getBoundingClientRect();

      if (isValidPosition(x + deltaX, y + deltaY, right + deltaX, bottom + deltaY))
        wrapper.style.transform = `translate(${x + deltaX}px, ${y + deltaY}px)`;
    },
    [isValidPosition]
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleDragging(e.movementX, e.movementY);
    const onMouseUp = () => setIsMouseDown(false);

    if (isMouseDown) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
  }, [isMouseDown, handleDragging]);

  return (
    <div
      className="draggable"
      ref={wrapperRef}
      role="none"
      onMouseDown={handleIsMouseDown}
      style={{ cursor: isMouseDown? "grabbing" : "grab", position: "absolute" }}
    >
      {children}
    </div>
  );
});

export default Draggable;
