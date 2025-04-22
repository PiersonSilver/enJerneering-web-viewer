import "notistack";

export declare module "notistack" {
  type BaseToastStackProps = {
    title?: string;
  };
  interface VariantOverrides {
    default: BaseToastStackProps;
    success: BaseToastStackProps;
    info: BaseToastStackProps;
    warning: BaseToastStackProps;
    error: BaseToastStackProps;
  }
}
