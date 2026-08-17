import { ArrowRight, ArrowUpRight } from "lucide-react";
import Artwork, { CosmosArt } from "@/components/ui/Artwork";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import type { Dictionary } from "@/lib/i18n";

export default function Projects({ t }: { t: Dictionary }) {
  const featured = t.work.featured;

  return (
    <section className="section" id="work">
      <div className="container">
        <SectionHead
          index={t.work.index}
          label={t.work.label}
          title={t.work.title}
          subtitle={t.work.subtitle}
        />

        {/* ---- Featured project ---- */}
        <Reveal as="article" className="featured">
          <div className="featured__media">
            <CosmosArt title={featured.name} />
          </div>
          <div className="featured__body">
            <span className="featured__tag">{t.work.featuredLabel}</span>
            <h3 className="featured__name">{featured.name}</h3>
            <p className="featured__tagline">{featured.tagline}</p>

            <div className="featured__blocks">
              <div className="fblock">
                <b>{t.work.challengeLabel}</b>
                <p>{featured.challenge}</p>
              </div>
              <div className="fblock">
                <b>{t.work.solutionLabel}</b>
                <p>{featured.solution}</p>
              </div>
              <div className="fblock">
                <b>{t.work.resultLabel}</b>
                <p>{featured.result}</p>
              </div>
            </div>

            <div className="chips">
              {featured.tech.map((tech) => (
                <span className="chip" key={tech}>
                  {tech}
                </span>
              ))}
            </div>

            <div>
              <a
                className="btn btn--onDark btn--sm"
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.work.viewProject}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>

        {/* ---- Everything else, as an editorial list ---- */}
        <div className="projects">
          {t.work.items.map((project) => (
            <Reveal as="article" className="proj" key={project.id}>
              <div className="proj__media">
                <Artwork id={project.id} title={project.nameLatin} />
              </div>
              <div className="proj__body">
                <div className="proj__meta">
                  <span>{project.category}</span>
                  <i className="sep" aria-hidden="true" />
                  <span>{project.year}</span>
                </div>
                <h3 className="proj__name">{project.name}</h3>
                <p className="proj__desc">{project.description}</p>
                <div className="chips">
                  {project.tech.map((tech) => (
                    <span className="chip chip--light" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link ? (
                  <a className="tlink" href={project.link} target="_blank" rel="noopener noreferrer">
                    {t.work.viewProject}
                    <ArrowRight size={15} className="icon-arrow" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
