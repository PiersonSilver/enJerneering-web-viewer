import { AngleUpSmallIcon, InfoCircleIcon } from "../../../../assets/icons";

export const Tips = () => {
  return (
    <div className="flex flex-col gap-4 p-6 pt-4 m-4 mt-0 rounded-2xl border border-dashed border-neutral-300 bg-primary-100">
      <div className="flex justify-between items-center gap-3 pb-2 border-b border-neutral-400">
        <div className="flex gap-2 items-center">
          Tips
          <InfoCircleIcon width="1rem" height="1rem" />
        </div>
        <AngleUpSmallIcon width="1rem" height="1rem" />
      </div>
      <ul>
        <li className="text-base text-neutral-700">
          Select an elements on the list to add in this page.
        </li>
      </ul>
    </div>
  );
};
