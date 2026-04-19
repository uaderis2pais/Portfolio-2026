import React, { useEffect, useState } from "react";
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from "react-icon-cloud";

export const cloudProps = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40
    }
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02
  }
};

export const renderCustomIcon = (icon) => {
  return renderSimpleIcon({
    icon,
    bgHex: "#020617",
    fallbackHex: "#ffffff",
    minContrastRatio: 1.2,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e) => e.preventDefault()
    }
  });
};

export function IconCloud({ iconSlugs }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
  }, [iconSlugs]);

  const renderedIcons = React.useMemo(() => {
    if (!data) return null;
    return Object.values(data.simpleIcons).map((icon) => renderCustomIcon(icon));
  }, [data]);

  return (
    <Cloud {...cloudProps}>
      {renderedIcons}
      {/* <a> tag placeholders for cloud to render nicely if no icons */}
    </Cloud>
  );
}
