import emotionStyled from "@emotion/styled";
import * as React from "react";
import { PropsOf } from "@emotion/react";
import { Theme } from "../types";
import {
  CreateStyledComponent,
  FilteringStyledOptions,
  StyledOptions,
} from "@emotion/styled/base";

interface BaseCreateStyled {
  <
    C extends React.ComponentClass<React.ComponentProps<C>>,
    ForwardedProps extends keyof React.ComponentProps<C> &
      string = keyof React.ComponentProps<C> & string
  >(
    component: C,
    options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps>
  ): CreateStyledComponent<
    Pick<PropsOf<C>, ForwardedProps> & {
      theme?: Theme;
    },
    {},
    {
      ref?: React.Ref<InstanceType<C>>;
    }
  >;

  <C extends React.ComponentClass<React.ComponentProps<C>>>(
    component: C,
    options?: StyledOptions<React.ComponentProps<C>>
  ): CreateStyledComponent<
    PropsOf<C> & {
      theme?: Theme;
    },
    {},
    {
      ref?: React.Ref<InstanceType<C>>;
    }
  >;

  <
    C extends React.ComponentType<React.ComponentProps<C>>,
    ForwardedProps extends keyof React.ComponentProps<C> &
      string = keyof React.ComponentProps<C> & string
  >(
    component: C,
    options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps>
  ): CreateStyledComponent<
    Pick<PropsOf<C>, ForwardedProps> & {
      theme?: Theme;
    }
  >;

  <C extends React.ComponentType<React.ComponentProps<C>>>(
    component: C,
    options?: StyledOptions<React.ComponentProps<C>>
  ): CreateStyledComponent<
    PropsOf<C> & {
      theme?: Theme;
    }
  >;

  <
    Tag extends keyof JSX.IntrinsicElements,
    ForwardedProps extends keyof JSX.IntrinsicElements[Tag] &
      string = keyof JSX.IntrinsicElements[Tag] & string
  >(
    tag: Tag,
    options: FilteringStyledOptions<JSX.IntrinsicElements[Tag], ForwardedProps>
  ): CreateStyledComponent<
    { theme?: Theme; as?: React.ElementType },
    Pick<JSX.IntrinsicElements[Tag], ForwardedProps>
  >;

  <Tag extends keyof JSX.IntrinsicElements>(
    tag: Tag,
    options?: StyledOptions<JSX.IntrinsicElements[Tag]>
  ): CreateStyledComponent<
    { theme?: Theme; as?: React.ElementType },
    JSX.IntrinsicElements[Tag]
  >;
}

type StyledTags = {
  [Tag in keyof JSX.IntrinsicElements]: CreateStyledComponent<
    {
      theme?: Theme;
      as?: React.ElementType;
    },
    JSX.IntrinsicElements[Tag]
  >;
};

interface CreateStyled extends BaseCreateStyled, StyledTags {}

export const styled = emotionStyled as CreateStyled;
