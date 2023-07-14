// Butter.js
import React, { useEffect, useRef, useState } from 'react';
import { mobile } from '../variables';

const Butter = ({ wrapperId, children }) => {

  const [isMobile, setIsMobile] = useState(false)
  const [damper, setDamper] = useState(0.03)

  useEffect(() => {
      setIsMobile(mobile())
      setDamper(isMobile?0.1:0.03)
  }, [isMobile])
  

  const wrapperRef = useRef(null);
  let wrapperDamper;
  let wrapper;
  let wrapperOffset = 0;
  let animateId;
  let resizing = false;
  let active = false;
  let wrapperHeight;

  const defaults = {
    wrapperDamper: damper,
    cancelOnTouch: false
  };
  
  useEffect(() => {
  
    const validateOptions = (ops) => {
      for (let prop in ops) {
        if (defaults.hasOwnProperty(prop)) {
          Object.defineProperty(defaults, prop, {
            value: Object.getOwnPropertyDescriptor(ops, prop).value
          });
        }
      }
    };
  
    const wrapperUpdate = () => {
      const scrollY =
        document.scrollingElement !== undefined
          ? document.scrollingElement.scrollTop
          : document.documentElement.scrollTop || 0.0;
  
      wrapperOffset += (scrollY - wrapperOffset) * wrapperDamper;
      wrapper.style.transform = `translate3d(0, ${-wrapperOffset.toFixed(2)}px, 0)`;
    };
  
    const checkResize = () => {
      if (wrapperHeight !== wrapper.clientHeight) {
        resize();
      }
    };
  
    const resize = () => {
      if (!resizing) {
        resizing = true;
        window.cancelAnimationFrame(animateId);
  
        window.setTimeout(() => {
          wrapperHeight = wrapper.clientHeight;
  
          if (parseInt(document.body.style.height) !== parseInt(wrapperHeight)) {
            document.body.style.height = `${wrapperHeight}px`;
          }
  
          animateId = window.requestAnimationFrame(animate);
          resizing = false;
        }, 150);
      }
    };
  
    const animate = () => {
      checkResize();
      wrapperUpdate();
      animateId = window.requestAnimationFrame(animate);
    };
  
    const cancel = () => {
      if (active) {
        window.cancelAnimationFrame(animateId);
  
        window.removeEventListener('resize', resize);
        window.removeEventListener('touchstart', cancel);
  
        wrapper.removeAttribute('style');
        document.body.removeAttribute('style');
  
        active = false;
        wrapper = '';
        wrapperOffset = 0;
        resizing = true;
        animateId = '';
      }
    };
    validateOptions();

    active = true;
    resizing = false;
    wrapperDamper = defaults.wrapperDamper;

    wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.style.position = 'fixed';
      wrapper.style.width = '100%';

      wrapperHeight = wrapper.clientHeight;

      window.addEventListener('resize', resize);
      if (defaults.cancelOnTouch) {
        window.addEventListener('touchstart', cancel);
      }

      wrapperOffset = 0.0;
      animateId = window.requestAnimationFrame(animate);
    }

    return () => {
      cancel();
    };
  }, []);

  return (
    <div ref={wrapperRef} id={wrapperId}>
      {children}
    </div>
  );
};

export default Butter;
