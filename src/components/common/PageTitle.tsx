interface PageTitleProps {
  title: string;
  subtitle: string;
}

function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="page-title">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

export default PageTitle;
