// Shared inner content for the two timeline sections (Project Quickview and
// Work Experience). Renders the title/date/labelled-bullets block; the outer
// timeline chrome (one-sided spine vs alternating center spine) lives in each
// section. Pass `logoPath`/`subtitle` for the in-card header variant (Work
// Experience); omit them when the logo sits on the timeline itself (Project
// Quickview).
const TimelineCard = ({ title, subtitle, date, label = "Responsibilities", items, logoPath }) => (
  <div>
    <div className="flex items-center gap-4">
      {logoPath && (
        <div className="size-12 md:size-14 flex-none rounded-full flex justify-center items-center border border-black-50 bg-black-100 overflow-hidden">
          <img src={logoPath} alt={subtitle || title} className="size-full object-contain p-1.5" />
        </div>
      )}
      <div>
        <h3 className="font-semibold text-2xl md:text-3xl text-white">{title}</h3>
        {subtitle && <p className="text-cyan-400/90 text-sm md:text-base">{subtitle}</p>}
      </div>
    </div>

    <p className="my-5 text-white-50">🗓️&nbsp;{date || "2023 - Present"}</p>

    <p className="text-[#839CB5] italic">{label}</p>
    <ul className="list-disc ms-5 mt-5 flex flex-col gap-4 md:gap-5 text-white-50">
      {items.map((item, index) => (
        <li key={index} className="text-base md:text-lg">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default TimelineCard;
