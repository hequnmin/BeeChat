import React, { useRef, useEffect } from 'react';

function ScrollToBottomContainer({ children }) {
    const containerRef = useRef(null);
  
    useEffect(() => {
      if (containerRef.current) {
        scrollToBottom();
      }
    }, [children]);
  
    const scrollToBottom = () => {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    };
  
    return (
      <div ref={containerRef} className="scroll_bottom">
        {children}
      </div>
    );
}
export default ScrollToBottomContainer;
  