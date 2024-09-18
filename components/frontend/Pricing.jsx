import React from "react";

export default function Pricing() {
  const plans = [
    {
      title: "Free",
      isRecommended: false,
      description: "+5% transaction fee. It is good for starters",
      price: "$0",
      features: ["All Features", "Unlimited Products", "Unlimited Revenue"],
      nonFeatures: [],
    },
    {
      title: "Silver",
      isRecommended: true,
      description:
        "+2% transaction fee. It is good if your revenue is above $500",
      price: "$20",
      features: ["All Features", "Unlimited Products", "Unlimited Revenue"],
      nonFeatures: [],
    },
    {
      title: "Gold",
      isRecommended: false,
      description:
        "No transaction fee. It is good if your earning is more than $5000 in revenue",
      price: "$99",
      features: ["All Features", "Unlimited Products", "Unlimited Revenue"],
      nonFeatures: [],
    },
  ];
  return (
    <div className="p-2 sm:flex sm:flex-col sm:align-center md:p-10">
      <div className="flex flex-col items-center">
        <div className="relative items-center self-center bg-slate-200 dark:bg-slate-900 rounded-lg p-0.5 flex">
          <button
            type="button"
            className="relative rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none px-4 sm:w-auto sm:px-8 bg-slate-50 border-slate-50 text-slate-900 shadow-sm w-full"
          >
            Choose a plan which suits you!
          </button>
        </div>
        <span className="max-w-2xl text-center mt-4">
          Discover simplicity in pricing with us. Our straight frowarded and
          compitative rates ensure you get the best value. No hidden fees, just
          transparent options to meet your needs.
        </span>
      </div>
      <div className="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:max-auto xl:grid-cols-3">
        {/* Started Package */}
        {plans.map((plan, i) => {
          return (
            <div
              className="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200"
              key={i}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl leading-6 font-bold text-slate-900 dark: text-white">
                    {plan.title}
                  </h2>
                  {plan.isRecommended && (
                    <span className="uppercase border dark:bg-transparent bg-lime-500 text-white border-lime-500 text-xs rounded-full px-3 py-1">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="mt-2 text-base text-slate-700 dark:text-slate-300 leading-tight">
                  {plan.description}
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-bold text-slate-900 dark:text-lime-400 tracking-tighter">
                    {plan.price}
                  </span>
                  <span className="text-base font-medium text-slate-500">
                    /mo
                  </span>
                </p>
              </div>
              <div className="pt-6 pb-8 px-6"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
