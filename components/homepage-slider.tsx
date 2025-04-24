"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import Image from "next/image";
import { bannersType } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
interface carouselData {
  data: bannersType[];
  delay?: number;
  stopInteraction?: boolean;
  loop?: boolean;
  navigation?: boolean;
  classes?: string;
}
const HomePageSlider = ({
  data,
  delay,
  stopInteraction,
  loop,
  navigation,
  classes,
}: carouselData) => {
  const className = twMerge("w-full max-w-[1600px] mx-auto", classes);
  const plugin = useRef(
    Autoplay({ delay: delay, stopOnInteraction: stopInteraction })
  );
  return (
    <Carousel
      className={className}
      plugins={[plugin.current]}
      opts={{ loop: loop }}
    >
      <CarouselContent>
        {data.map((item, index) => (
          <CarouselItem key={index}>
            <Link href="/" title="home page" className="md:block hidden">
              <Image
                src={item.webImage}
                height={550}
                width={1900}
                alt={item.alt}
                className="w-full"
              />
            </Link>
            <Link href="/" title="home page" className="block md:hidden">
              <Image
                src={item.mobImage}
                height={550}
                width={1900}
                alt={item.alt}
                className="w-full"
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      {navigation && (
        <CarouselPrevious className=" left-1  hover:translate-x-[-2px] transition-all bg-opacity-50 bg-slate-300 border-slate-300  md:inline-flex hidden" />
      )}
      {navigation && (
        <CarouselNext className=" right-1 hover:translate-x-[2px]  transition-all bg-opacity-50 bg-slate-300 border-slate-300 md:inline-flex  hidden" />
      )}
    </Carousel>
  );
};
export default HomePageSlider;
