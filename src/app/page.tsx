export default function AboutPage() {
  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      <h1 className="font-mono text-lg text-accent mb-6">About</h1>

      <section className="mb-8">
        <h2 className="font-mono text-sm text-text-secondary mb-3 uppercase tracking-wider">
          Profile
        </h2>
        <p className="text-text leading-relaxed">
          BlockBench를 활용한 3D 복셀 아트 아티스트입니다. 게임 에셋, 환경,
          캐릭터 모델링을 중심으로 작업하고 있습니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-mono text-sm text-text-secondary mb-3 uppercase tracking-wider">
          Skills
        </h2>
        <ul className="flex flex-wrap gap-2">
          {[
            "BlockBench",
            "Voxel Art",
            "3D Modeling",
            "Pixel Art",
            "Game Assets",
            "Environment Design",
            "Character Design",
          ].map((skill) => (
            <li
              key={skill}
              className="border border-border px-3 py-1 text-sm font-mono text-text-secondary"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-mono text-sm text-text-secondary mb-3 uppercase tracking-wider">
          Tools
        </h2>
        <ul className="flex flex-wrap gap-2">
          {["BlockBench", "Blender", "Aseprite", "Photoshop"].map((tool) => (
            <li
              key={tool}
              className="border border-border px-3 py-1 text-sm font-mono text-text-secondary"
            >
              {tool}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
