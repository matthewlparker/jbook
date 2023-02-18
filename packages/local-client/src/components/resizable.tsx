import './resizable.css';
import { useState, useEffect } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints: [windowWidth * 0.2, Infinity],
      maxConstraints: [windowWidth * 0.75, Infinity],
      height: Infinity,
      width,
      resizeHandles: ['e'],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      className: 'resize-vertical',
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, windowHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
