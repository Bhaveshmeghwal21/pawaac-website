"use client";

import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Counter({
  end,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = "",
  className,
}: {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <span ref={ref} className={className}>
      {inView ? (
        <CountUp
          end={end}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          separator={separator}
          duration={2}
        />
      ) : (
        `${prefix}${(0).toFixed(decimals)}${suffix}`
      )}
    </span>
  );
}
