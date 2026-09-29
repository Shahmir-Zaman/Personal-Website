// Inner content for the Project Quickview timeline. This is an index entry,
// not a case study: a visitor should be able to take it in at a glance and
// decide whether to click through to the full project. The outer timeline
// chrome (the spine) lives in the section.
const TimelineCard = ({ title, kind, summary, stack = [], highlight, metric = false, cta }) => (
  <div>
    <p className="project-kind">{kind}</p>
    <h3 className="font-bold text-2xl md:text-3xl text-white mt-1">{title}</h3>

    <p className="mt-4 max-w-2xl text-base md:text-lg font-light leading-relaxed text-white-50">
      {summary}
    </p>

    {stack.length > 0 && (
      <ul className="mt-5 flex flex-wrap gap-2">
        {stack.map((tech) => (
          <li key={tech} className="project-tag">
            {tech}
          </li>
        ))}
      </ul>
    )}

    {highlight && (
      // `metric` marks a real quantified business outcome. Per DESIGN.md's
      // Green Means Money Rule only those get Impact Green; everything else
      // stays in the neutral text colour.
      <p className={`mt-5 text-sm md:text-base font-semibold ${metric ? 'project-highlight-metric' : 'project-highlight'}`}>
        {highlight}
      </p>
    )}

    {/* Rendered only when the card is wrapped in a link, so the affordance
        never appears on a card that does not go anywhere. */}
    {cta && (
      <span className="project-cue mt-6 inline-flex items-center gap-2 text-sm font-semibold">
        {cta}
        <span aria-hidden="true" className="project-cue-arrow">↓</span>
      </span>
    )}
  </div>
);

export default TimelineCard;
