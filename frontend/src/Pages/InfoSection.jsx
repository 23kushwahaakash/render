import React from "react";
import { FaHtml5, FaCss3, FaJs, FaReact } from "react-icons/fa";
import { TbCircleDashedLetterR ,TbCircleDashedLetterE ,TbCircleDashedLetterN,TbCircleDashedLetterD } from "react-icons/tb";


const cards = [
  {
    title: "What you’ll learn",
    desc: "Gain practical knowledge of HTML, CSS, JavaScript, and React, focusing on responsive layouts, reusable components, hooks, and modern frontend best practices aligned with current industry standards.",
    gradient: "from-indigo-500 to-cyan-500",
    icons: [
      { Icon: FaHtml5, color: "text-orange-500" },
      { Icon: FaCss3, color: "text-blue-500" },
      { Icon: FaJs, color: "text-yellow-400" },
      { Icon: FaReact, color: "text-cyan-400" },
    ],
    smdesc :"Gain practical knowledge of HTML, CSS, JavaScript, and React",
  },
  {
    title: "Who should attend",
    desc: "AKGEC students with interest in web development who want hands-on experience with modern frontend technologies. Suitable for learners seeking to strengthen core concepts and understand real-world software development workflows.",
    gradient: "from-cyan-500 to-emerald-500",
    smdesc :"AKGEC First Year students with interest in web development",
  },
  {
    title: "Hands-on Project",
    desc: "Develop and deploy a production-style full-stack web application. The project emphasizes component-based architecture, state management, API integration, version control, and deployment workflows used in professional development environments.",
    gradient: "from-purple-500 to-pink-500",
    smdesc :"Develop and deploy a production-style full-stack web application",
  },
  {
    title: "Career Exposure",
    desc: "Understand professional development practices including agile workflows, code reviews, tooling ecosystems, and deployment pipelines, offering insight into how software is built and maintained in industry-grade environments.",
    gradient: "from-rose-500 to-red-500",
    smdesc:"Understand professional development practices including agile workflows",
  },
];
const render = [
  {  icons :[
      { Icon: TbCircleDashedLetterR, color: "text-blue-200" },
      { Icon: TbCircleDashedLetterE, color: "text-blue-200" },
      { Icon: TbCircleDashedLetterN, color: "text-blue-200" },
      { Icon: TbCircleDashedLetterD, color: "text-blue-200" },
      { Icon: TbCircleDashedLetterE, color: "text-blue-200" },
      { Icon: TbCircleDashedLetterR, color: "text-blue-200" },
  ]
  }
]


const InfoSection = () => {
  return (
    <section className="relative  bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl hidden font-bold text-white text-center lg:flex items-center justify-center gap-4 mb-16">
          {render[0].icons.map(({ Icon, color }, i) => (
            <div
              key={i}
              className="p-3 rounded-full bg-white/10 border border-white/20
                         backdrop-blur-lg transition-transform hover:scale-110"
            >
              <Icon className={`text-3xl  ${color}`} />
            </div>
          ))}
        </h2>

        {/* ================= DESKTOP STACKED GALLERY ================= */}
        <div className="hidden lg:flex justify-center">
          <div className="relative flex">
            {cards.map((card, index) => (
              <div
                key={index}
                className="relative group"
                style={{ marginLeft: index === 0 ? 0 : "-100px" }}
              >
                <div
                  className="
                    relative w-[340px] h-100
                    rounded-3xl
                    bg-white/10 backdrop-blur-2xl
                    border border-white/20
                    shadow-[0_30px_80px_rgba(0,0,0,0.6)]
                    transition-all duration-500 ease-out
                    group-hover:scale-110
                    group-hover:z-50
                    group-hover:translate-y-[-24px]
                  "
                >
                  {/* Soft gradient glow */}
                  <div
                    className={`absolute inset-0 rounded-3xl 
                    bg-gradient-to-br ${card.gradient}
                    opacity-0 group-hover:opacity-20 blur-[80px] transition-opacity`}
                  />

                  <div className="relative p-8 flex flex-col h-full">
                    <h3 className="text-2xl font-semibold text-white mb-3">
                      {card.title}
                    </h3>

                    <div
                      className={`h-1 w-full rounded-full bg-gradient-to-r ${card.gradient}`}
                    />

                    {/* ICONS (only if present) */}
                    {card.icons && (
                      <div className="flex flex-wrap gap-4 mt-5">
                        {card.icons.map(({ Icon, color }, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-full bg-white/10 border border-white/20
                     backdrop-blur-lg transition-transform
                     hover:scale-110"
                          >
                            <Icon className={`text-3xl ${color}`} />
                          </div>
                        ))}
                      </div>
                    )}

                    <p className="mt-5 text-gray-300 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= MOBILE SWIPE ================= */}
        <div className="lg:hidden flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="snap-center shrink-0 w-[85%]"
            >
              <div
                className="
                  w-full h-100
                  rounded-3xl
                  bg-white/10 backdrop-blur-2xl
                  border border-white/20
                  shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                "
              >
                <div
                  className={`absolute inset-0 rounded-3xl 
                  bg-gradient-to-br ${card.gradient}
                  opacity-20 blur-[90px]`}
                />

                <div className="relative p-7 flex flex-col h-full">
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {card.title}
                  </h3>

                  <div
                    className={`h-1 w-14 rounded-full bg-gradient-to-r ${card.gradient}`}
                  />

                  {/* ICONS */}
                  {card.icons && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      {card.icons.map(({ Icon, color }, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-lg bg-white/10 border border-white/20"
                        >
                          <Icon className={`text-2xl ${color}`} />
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="mt-4 text-[1rem] text-gray-300 leading-relaxed">
                    {card.smdesc}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Hint */}
        <p className="mt-8 text-center text-gray-400 text-sm lg:hidden">
          Swipe to explore →
        </p>
      </div>
    </section>
  );
};

export default InfoSection;
