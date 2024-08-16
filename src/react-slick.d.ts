declare module "react-slick" {
  import { Component } from "react";

  interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    autoplay?: boolean;
    autoplaySpeed?: number;
    cssEase?: string;
    responsive?: Array<{
      breakpoint: number;
      settings: Partial<Settings>;
    }>;
  }

  export default class Slider extends Component<Settings> {}
}
