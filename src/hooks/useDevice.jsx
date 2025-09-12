import { useLayoutEffect, useState } from "react";

function useDevice() {
  const getDeviceSize = () => {
    const width = window.innerWidth;
    if (width < 768) {
      return "sm";
    } else if (width >= 768 && width < 992) {
      return "md";
    } else {
      return "lg";
    }
  };

  const [device, setDevice] = useState(getDeviceSize());

  const handleResize = () => {
    setDevice(getDeviceSize());
  };

  useLayoutEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return device;
}

export default useDevice;
