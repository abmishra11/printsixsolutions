import React from 'react';
import { BeatLoader } from 'react-spinners';

export default function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <BeatLoader color="#fc9b04" loading={true} size={20} />
    </div>
  );
}
