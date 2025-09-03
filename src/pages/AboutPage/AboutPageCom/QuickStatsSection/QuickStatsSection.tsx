import React, { useRef, useState, useEffect } from "react";
import CountUp from "react-countup";
import "./QuickStatsSection.css";
import useIntersectionAnimation from "../../../../core/hooks/useIntersectionAnimation/useIntersectionAnimation";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
  formatter?: (value: number) => string;
}

const stats: StatItem[] = [
  { value: 11, suffix: "+", label: "Years experience" },
  { value: 40, suffix: "+", label: "Fastfood items" },
  {
    value: 3000,
    suffix: "+",
    label: "Happy Customers",
    formatter: (value: number) =>
      `${(value / 1000).toFixed(1).replace(".0", "")}k+`,
  },
  { value: 10, suffix: "+", label: "Awards Won" },
];

const QuickStatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [startCount, setStartCount] = useState<boolean>(false);

  // Animate stat boxes
  useIntersectionAnimation(".stat-box");

  // Start counting when section enters viewport
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStartCount(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div className="quick-stats-bg" ref={sectionRef}>
      <section className="quick-stats-section">
        {stats.map((stat, index) => (
          <div className="stat-box" key={index}>
            <h2 className="stat-number">
              {startCount && (
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  suffix={stat.suffix}
                  {...(stat.formatter && { formattingFn: stat.formatter })}
                />
              )}
            </h2>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default QuickStatsSection;
