import React from "react";
import Modal from "react-modal";
import { Card } from "./Card";
import styled from "@emotion/styled";
import { XIcon } from "./assets/XIcon";
import { useTheme } from "./hooks";

interface Styles {
  content?: React.CSSProperties | undefined;
  overlay?: React.CSSProperties | undefined;
  card?: React.CSSProperties | undefined;
}

interface Classes {
  base: string;
  afterOpen: string;
  beforeClose: string;
}

interface Aria {
  /** Defines a string value that labels the current element. */
  labelledby?: string | undefined;
  /** Identifies the element (or elements) that describes the object. */
  describedby?: string | undefined;
  /** Indicates whether an element is modal when displayed. */
  modal?: boolean | "false" | "true" | undefined;
}

/** Describes overlay and content element references passed to onAfterOpen function */
interface OnAfterOpenCallbackOptions {
  /** overlay element reference */
  overlayEl: Element;
  /** content element reference */
  contentEl: HTMLDivElement;
}

interface OnAfterOpenCallback {
  (obj?: OnAfterOpenCallbackOptions): void;
}

export interface DialogProps {
  shouldShowCloseButton?: boolean;

  children?: React.ReactNode;

  /* Boolean describing if the modal should be shown or not. Defaults to false. */
  isOpen: boolean;

  /* Object indicating styles to be used for the modal, divided into overlay and content styles. */
  style?: Styles | undefined;

  /* String className to be applied to the portal. Defaults to "ReactModalPortal". */
  portalClassName?: string | undefined;

  /* String className to be applied to the document.body (must be a constant string). When set to null it doesn't add any class to document.body. */
  bodyOpenClassName?: string | null | undefined;

  /* String className to be applied to the document.html (must be a constant string). Defaults to null. */
  htmlOpenClassName?: string | null | undefined;

  /* String or object className to be applied to the modal content. */
  className?: string | Classes | undefined;

  /* String or object className to be applied to the overlay. */
  overlayClassName?: string | Classes | undefined;

  /* Set this to properly hide your application from assistive screenreaders and other assistive technologies while the modal is open. */
  appElement?:
    | HTMLElement
    | HTMLElement[]
    | HTMLCollection
    | NodeList
    | undefined;

  /* Function that will be run after the modal has opened. */
  onAfterOpen?: OnAfterOpenCallback | undefined;

  /* Function that will be run after the modal has closed. */
  onAfterClose?(): void;

  /* Function that will be run when the modal is requested to be closed, prior to actually closing. */
  onRequestClose?(event: React.MouseEvent | React.KeyboardEvent): void;

  /* Number indicating the milliseconds to wait before closing the modal. Defaults to zero (no timeout). */
  closeTimeoutMS?: number | undefined;

  /* Boolean indicating if the appElement should be hidden. Defaults to true. */
  ariaHideApp?: boolean | undefined;

  /* Boolean indicating if the modal should be focused after render */
  shouldFocusAfterRender?: boolean | undefined;

  /* Boolean indicating if the overlay should close the modal. Defaults to true. */
  shouldCloseOnOverlayClick?: boolean | undefined;

  /* Boolean indicating if pressing the esc key should close the modal */
  shouldCloseOnEsc?: boolean | undefined;

  /* Boolean indicating if the modal should restore focus to the element that had focus prior to its display. */
  shouldReturnFocusAfterClose?: boolean | undefined;

  /* Boolean indicating if the modal should use the preventScroll flag when restoring focus to the element that had focus prior to its display. */
  preventScroll?: boolean | undefined;

  /* Function that will be called to get the parent element that the modal will be attached to. */
  parentSelector?(): HTMLElement;

  /* Additional aria attributes. */
  aria?: Aria | undefined;

  /* Additional data attributes to be applied to to the modal content in the form of "data-*" */
  data?: any;

  /* String indicating the role of the modal, allowing the 'dialog' role to be applied if desired. Defaults to "dialog". */
  role?: string | null | undefined;

  /* String indicating how the content container should be announced to screenreaders. */
  contentLabel?: string | undefined;

  /* Function accepting the ref for the content */
  contentRef?: ((instance: HTMLDivElement) => void) | undefined;

  /* Function accepting the ref for the overlay */
  overlayRef?: ((instance: HTMLDivElement) => void) | undefined;

  /* Custom Overlay element. */
  overlayElement?:
    | ((
        props: React.ComponentPropsWithRef<"div">,
        contentEl: React.ReactElement
      ) => React.ReactElement)
    | undefined;
  /* Custom Content element. */
  contentElement?:
    | ((
        props: React.ComponentPropsWithRef<"div">,
        children: React.ReactNode
      ) => React.ReactElement)
    | undefined;

  /* String value of data-test-id attibute to be applied to to the modal content. */
  testId?: string | undefined;

  /* String value of an id attribute to be applied to the modal content */
  id?: string | undefined;
}

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  padding: "40px 32px",
  width: 524,
  borderColor: theme.palette.background.light,
}));

const Icon = styled.div({
  top: 24,
  right: 24,
  position: "absolute",
  cursor: "pointer",
});

export const Dialog: React.FC<React.PropsWithChildren<DialogProps>> = ({
  shouldShowCloseButton = true,
  children,
  ...modalProps
}) => {
  const theme = useTheme();
  return (
    <Modal
      {...modalProps}
      style={{
        overlay: {
          ...theme.components.dialog?.overlay,
          ...modalProps.style?.overlay,
        },
        content: {
          border: 0,
          padding: 0,
          zIndex: 100,
          top: "50%",
          left: "50%",
          bottom: "initial",
          right: "initial",
          background: "transparent",
          transform: "translate(-50%,-50%)",
          ...theme.components.dialog?.content,
          ...modalProps.style?.content,
        },
      }}
    >
      <StyledCard style={modalProps.style?.card}>
        {shouldShowCloseButton ? (
          <Icon onClick={modalProps.onRequestClose}>
            <XIcon />
          </Icon>
        ) : null}
        {children}
      </StyledCard>
    </Modal>
  );
};
