type ProjectSetupHeaderProps = {
  heading: string;
  subHeading: string;
};

export const ProjectSetupHeader = ({
  heading,
  subHeading,
}: ProjectSetupHeaderProps) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <h2 className="font-bold text-4xl">{heading}</h2>
      <p className="text-border-500 text-base">{subHeading}</p>
    </div>
  );
};
