"use client";
import React from "react";
import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function ArrayItemsInput({ setItems, items, itemTitle }) {
  const [item, setItem] = useState();
  const [showTagForm, setShowTagForm] = useState(false);

  function addItem() {
    if (!item) return;
    if (!items.includes(item)) {
      setItems([...items, item]);
    } else {
      alert(`${itemTitle} already added`);
    }
  }

  function removeItem(index) {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  }

  return (
    <div className="col-span-full">
      {showTagForm ? (
        <div className="flex items-center">
          <form className="flex items-center w-full">
            <input
              type="text"
              id="voice-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
              placeholder={`Create a ${itemTitle}...`}
              required
              value={item}
              onChange={(e) => setItem(e.target.value)}
              style={{ flex: "0 1 40%" }}
            />
            <div className="flex items-center" style={{ flex: "0 1 20%" }}>
              <button
                onClick={addItem}
                type="button"
                className="shrink-0 inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-lime-700 rounded-lg border border-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
              >
                <Plus className="w-4 h-4 me-2" />
                Add
              </button>
              <button
                className="ml-2 shrink-0 w-10 h-10 flex items-center justify-center py-2 px-2 bg-red-400 rounded-full"
                onClick={() => setShowTagForm(false)}
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <button
            className="flex items-center space-x-2 text-slate-800 dark:text-slate-300 py-2 px-4 dark:bg-slate-500"
            type="button"
            onClick={() => setShowTagForm(true)}
          >
            <Plus />
            <span>Add {itemTitle}</span>
          </button>
        </div>
      )}
      <div className="flex flex-wrap gap-4 mt-4">
        {items.map((value, i) => {
          return (
            <div
              className="flex space-x-2 items-center bg-slate-200 dark:bg-slate-600 px-4 py-2 rounded-lg cursor-pointer dark:text-slate-300 text-slate-800"
              key={i}
              onClick={() => removeItem(i)}
            >
              <p>{value}</p>
              <X className="w-4 h-4" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
