import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline/index.js";

import { Button } from "./Button";

/** This is an opinionated version of a Modal that's really just used for confirmations
 *  e.g. Are you sure you want to do X? and provides the styling and layout for that
 */
type ConfirmationModalProps = {
  /** The title of the modal */
  title: string;
  /** Controls if the modal is open or closed */
  open: boolean;
  /** Changes the open/closed state of the modal */
  setOpen: (open: boolean) => void;
  /** Controls the onClick of the primary button */
  primaryButtonOnClick: () => void;
  /** Controls the intent of the primary button */
  primaryButtonIntent?: "basic" | "danger" | "none";
  /** Controls the text of the primary button */
  primaryButtonText: string;
  /** Controls the text of the cancel button which is only visible when this is set */
  cancelButtonText?: string;
};

const ConfirmationModal = ({
  title,
  open,
  primaryButtonOnClick,
  primaryButtonIntent = "basic",
  primaryButtonText,
  setOpen,
  cancelButtonText,
}: ConfirmationModalProps) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-eco-green-success/20">
                    <CheckIcon
                      className="h-6 w-6 text-eco-green-success"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-left text-gray-500">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Eius aliquam laudantium explicabo pariatur iste
                        dolorem animi vitae error totam. At sapiente aliquam
                        accusamus facere veritatis.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 w-full flex justify-end gap-2">
                  {cancelButtonText ? (
                    <Button
                      label={cancelButtonText}
                      intent="none"
                      kind="hollow"
                      onClick={() => setOpen(false)}
                    />
                  ) : null}
                  <Button
                    label={primaryButtonText}
                    intent={primaryButtonIntent}
                    kind="solid"
                    onClick={primaryButtonOnClick}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ConfirmationModal;
