export type MainContentData = {
  title: string;
  subtitle: string;
  tagLine?: string;
  subHeading?: SubHeading[];
  imgUrl?: string;
  videoUrl?: string;
  videoThumb?: string;
  gallery?: string[];
  isTagline: string;
  backgroundColor?: string;
  textColor?: string;
};

export type SubHeading = {
  title: string;
  subtitle: string;
};
