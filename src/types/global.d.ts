declare global {
  export type PropsWithClassName<Props = object> = {
    className?: string;
  } & Props;

  export type Option<Value = string> = {
    label: string;
    value: Value;
  };
}

declare module "react" {
  // function forwardRef<T, P = {}>(
  //   render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
  // ): (props: P & React.RefAttributes<T>) => React.ReactNode | null;
}

export default global;
