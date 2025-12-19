export function StatsGrid() {
  const stats = [
    {
      value: "50K+",
      label: "CLIPS GENERATED",
      sublabel: "AND COUNTING",
    },
    {
      value: "98%",
      label: "SUCCESS RATE",
      sublabel: "ACCURACY",
    },
    {
      value: "10M+",
      label: "TOTAL VIEWS",
      sublabel: "ENGAGEMENT",
    },
    {
      value: "45s",
      label: "AVG PROCESSING",
      sublabel: "LIGHTNING FAST",
    },
  ]

  return (
    <section className="border-b-[6px] border-foreground bg-card">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-6 lg:p-10 text-center ${
                index !== stats.length - 1 ? "border-r-[4px] border-foreground" : ""
              } ${index < 2 ? "border-b-[4px] lg:border-b-0 border-foreground" : ""}`}
            >
              <div className="font-sans text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 lg:mb-3">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] lg:text-xs tracking-widest font-bold mb-1">{stat.label}</div>
              <div className="font-mono text-[9px] lg:text-[10px] text-muted-foreground tracking-wider">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
