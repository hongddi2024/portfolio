import FeaturedCarousel from "@/components/FeaturedCarousel";
import { assetPath } from "@/lib/basepath";

export default function AboutPage() {
  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      <h1 className="font-mono text-lg text-accent mb-6">About</h1>

      <section className="mb-8 flex items-start gap-6">
        <div className="shrink-0 w-40 h-40 border border-border bg-card overflow-hidden">
          <img src={assetPath("/images/profile/hongddi2.png")} alt="Hongddi Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="font-mono text-sm text-text-secondary mb-3 uppercase tracking-wider">
            Profile
          </h2>
          <p className="text-text leading-relaxed">
            로우폴리 모델링을 주력으로 하는 3D 아티스트입니다. 게임 에셋, 캐릭터
            모델링을 중심으로 작업하고 있습니다.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="font-mono text-sm text-text-secondary mb-3 uppercase tracking-wider">
          Skills
        </h2>
        <ul className="flex flex-wrap gap-2">
          {[
            "Pixel Art",
            "Lowpoly",
            "3D Modeling",
            "Texture Mapping",
            "Character Design",
            "Assets Design",
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

      <section className="mb-8">
        <h2 className="font-mono text-sm text-text-secondary mb-3 uppercase tracking-wider">
          Tools
        </h2>
        <ul className="flex flex-wrap gap-2">
          {["Blockbench", "Aseprite", "3DS MAX", "Cinema4D", "Blender"].map((tool) => (
            <li
              key={tool}
              className="border border-border px-3 py-1 text-sm font-mono text-text-secondary"
            >
              {tool}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-mono text-sm text-text-secondary mb-3 uppercase tracking-wider">
          Featured Works
        </h2>
        <FeaturedCarousel />
      </section>
    </div>
  );
}
