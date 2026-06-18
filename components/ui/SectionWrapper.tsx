"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

interface Props {
  id: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, children, className = "" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`transition-[opacity,transform,filter] duration-700 ${
        visible ? "opacity-100 translate-y-0 blur-none" : "opacity-0 translate-y-5 blur-sm"
      } ${className}`}
      style={{ transitionTimingFunction: "cubic-bezier(0,0,0.2,1)" }}
    >
      {children}
    </section>
  );
}
