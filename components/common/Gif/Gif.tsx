import { useEffect, useMemo, useRef } from "react";
import { Image } from "react-konva";
import "gifler";

export type GifProps = {
  src: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

export const Gif = ({ src, width, height, x, y }: GifProps) => {
  const imageRef = useRef<any>(null);
  const canvas = useMemo(() => {
    const node = document.createElement("canvas");
    return node;
  }, []);

  useEffect(() => {
    // save animation instance to stop it on unmount
    let anim: any;
    (window as any).gifler(src).get((a: any) => {
      anim = a;
      anim.animateInCanvas(canvas);
      anim.onDrawFrame = (ctx: any, frame: any) => {
        ctx.drawImage(frame.buffer, frame.x, frame.y);
        imageRef.current.getLayer().draw();
      };
    });
    return () => anim.stop();
  }, [src, canvas]);

  return <Image image={canvas} ref={imageRef} width={width} height={height} x={x} y={y} />;
};


