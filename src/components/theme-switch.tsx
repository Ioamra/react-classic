import { useTheme } from "@/context/theme-context";
import { SwitchProps, useSwitch, VisuallyHidden } from "@nextui-org/react";
import clsx from "clsx";
import React from "react";
import { MoonFilledIcon } from "./icons/moon-filled-icon";
import { SunFilledIcon } from "./icons/sun-filled-icon";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ className, classNames }) => {
  const { theme, toggleTheme } = useTheme();

  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch({
    isSelected: theme === "light",
    onChange: toggleTheme,
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx("transition-opacity hover:opacity-80 cursor-pointer", className, classNames?.base),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(["w-auto h-auto", "bg-transparent", "group-data-[selected=true]:bg-transparent", "!text-default-500", "px-0", "mx-0"], classNames?.wrapper),
        })}
      >
        {isSelected ? <MoonFilledIcon size={30} /> : <SunFilledIcon size={30} />}
      </div>
    </Component>
  );
};
