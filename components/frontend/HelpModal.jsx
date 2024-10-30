"use client";

import { Button, Modal } from "flowbite-react";
import {
  CornerDownLeft,
  Headphones,
  HelpCircle,
  MessageSquare,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HelpModal() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        className="flex items-center space-x-1 text-primary"
        onClick={() => setOpenModal(true)}
      >
        <HelpCircle />
        <span>Help</span>
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          Need Help with Shopping, Talk to our Help Desk
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="tel:1234567890"
              className="flex items-center space-x-2 text-white"
            >
              <div className="flex items-center w-8 h-8 bg-primary justify-center rounded-full">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <span>Call: 1234567890</span>
            </Link>
            {/* <Link
              href="/track"
              className="flex items-center space-x-2 text-slate-900"
            >
              <div className="flex items-center w-8 h-8 bg-primary justify-center rounded-full">
                <Truck className="w-6 h-6 text-lime-800" />
              </div>
              <span>Track your Order</span>
            </Link> */}
            <Link href="" className="flex items-center space-x-2 text-white">
              <div className="flex items-center w-8 h-8 bg-primary justify-center rounded-full">
                <CornerDownLeft className="w-6 h-6 text-white" />
              </div>
              <span>Return and Refunds</span>
            </Link>
            {/* <Link
              href=""
              className="flex items-center space-x-2 text-slate-900"
            >
              <div className="flex items-center w-8 h-8 bg-primary justify-center rounded-full">
                <MessageSquare className="w-6 h-6 text-lime-800" />
              </div>
              <span>Chat with Us</span>
            </Link> */}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
