import React from "react";

type ListItem<T> = {
  title: string;
  value: T;
  valueFn?: (value: T) => string | JSX.Element;
};

type DescriptionListProps<T> = {
  title?: string | JSX.Element;
  listItems: ListItem<T>[];
};

const DescriptionList = ({ title, listItems }: DescriptionListProps<any>) => {
  return (
    <div key="description-list">
      {title ? (
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
        </div>
      ) : null}
      <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          {listItems.map((listItem) => {
            const value = listItem.valueFn
              ? listItem.valueFn(listItem.value)
              : listItem.value;

            return (
              <div
                key={listItem.title}
                className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4"
              >
                <dt className="text-sm font-medium text-gray-500">
                  {listItem.title}
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="flex-grow">{value}</span>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
};

export default DescriptionList;
