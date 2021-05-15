import React, { useRef, useState, useCallback, useEffect } from "react";

/* I decided to go with straighforward approach and update the position of that element directly using CSS transform with translate function. */
const Draggable = React.memo(({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const handleIsMouseDown = useCallback(() => setIsMouseDown(true), []);

  // const isValidX = useCallback((x: number, right: number) => x>=0 && right <= window.innerWidth,[]);
  // const isValidY = useCallback((y: number, bottom: number) => y>=0 && bottom <= window.innerHeight,[]);

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
      // isValidX(x + deltaX, right+deltaX) && ( wrapper.style.left = `${x + deltaX}px`);
      // isValidY(y + deltaY, bottom+deltaY) && ( wrapper.style.top = `${y + deltaY}px` );
      if (isValidPosition(x + deltaX, y + deltaY, right + deltaX, bottom + deltaY))
        wrapper.style.transform = `translate(${x + deltaX}px, ${y + deltaY}px)`;
    },
    [isValidPosition]
  );

  useEffect(() => {
    const onMouseUp = () => setIsMouseDown(false);
    window.addEventListener("mouseup", onMouseUp);
    // return () => {
    //   window.addEventListener("mouseup", onMouseUp);
    // };
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleDragging(e.movementX, e.movementY);
    if (isMouseDown) window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
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