"use client";

import { cn } from "../../@/lib/utils";
import { GridPattern } from "./../../@/components/magicui/grid-pattern";

const GridPatternLinearGradient = () => {
  return (
    <GridPattern
      width={20}
      height={20}
      x={-1}
      y={-1}
      className={cn(
        "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
      )}
    />
  );
};

export default GridPatternLinearGradient;
